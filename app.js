const listingGrid = document.querySelector("#listing-grid");
const form = document.querySelector("#filter-form");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");
const searchInput = document.querySelector("#search-input");
const typeFilter = document.querySelector("#type-filter");
const regionFilter = document.querySelector("#region-filter");
const minPrice = document.querySelector("#min-price");
const maxPrice = document.querySelector("#max-price");
const notice = document.querySelector("#app-notice");
const themeToggle = document.querySelector("#theme-toggle");
const authDialog = document.querySelector("#auth-dialog");
const authForm = document.querySelector("#auth-form");
const authMessage = document.querySelector("#auth-message");
const listingDialog = document.querySelector("#listing-dialog");
const listingForm = document.querySelector("#listing-form");
const listingMessage = document.querySelector("#listing-message");
const detailsDialog = document.querySelector("#details-dialog");
const applicationDialog = document.querySelector("#application-dialog");
const applicationForm = document.querySelector("#application-form");
const applicationMessage = document.querySelector("#application-message");
const applicationService = applicationForm.querySelector('[name="service"]');
const authButton = document.querySelector("#auth-open");
const signoutButton = document.querySelector("#signout-button");
const postListingButton = document.querySelector("#post-listing");
const t = (text) => window.translateText(text);

const categories = {
  business: "Продаж бізнесу",
  real_estate: "Нерухомість",
  land: "Земля",
};

const configuration = window.SUPABASE_CONFIG;
const hasSupabaseConfig =
  typeof configuration?.url === "string" &&
  typeof configuration?.anonKey === "string" &&
  configuration.url.trim() !== "" &&
  configuration.anonKey.trim() !== "";

let supabaseClient = null;
let currentSession = null;
let isModerator = false;
let authMode = "login";
let favorites = new Set();
const listingsById = new Map();
let activeApplicationService = "";
let pendingApplicationService = "";
let pendingApplicationDraft = null;
let cachedListings = [];

try {
  pendingApplicationService = sessionStorage.getItem("pending-application") || "";
} catch (error) {
  console.warn("Не вдалося відновити заявку після входу.", error);
}

function applyTheme(isDark) {
  document.body.classList.toggle("theme-dark", isDark);
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute(
    "aria-label",
    t(isDark ? "Увімкнути світлу тему" : "Увімкнути темну тему"),
  );
  themeToggle.querySelector(".theme-toggle-label").textContent = t(
    isDark ? "Світла" : "Темна",
  );
  document.documentElement.style.colorScheme = isDark ? "dark" : "light";

  try {
    localStorage.setItem("kip-theme", isDark ? "dark" : "light");
  } catch (error) {
    console.warn("Не вдалося зберегти налаштування теми.", error);
  }
}

function initializeTheme() {
  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem("kip-theme");
  } catch (error) {
    console.warn("Не вдалося прочитати налаштування теми.", error);
  }

  const isDark =
    savedTheme === "dark" ||
    (savedTheme !== "light" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  applyTheme(isDark);
  themeToggle.addEventListener("click", () => {
    applyTheme(!document.body.classList.contains("theme-dark"));
  });
}

function showNotice(message, kind = "info") {
  notice.textContent = t(message);
  notice.dataset.kind = kind;
  notice.hidden = false;
}

function clearNotice() {
  notice.textContent = "";
  notice.hidden = true;
}

function showApplicationForm(service, draft = null) {
  activeApplicationService = service;
  applicationService.value = service;
  document.querySelector("#application-title").textContent = t(
    service || "Подати заявку",
  );
  applicationMessage.textContent = "";
  applicationForm.reset();
  applicationService.value = service;
  const displayName = currentSession?.user?.user_metadata?.display_name;
  applicationForm.querySelector('[name="name"]').value =
    draft?.name || displayName || "";
  applicationForm.querySelector('[name="phone"]').value = draft?.phone || "";
  applicationForm.querySelector('[name="message"]').value =
    draft?.message || "";
  applicationDialog.showModal();
}

function openServiceApplication(service) {
  showApplicationForm(service);
}

function openPendingApplication() {
  if (!currentSession || !pendingApplicationService || authDialog.open) return;

  const service = pendingApplicationService;
  pendingApplicationService = "";
  const draft = pendingApplicationDraft;
  pendingApplicationDraft = null;
  try {
    sessionStorage.removeItem("pending-application");
  } catch (error) {
    console.warn("Не вдалося очистити тимчасову заявку.", error);
  }
  showApplicationForm(service, draft);
}

async function handleApplicationSubmit(event) {
  event.preventDefault();
  applicationMessage.textContent = "";
  const formData = new FormData(applicationForm);
  const service = String(formData.get("service"));
  activeApplicationService = service;

  if (!supabaseClient || !currentSession) {
    pendingApplicationService = service;
    pendingApplicationDraft = {
      name: String(formData.get("name")).trim(),
      phone: String(formData.get("phone")).trim(),
      message: String(formData.get("message")).trim(),
    };
    try {
      sessionStorage.setItem("pending-application", service);
    } catch (error) {
      console.warn("Не вдалося тимчасово зберегти заявку.", error);
    }
    applicationDialog.close();
    authDialog.dataset.requireAuth = "true";
    document.querySelector("#continue-guest").hidden = true;
    authDialog.querySelector(".dialog-intro").textContent = t(
      "Щоб подати заявку, увійдіть або створіть акаунт. Після входу форма заявки відкриється автоматично.",
    );
    authMessage.textContent = "";
    setAuthMode("login");
    authDialog.showModal();
    return;
  }

  const submitButton = applicationForm.querySelector('[type="submit"]');
  submitButton.disabled = true;
  applicationMessage.textContent = t("Надсилаємо заявку…");

  try {
    const { data, error } = await supabaseClient.functions.invoke(
      "submit-application",
      {
        body: {
          service,
          name: String(formData.get("name")).trim(),
          phone: String(formData.get("phone")).trim(),
          message: String(formData.get("message")).trim(),
        },
      },
    );

    if (error) {
      applicationMessage.textContent = `${t("Не вдалося надіслати заявку. Перевірте налаштування Supabase Function та пошти")}: ${error.message}`;
      return;
    }

    if (!data?.saved) {
      applicationMessage.textContent = t(
        "Заявку не збережено. Спробуйте ще раз пізніше.",
      );
      return;
    }

    applicationDialog.close();
    pendingApplicationDraft = null;
    if (data.emailSent) {
      showNotice(t("Заявку надіслано. Ми зв'яжемося з вами."), "success");
    } else {
      showNotice(
        t("Заявку збережено в базі, але email-сповіщення не надіслано. Перевірте налаштування Gmail SMTP у Supabase."),
        "error",
      );
    }
  } catch (error) {
    applicationMessage.textContent = `${t("Не вдалося надіслати заявку. Спробуйте ще раз.")}: ${
      error instanceof Error ? error.message : String(error)
    }`;
  } finally {
    submitButton.disabled = false;
  }
}

function applyFilters() {
  const term = searchInput.value.trim().toLocaleLowerCase("uk");
  const type = typeFilter.value;
  const region = regionFilter.value;
  const minimum = Number(minPrice.value) || 0;
  const maximum = Number(maxPrice.value) || Infinity;
  const cards = [...listingGrid.querySelectorAll(".listing-card")];
  let visibleCount = 0;

  cards.forEach((card) => {
    const text = card.textContent.toLocaleLowerCase("uk");
    const cardCategory = card.dataset.category.replaceAll("_", "-");
    const price = card.dataset.price ? Number(card.dataset.price) : null;
    const matchesPrice =
      price === null
        ? minimum === 0 && maximum === Infinity
        : price >= minimum && price <= maximum;
    const matches =
      (type === "all" || cardCategory === type) &&
      (region === "all" || card.dataset.region.includes(region)) &&
      matchesPrice &&
      (!term || text.includes(term));

    card.hidden = !matches;
    if (matches) visibleCount += 1;
  });

  resultCount.textContent = String(visibleCount).padStart(2, "0");
  emptyState.hidden = visibleCount !== 0;
}

function formatDate(value) {
  if (!value) return t("Щойно");
  return new Intl.DateTimeFormat(
    document.documentElement.lang === "en" ? "en-US" : "uk-UA",
    {
      day: "2-digit",
      month: "long",
      year: "numeric",
    },
  ).format(new Date(value));
}

function formatPrice(value, isNegotiable) {
  if (value === null || value === undefined || value === "") {
    return t(isNegotiable ? "Договірна" : "За запитом");
  }
  return `$${new Intl.NumberFormat(
    document.documentElement.lang === "en" ? "en-US" : "uk-UA",
    {
      maximumFractionDigits: 0,
    },
  ).format(value)}`;
}

function normalizeRegion(region) {
  const normalized = region.trim().toLocaleLowerCase("uk");
  if (["київська", "kyiv", "kyiv region"].includes(normalized)) {
    return "київська";
  }
  if (["львівська", "lviv", "lviv region"].includes(normalized)) {
    return "львівська";
  }
  return normalized;
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function makeListingCard(listing, index, total) {
  const card = createElement("article", "listing-card");
  const category = listing.category;
  const region = normalizeRegion(listing.region);
  const price = listing.price_usd;
  card.dataset.listingId = String(listing.id);
  card.dataset.category = category;
  card.dataset.region = region;
  card.dataset.price = price ?? "";
  card.dataset.createdAt = listing.created_at ?? "";

  const imageSection = createElement("div", "card-image");
  const image = document.createElement("img");
  image.src =
    listing.image_url ||
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=85";
  image.alt = listing.title;
  image.loading = "lazy";
  imageSection.append(image);

  const label = createElement("span", "image-label");
  label.append(createElement("span", "label-dot"));
  label.append(` ${t("Перевірено модератором")}`);
  imageSection.append(label);

  const favoriteButton = createElement("button", "favorite-button");
  favoriteButton.type = "button";
  favoriteButton.dataset.favoriteId = String(listing.id);
  favoriteButton.setAttribute(
    "aria-label",
    `${t("Додати")} «${listing.title}» ${t("в обране")}`,
  );
  favoriteButton.setAttribute(
    "aria-pressed",
    String(favorites.has(String(listing.id))),
  );
  favoriteButton.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.8c0 4.1-8.8 10-8.8 10s-8.8-5.9-8.8-10A4.8 4.8 0 0 1 12 6.7a4.8 4.8 0 0 1 8.8 2.1Z"></path></svg>';
  imageSection.append(favoriteButton);
  imageSection.append(
    createElement(
      "span",
      "photo-index",
      `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`,
    ),
  );

  const content = createElement("div", "card-content");
  const meta = createElement("div", "card-meta");
  meta.append(
    createElement("span", "", t(categories[category] || "Інша пропозиція")),
    createElement("span", "", formatDate(listing.created_at)),
  );
  content.append(meta);
  content.append(createElement("h2", "", listing.title));

  const location = createElement("p", "card-location");
  location.innerHTML =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"></path><circle cx="12" cy="10" r="2.5"></circle></svg>';
  location.append(` ${t(listing.region)}`);
  content.append(location);

  const bottom = createElement("div", "card-bottom");
  const priceBlock = createElement("div", "price");
  priceBlock.append(
    createElement("span", "", t("Ціна продажу")),
    createElement(
      "strong",
      "",
      formatPrice(price, listing.price_negotiable),
    ),
  );
  bottom.append(priceBlock);

  const detailsButton = createElement("button", "details-button");
  detailsButton.type = "button";
  detailsButton.dataset.listingId = String(listing.id);
  detailsButton.append(`${t("Детальніше")} `, createElement("span", "", "↗"));
  bottom.append(detailsButton);
  content.append(bottom);
  card.append(imageSection, content);
  return card;
}

function renderListings(listings) {
  cachedListings = listings;
  listingsById.clear();
  listings.forEach((listing) => listingsById.set(String(listing.id), listing));
  listingGrid.replaceChildren(
    ...listings.map((listing, index) =>
      makeListingCard(listing, index, listings.length),
    ),
  );
  applyFilters();
}

async function loadListings() {
  const { data, error } = await supabaseClient
    .from("listings")
    .select(
      "id, title, description, category, region, price_usd, price_negotiable, image_url, created_at",
    )
    .eq("status", "published")
    .neq("category", "investment")
    .order("created_at", { ascending: false });

  if (error) {
    renderListings([]);
    showNotice(
      `Не вдалося завантажити оголошення з бази: ${error.message}`,
      "error",
    );
    return;
  }

  renderListings(data);
  if (notice.textContent.startsWith("Не вдалося завантажити оголошення:")) {
    clearNotice();
  }
}

async function loadFavorites() {
  favorites = new Set();
  if (!currentSession || !supabaseClient) return;

  const { data, error } = await supabaseClient
    .from("listing_favorites")
    .select("listing_id")
    .eq("user_id", currentSession.user.id);

  if (error) {
    showNotice(`Не вдалося завантажити обране: ${error.message}`, "error");
    return;
  }

  favorites = new Set(data.map((favorite) => String(favorite.listing_id)));
}

async function syncSession(session) {
  currentSession = session;
  isModerator = false;
  favorites = new Set();

  if (session && supabaseClient) {
    const { data, error } = await supabaseClient
      .from("listing_moderators")
      .select("user_id")
      .eq("user_id", session.user.id)
      .maybeSingle();

    if (error) {
      showNotice(
        `Не вдалося перевірити права акаунта: ${error.message}`,
        "error",
      );
    } else {
      isModerator = Boolean(data);
    }

    await loadFavorites();
  }

  const accountLabel = session
    ? isModerator
      ? "Акаунт: модератор"
      : "Акаунт: користувач"
    : "Увійти";
  authButton.textContent = t(accountLabel);
  authButton.setAttribute(
    "aria-label",
    session
      ? isModerator
        ? t("Ви увійшли як модератор")
        : t("Ви увійшли як користувач")
      : t("Увійти до акаунта"),
  );
  authButton.title = session
    ? isModerator
      ? t("Ви увійшли як модератор")
      : t("Ви увійшли як користувач")
    : t("Увійти до акаунта");
  authButton.classList.toggle("account-button-signed-in", Boolean(session));
  authButton.classList.toggle("account-button-moderator", isModerator);
  authButton.disabled = Boolean(session);
  signoutButton.hidden = !session;
  postListingButton.hidden = !isModerator;

  renderListingsFromCurrentCards();
}

function renderListingsFromCurrentCards() {
  const buttons = listingGrid.querySelectorAll("[data-favorite-id]");
  buttons.forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      String(favorites.has(button.dataset.favoriteId)),
    );
  });
}

function setAuthMode(mode) {
  authMode = mode;
  const signup = mode === "signup";
  const recovery = mode === "recovery";
  const passwordInput = authForm.querySelector('[name="password"]');
  const emailField = document.querySelector("#auth-email-field");
  const nameField = document.querySelector("#auth-name-field");
  const confirmField = document.querySelector("#auth-confirm-field");
  const tabs = document.querySelector(".auth-tabs");

  document.querySelector("#auth-title").textContent = t(
    signup
      ? "Створити акаунт"
      : recovery
        ? "Задайте новий пароль"
        : "Увійти в акаунт",
  );
  document.querySelector("#auth-submit").textContent = t(
    signup
      ? "Зареєструватися"
      : recovery
        ? "Зберегти новий пароль"
        : "Увійти",
  );
  document.querySelector("#auth-password-field > span:first-child").textContent =
    t(recovery ? "Новий пароль" : "Пароль");
  passwordInput.autocomplete =
    signup || recovery ? "new-password" : "current-password";
  passwordInput.value = "";
  authForm.querySelector('[name="password_confirmation"]').value = "";
  nameField.hidden = !signup;
  nameField.querySelector("input").required = signup;
  emailField.hidden = recovery;
  emailField.querySelector("input").required = !recovery;
  confirmField.hidden = !recovery;
  confirmField.querySelector("input").required = recovery;
  tabs.hidden = recovery;
  document.querySelector("#auth-hint").textContent = t(
    recovery
      ? "Вигадайте новий пароль довжиною щонайменше 8 символів."
      : signup
        ? "Якщо акаунт уже створений, оберіть «Увійти». Після реєстрації перевірте пошту для підтвердження."
        : "Немає акаунта? Перейдіть до «Створити акаунт». Якщо забули пароль, скористайтеся відновленням.",
  );
  document.querySelector("#forgot-password").hidden =
    signup || recovery;
  document.querySelector("#resend-confirmation").hidden = true;
  document.querySelector("#continue-guest").hidden =
    recovery || authDialog.dataset.requireAuth === "true";
  authMessage.textContent = "";
  document.querySelectorAll(".auth-tab").forEach((button) => {
    button.classList.toggle("selected", button.dataset.authMode === mode);
  });
  const passwordToggle = document.querySelector("#password-toggle");
  passwordToggle.textContent = t("Показати");
  passwordToggle.setAttribute("aria-label", t("Показати пароль"));
  passwordToggle.setAttribute("aria-pressed", "false");
  passwordInput.type = "password";

  [
    document.querySelector("#auth-title"),
    tabs,
    authForm,
    document.querySelector("#auth-hint"),
  ].forEach((element) => {
    element.classList.remove("auth-mode-enter");
    void element.offsetWidth;
    element.classList.add("auth-mode-enter");
  });
}

async function handleAuthSubmit(event) {
  event.preventDefault();
  authMessage.textContent = "";
  document.querySelector("#resend-confirmation").hidden = true;

  if (!supabaseClient) {
    authMessage.textContent =
      "Спочатку підключіть Supabase у файлі supabase-config.js.";
    return;
  }

  const formData = new FormData(authForm);
  const password = String(formData.get("password"));
  if (authMode === "recovery") {
    if (password !== String(formData.get("password_confirmation"))) {
      authMessage.textContent = "Паролі не збігаються.";
      return;
    }
    const { error } = await supabaseClient.auth.updateUser({ password });
    if (error) {
      authMessage.textContent = `Не вдалося змінити пароль: ${error.message}`;
      return;
    }
    const { error: signOutError } = await supabaseClient.auth.signOut();
    if (signOutError) {
      authMessage.textContent = `Пароль змінено, але не вдалося завершити сесію: ${signOutError.message}`;
      return;
    }
    authMessage.textContent = "Пароль змінено. Тепер можна увійти.";
    await syncSession(null);
    window.setTimeout(() => authDialog.close(), 900);
    return;
  }

  const email = String(formData.get("email")).trim();
  const result =
    authMode === "signup"
      ? await supabaseClient.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}${window.location.pathname}`,
            data: {
              display_name: String(formData.get("display_name")).trim(),
            },
          },
        })
      : await supabaseClient.auth.signInWithPassword({ email, password });

  if (result.error) {
    const errorMessage = result.error.message.toLocaleLowerCase("en");
    if (errorMessage.includes("email not confirmed")) {
      authMessage.textContent =
        "Акаунт уже є, але пошта ще не підтверджена. Перевірте спам або надішліть лист підтвердження ще раз.";
      document.querySelector("#resend-confirmation").hidden = false;
    } else if (errorMessage.includes("already registered")) {
      authMessage.textContent =
        "Цей акаунт уже існує. Перейдіть до «Увійти» або скористайтеся відновленням пароля.";
    } else if (
      errorMessage.includes("email address not authorized") ||
      errorMessage.includes("error sending confirmation email")
    ) {
      authMessage.textContent =
        "Supabase не надіслав лист. Для тестового SMTP адреса має належати учаснику проєкту; для інших адрес налаштуйте власний SMTP у Supabase Auth.";
    } else {
      authMessage.textContent = result.error.message;
    }
    return;
  }

  if (authMode === "signup" && !result.data.session) {
    authMessage.textContent =
      "Якщо для цієї адреси потрібне підтвердження, перевірте пошту та папку «Спам». Якщо акаунт уже існує — перейдіть до «Увійти».";
    document.querySelector("#resend-confirmation").hidden = false;
    return;
  }

  authMessage.textContent = "Ви увійшли.";
  await syncSession(result.data.session);
  window.setTimeout(() => {
    authDialog.close();
    authDialog.dataset.requireAuth = "false";
    document.querySelector("#continue-guest").hidden = false;
    authDialog.querySelector(".dialog-intro").textContent =
      "Увійдіть у наявний акаунт або створіть новий. Роль модератора призначає адміністратор окремо.";
    openPendingApplication();
  }, 350);
}

async function resendConfirmation() {
  authMessage.textContent = "";
  const email = authForm.querySelector('[name="email"]').value.trim();
  if (!email) {
    authMessage.textContent = "Введіть свою електронну пошту.";
    authForm.querySelector('[name="email"]').focus();
    return;
  }

  const { error } = await supabaseClient.auth.resend({
    type: "signup",
    email,
  });
  if (error) {
    authMessage.textContent = `Не вдалося надіслати лист: ${error.message}`;
    return;
  }
  authMessage.textContent =
    "Запит на лист надіслано. Перевірте вхідні, спам і правильність адреси.";
}

async function sendPasswordReset() {
  authMessage.textContent = "";
  const email = authForm.querySelector('[name="email"]').value.trim();
  if (!email) {
    authMessage.textContent = "Введіть пошту акаунта для відновлення пароля.";
    authForm.querySelector('[name="email"]').focus();
    return;
  }

  const redirectTo = `${window.location.origin}${window.location.pathname}`;
  const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
    redirectTo,
  });
  if (error) {
    authMessage.textContent = `Не вдалося надіслати посилання: ${error.message}`;
    return;
  }
  authMessage.textContent =
    "Якщо акаунт із цією адресою існує, надіслано посилання для зміни пароля. Перевірте також папку «Спам».";
}

async function handleListingSubmit(event) {
  event.preventDefault();
  listingMessage.textContent = "";

  if (!supabaseClient || !currentSession || !isModerator) {
    listingMessage.textContent =
      "Публікувати оголошення може лише авторизований модератор.";
    return;
  }

  const formData = new FormData(listingForm);
  const rawPrice = String(formData.get("price_usd")).trim();
  const imageUrl = String(formData.get("image_url")).trim();
  const listing = {
    title: String(formData.get("title")).trim(),
    description: String(formData.get("description")).trim(),
    category: String(formData.get("category")),
    region: String(formData.get("region")).trim(),
    price_usd: rawPrice ? Number(rawPrice) : null,
    price_negotiable: formData.has("price_negotiable"),
    image_url: imageUrl || null,
    status: "published",
    created_by: currentSession.user.id,
  };

  const { error } = await supabaseClient.from("listings").insert(listing);
  if (error) {
    listingMessage.textContent = `Не вдалося опублікувати оголошення: ${error.message}`;
    return;
  }

  listingForm.reset();
  listingDialog.close();
  showNotice("Оголошення опубліковано.", "success");
  await loadListings();
}

async function toggleFavorite(button) {
  if (!currentSession) {
    setAuthMode("login");
    authMessage.textContent =
      "Увійдіть або створіть акаунт, щоб зберігати оголошення в обраному.";
    authDialog.showModal();
    return;
  }

  if (!supabaseClient || !button.dataset.favoriteId) {
    showNotice(
      "Щоб зберігати оголошення, спочатку підключіть Supabase.",
      "error",
    );
    return;
  }

  const listingId = button.dataset.favoriteId;
  const alreadySaved = favorites.has(listingId);
  const result = alreadySaved
    ? await supabaseClient
        .from("listing_favorites")
        .delete()
        .eq("listing_id", listingId)
        .eq("user_id", currentSession.user.id)
    : await supabaseClient.from("listing_favorites").insert({
        listing_id: listingId,
        user_id: currentSession.user.id,
      });

  if (result.error) {
    showNotice(`Не вдалося оновити обране: ${result.error.message}`, "error");
    return;
  }

  if (alreadySaved) favorites.delete(listingId);
  else favorites.add(listingId);
  button.setAttribute("aria-pressed", String(!alreadySaved));
}

function attachPageEvents() {
  document.querySelectorAll(".contact-jump").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      document.querySelector("#contact-info").scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start",
      });
    });
  });

  document.querySelectorAll("[data-service-application]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      openServiceApplication(button.dataset.serviceApplication);
    });
  });
  applicationService.addEventListener("change", () => {
    activeApplicationService = applicationService.value;
    document.querySelector("#application-title").textContent = t(
      activeApplicationService || "Подати заявку",
    );
  });
  applicationForm.addEventListener("submit", handleApplicationSubmit);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    applyFilters();
  });

  document.querySelector("#clear-filters").addEventListener("click", () => {
    form.reset();
    applyFilters();
  });

  document.querySelector("#reset-filters").addEventListener("click", () => {
    form.reset();
    document.querySelectorAll(".category-link").forEach((button) => {
      button.classList.toggle("selected", button.dataset.category === "all");
    });
    applyFilters();
  });

  document.querySelectorAll(".category-link").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".category-link").forEach((item) => {
        item.classList.toggle("selected", item === button);
      });
      typeFilter.value = button.dataset.category;
      applyFilters();
    });
  });

  document.querySelectorAll(".sort-tab").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".sort-tab").forEach((item) => {
        item.classList.toggle("selected", item === button);
      });
      const cards = [...listingGrid.querySelectorAll(".listing-card")];
      cards.sort((first, second) => {
        if (button.dataset.sort === "price") {
          const firstPrice = Number(first.dataset.price) || Infinity;
          const secondPrice = Number(second.dataset.price) || Infinity;
          return firstPrice - secondPrice;
        }
        if (first.dataset.createdAt || second.dataset.createdAt) {
          return (
            new Date(second.dataset.createdAt || 0) -
            new Date(first.dataset.createdAt || 0)
          );
        }
        return Number(first.dataset.date || 0) - Number(second.dataset.date || 0);
      });
      cards.forEach((card) => listingGrid.append(card));
    });
  });

  listingGrid.addEventListener("click", async (event) => {
    const favoriteButton = event.target.closest(".favorite-button");
    if (favoriteButton) {
      await toggleFavorite(favoriteButton);
      return;
    }

    const detailsButton = event.target.closest(".details-button");
    if (!detailsButton) return;
    const listingCard = detailsButton.closest(".listing-card");
    const listing = listingsById.get(detailsButton.dataset.listingId);
    document.querySelector("#dialog-title").textContent =
      listing?.title || listingCard?.querySelector("h2")?.textContent || "Пропозиція";
    document.querySelector("#dialog-copy").textContent =
      listing?.description ||
      "Деталі надаються за запитом.";
    detailsDialog.showModal();
  });

  document.querySelector("#dialog-close").addEventListener("click", () => {
    detailsDialog.close();
  });

  detailsDialog.addEventListener("click", (event) => {
    if (event.target === detailsDialog) detailsDialog.close();
  });

  document.querySelector("#focus-search").addEventListener("click", () => {
    searchInput.focus();
    searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  authButton.addEventListener("click", () => {
    if (!currentSession) {
      authDialog.dataset.requireAuth = "false";
      document.querySelector("#continue-guest").hidden = false;
      authDialog.querySelector(".dialog-intro").textContent =
        "Увійдіть у наявний акаунт або створіть новий. Роль модератора призначає адміністратор окремо.";
      authMessage.textContent = "";
      setAuthMode("login");
      authDialog.showModal();
    }
  });

  document.querySelectorAll("[data-auth-mode]").forEach((button) => {
    button.addEventListener("click", () => setAuthMode(button.dataset.authMode));
  });

  document.querySelector("#password-toggle").addEventListener("click", (event) => {
    const passwordInput = authForm.querySelector('[name="password"]');
    const isVisible = passwordInput.type === "text";
    passwordInput.type = isVisible ? "password" : "text";
    event.currentTarget.textContent = t(isVisible ? "Показати" : "Сховати");
    event.currentTarget.setAttribute(
      "aria-label",
      t(isVisible ? "Показати пароль" : "Сховати пароль"),
    );
    event.currentTarget.setAttribute("aria-pressed", String(!isVisible));
  });

  document.querySelector("#forgot-password").addEventListener("click", () => {
    if (!supabaseClient) {
      authMessage.textContent =
        "Спочатку підключіть Supabase у файлі supabase-config.js.";
      return;
    }
    void sendPasswordReset();
  });

  document
    .querySelector("#resend-confirmation")
    .addEventListener("click", () => {
      if (!supabaseClient) {
        authMessage.textContent =
          "Спочатку підключіть Supabase у файлі supabase-config.js.";
        return;
      }
      void resendConfirmation();
    });

  document.querySelectorAll("[data-close-dialog]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector(`#${button.dataset.closeDialog}`).close();
    });
  });

  document.querySelector("#continue-guest").addEventListener("click", () => {
    authDialog.close();
  });

  authForm.addEventListener("submit", handleAuthSubmit);
  postListingButton.addEventListener("click", () => {
    if (!isModerator) {
      showNotice("Додавати оголошення може лише модератор.", "error");
      return;
    }
    listingMessage.textContent = "";
    listingDialog.showModal();
  });
  listingForm.addEventListener("submit", handleListingSubmit);

  signoutButton.addEventListener("click", async () => {
    if (!supabaseClient) return;
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      showNotice(`Не вдалося вийти з акаунта: ${error.message}`, "error");
      return;
    }
    showNotice("Ви вийшли з акаунта. Доступний гостьовий режим.");
  });

  [authDialog, listingDialog, applicationDialog].forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  });
}

async function initializeSupabase() {
  renderListings([]);

  if (!hasSupabaseConfig) {
    showNotice(
      "Гостьовий режим: підключіть URL та anon key у supabase-config.js, щоб увімкнути акаунти й оголошення з бази.",
    );
    applyFilters();
    return;
  }

  if (!window.supabase?.createClient) {
    showNotice(
      "Не вдалося завантажити бібліотеку Supabase. Перевірте підключення до інтернету.",
      "error",
    );
    return;
  }

  try {
    supabaseClient = window.supabase.createClient(
      configuration.url.trim(),
      configuration.anonKey.trim(),
    );
  } catch (error) {
    showNotice(`Помилка налаштування Supabase: ${error.message}`, "error");
    return;
  }

  const {
    data: { subscription },
  } = supabaseClient.auth.onAuthStateChange((event, session) => {
    window.setTimeout(() => {
      if (event === "PASSWORD_RECOVERY") {
        setAuthMode("recovery");
        authMessage.textContent =
          "Посилання підтверджено. Введіть новий пароль для акаунта.";
        authDialog.showModal();
      }
      void syncSession(session);
    }, 0);
  });
  window.addEventListener("beforeunload", () => subscription.unsubscribe(), {
    once: true,
  });

  const { data, error } = await supabaseClient.auth.getSession();
  if (error) {
    showNotice(`Не вдалося відновити сесію: ${error.message}`, "error");
    return;
  }

  await syncSession(data.session);
  openPendingApplication();
  await loadListings();
}

initializeTheme();
attachPageEvents();
window.addEventListener("languagechange", () => {
  if (!cachedListings.length) return;
  const existingOrder = [...listingGrid.querySelectorAll(".listing-card")].map(
    (card) => card.dataset.listingId,
  );
  const order = new Map(existingOrder.map((id, index) => [id, index]));
  renderListings(cachedListings);
  [...listingGrid.querySelectorAll(".listing-card")]
    .sort(
      (first, second) =>
        (order.get(first.dataset.listingId) ?? Infinity) -
        (order.get(second.dataset.listingId) ?? Infinity),
    )
    .forEach((card) => listingGrid.append(card));
});
void initializeSupabase();
  