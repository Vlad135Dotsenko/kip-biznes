const ukrainianToEnglish = new Map(Object.entries({
  "КІП-БІЗНЕС — перевірка та розвиток бізнесу": "KIP-BUSINESS — business verification and growth",
  "Перевірка контрагентів, супровід угод і консультації щодо фінансування та купівлі бізнесу в Україні.": "Counterparty checks, deal support, and advice on financing and buying a business in Ukraine.",
  "КІП-БІЗНЕС — на головну": "KIP-BUSINESS — home",
  "Пошук": "Search",
  "Укр": "UKR",
  "Увімкнути темну тему": "Enable dark mode",
  "Увімкнути світлу тему": "Enable light mode",
  "Темна": "Dark",
  "Світла": "Light",
  "Контакти": "Contacts",
  "Увійти": "Sign in",
  "Вийти": "Sign out",
  "Телефон": "Phone",
  "E-mail": "E-mail",
  "Написати повідомлення": "Send a message",
  "Залишити заявку": "Submit an inquiry",
  "Залиште заявку": "Submit an inquiry",
  "Щоб зв'язатися з нами, залиште заявку": "To get in touch, submit an inquiry",
  "Зв'яжіться з нами через форму заявки або електронну пошту.": "Contact us using the inquiry form or email.",
  "Повідомлення": "Message",
  "Заявка": "Inquiry",
  "Платформа для розвитку бізнесу в Україні": "A platform for business growth in Ukraine",
  "Бізнес в Україні: аналітика та розвиток": "Business in Ukraine: insights and growth",
  "Аналітика, супровід угод і перевірені можливості для розвитку бізнесу.": "Business insights, deal support, and vetted growth opportunities.",
  "Підтверджений акаунт": "Verified account",
  "Послуги КІП-БІЗНЕС": "KIP-BUSINESS services",
  "01 / АНАЛІТИКА": "01 / INSIGHTS",
  "Аналіз контрагентів": "Counterparty checks",
  "Перевірка ризиків в Україні та за її межами": "Risk checks in Ukraine and internationally",
  "Аналіз зовнішньоекономічних контрактів": "International contract reviews",
  "Реєстри, судові справи та міжнародні джерела": "Public records, court cases, and international sources",
  "Фінансування та розвиток": "Financing and growth",
  "Консультації щодо кредитування та купівлі бізнесу": "Advice on business financing and acquisitions",
  "Купівля та продаж бізнесу": "Buying and selling a business",
  "Переглянути актуальні пропозиції": "Browse current listings",
  "Захищаємо ваші рішення": "Make informed decisions",
  "Аналіз контрагентів з України": "Counterparty checks in Ukraine",
  "Чому важлива перевірка": "Why due diligence matters",
  "Один неперевірений партнер, необґрунтований платіж або пропущена вимога регулятора можуть коштувати бізнесу часу, коштів і репутації. Перевірка допомагає помітити ризики до того, як вони переростуть у проблему.": "An unverified partner, an unjustified payment, or a missed regulatory request can cost a business time, money, and reputation. Checks help identify risks before they become problems.",
  "Ризики до угоди": "Understand risks before a deal",
  "Допомагаємо перевірити партнера й побачити можливі проблеми до підписання документів.": "We help you vet a business partner and identify potential issues before signing.",
  "Перевірка за джерелами": "Research across trusted sources",
  "Перевіряємо державні й міжнародні реєстри, санкційні ризики та фінансовий стан, а також доступну інформацію про тендери, судові справи, стягнення й кримінальні провадження.": "We review government and international records, sanctions risks, and financial standing, along with available information on tenders, court cases, enforcement actions, and criminal proceedings.",
  "Обґрунтовані рішення": "Informed decisions",
  "Ви ведете бізнес — ми надаємо інформацію, потрібну для впевнених рішень.": "You run your business—we provide the information you need to make confident decisions.",
  "Досвід, на який можна покластися": "Experience you can rely on",
  "Хто здійснює перевірку": "Who conducts the checks",
  "Понад 20 років досвіду": "Over 20 years of experience",
  " у банківській системі, фінансовому моніторингу, комплаєнсі та аналізі ризиків.": " in banking, financial monitoring, compliance, and risk analysis.",
  "Робота з міжнародними ринками": "Working across international markets",
  "ДЖЕРЕЛА ДАНИХ": "DATA SOURCES",
  "Державні та судові реєстри, санкційні списки, фінансова звітність і доступні міжнародні джерела.": "Government and court records, sanctions lists, financial statements, and available international sources.",
  "ГЕОГРАФІЯ": "COVERAGE",
  "Перевірка контрагентів з країн Європи, Азії, Північної та Південної Америки.": "Counterparty checks across Europe, Asia, North America, and South America.",
  "Можливості для вашого бізнесу": "Opportunities for your business",
  "Долучайтеся до бізнес-спільноти КІП-БІЗНЕС": "Join the KIP-BUSINESS community",
  "Продаж бізнесу": "Business for sale",
  "Венчурні інвестиції": "Venture capital",
  "Кредитування бізнесу": "Business financing",
  "Терміновий викуп бізнесу": "Urgent business acquisition",
  "Новини та аналітика": "News and insights",
  "Корисне для важливих рішень": "Insights for important decisions",
  "Практичні теми для власників і керівників бізнесу": "Practical topics for business owners and leaders",
  "Що перевірити перед підписанням угоди з новим партнером": "What to check before signing a deal with a new partner",
  "Репутація · Фінансовий стан · Судові ризики": "Reputation · Financial standing · Litigation risks",
  "До послуги": "Explore service",
  "Міжнародна торгівля": "International trade",
  "Зовнішньоекономічний контракт: які ризики оцінити заздалегідь": "International contracts: risks to assess in advance",
  "Сторони контракту · Санкції · Джерела даних": "Contracting parties · Sanctions · Data sources",
  "Дізнатися більше": "Learn more",
  "Купівля бізнесу": "Business acquisition",
  "Що перевірити перед купівлею готового бізнесу": "What to check before buying an established business",
  "Активи · Можливості · Перевірка інформації": "Assets · Opportunities · Due diligence",
  "До пропозицій": "Browse listings",
  "Усі пропозиції": "All listings",
  "Нерухомість": "Real estate",
  "Земля": "Land",
  "Розмістити оголошення": "Post a listing",
  "＋ Розмістити оголошення": "＋ Post a listing",
  "Список пропозицій": "Listing results",
  "Актуальні пропозиції": "Current listings",
  "Сортування": "Sort listings",
  "Нові": "Newest",
  "За ціною": "By price",
  "Ціна продажу": "Asking price",
  "Детальніше": "View details",
  "Перевірено модератором": "Verified by moderator",
  "Додати виробничий комплекс в обране": "Add the industrial complex to favorites",
  "Додати готельний комплекс в обране": "Add the hotel complex to favorites",
  "Сучасне виробниче обладнання у світлому цеху": "Modern manufacturing equipment in a bright factory",
  "Сучасний заміський готель серед зелених дерев": "A modern country hotel surrounded by greenery",
  "Комерційна нерухомість": "Commercial real estate",
  "22 жовтня 2026": "October 22, 2026",
  "19 жовтня 2026": "October 19, 2026",
  "Виробничий комплекс із власною інфраструктурою": "Industrial complex with dedicated infrastructure",
  "Готельно-ресторанний комплекс у туристичному регіоні": "Hotel and restaurant complex in a tourist region",
  "Київська область": "Kyiv region",
  "Львівська область": "Lviv region",
  "За цими параметрами нічого не знайшли": "No listings match these filters",
  "Змініть фільтри або перегляньте всі пропозиції.": "Adjust the filters or browse all listings.",
  "Скинути фільтри": "Reset filters",
  "Усі оголошення на цій сторінці розміщені акаунтом модератора.": "All listings on this page are posted by the moderator account.",
  "Пошук та фільтри": "Search and filters",
  "Шукаєте бізнес?": "Looking for a business?",
  "Перегляньте актуальні пропозиції": "Browse current listings",
  "Знайдіть своє": "Find the right opportunity",
  "Пошук пропозицій": "Search listings",
  "Ключове слово": "Keyword",
  "Наприклад, готель": "For example, hotel",
  "Тип об'єкта": "Listing type",
  "Усі типи": "All types",
  "Уся Україна": "All of Ukraine",
  "Регіон": "Region",
  "Ціна від, $": "Price from, $",
  "Ціна до, $": "Price up to, $",
  "Без обмежень": "No limit",
  "Показати пропозиції": "Show listings",
  "Очистити фільтри": "Clear filters",
  "Потрібна консультація?": "Need advice?",
  "Напишіть нашій команді": "Contact our team",
  "Заявка на консультацію": "Consultation request",
  "Подати заявку": "Submit a request",
  "Заявка буде надіслана команді КІП-БІЗНЕС. Для її подання потрібно увійти або створити акаунт.": "Your request will be sent to the KIP-BUSINESS team. Sign in or create an account to submit it.",
  "Напрям заявки": "Request type",
  "Оберіть напрям заявки": "Select a request type",
  "Ваше ім'я": "Your name",
  "Телефон для зв'язку": "Contact phone",
  "Коментар до заявки": "Message",
  "Коротко опишіть ваш запит": "Briefly describe your request",
  "Надіслати заявку": "Send request",
  "Пропозиція від модератора": "Listing from the moderator",
  "Запит щодо об'єкта": "Listing inquiry",
  "Запитати подробиці": "Request details",
  "Акаунт КІП-БІЗНЕС": "KIP-BUSINESS account",
  "Увійти в акаунт": "Sign in to your account",
  "Увійдіть у наявний акаунт або створіть новий. Роль модератора призначає адміністратор окремо.": "Sign in or create an account. Moderator access is assigned separately by an administrator.",
  "Дія з акаунтом": "Account action",
  "Створити акаунт": "Create account",
  "Як до вас звертатися": "Your name",
  "Електронна пошта": "Email address",
  "Пароль": "Password",
  "Показати пароль": "Show password",
  "Сховати пароль": "Hide password",
  "Повторіть новий пароль": "Confirm new password",
  "Якщо акаунт уже створений, оберіть «Увійти» або скористайтеся відновленням пароля.": "If you already have an account, choose “Sign in” or reset your password.",
  "Якщо акаунт уже створений, оберіть «Увійти». Після реєстрації перевірте пошту для підтвердження.": "If you already have an account, choose “Sign in.” After registering, check your email for a confirmation link.",
  "Вигадайте новий пароль довжиною щонайменше 8 символів.": "Choose a new password with at least 8 characters.",
  "Немає акаунта? Перейдіть до «Створити акаунт». Якщо забули пароль, скористайтеся відновленням.": "New here? Choose “Create account.” If you forgot your password, use password recovery.",
  "Зареєструватися": "Register",
  "Зберегти новий пароль": "Save new password",
  "Забули пароль?": "Forgot password?",
  "Надіслати лист підтвердження ще раз": "Resend confirmation email",
  "Продовжити як гість": "Continue as guest",
  "Панель модератора": "Moderator panel",
  "Нове оголошення": "New listing",
  "Назва": "Title",
  "Опис": "Description",
  "Наприклад, Київська область": "For example, Kyiv region",
  "Ціна, $ (необов'язково)": "Price, $ (optional)",
  "Посилання на фото (необов'язково)": "Image URL (optional)",
  "Ціна договірна": "Price negotiable",
  "Опублікувати оголошення": "Publish listing",
  "Контакти та інша інформація": "Contact and other information",
  "Завжди на зв'язку": "Get in touch",
  "© 2026 КІП-БІЗНЕС · Перевірка та розвиток бізнесу в Україні": "© 2026 KIP-BUSINESS · Business verification and growth in Ukraine",
  "Інша пропозиція": "Other listing",
  "Договірна": "Negotiable",
  "За запитом": "Upon request",
  "Щойно": "Just now",
  "Акаунт: модератор": "Account: moderator",
  "Акаунт: користувач": "Account: user",
  "Ви увійшли як модератор": "Signed in as moderator",
  "Ви увійшли як користувач": "Signed in as user",
  "Увійти до акаунта": "Access your account",
  "Тема": "Theme",
  "Логотип КІП-БІЗНЕС": "KIP-BUSINESS logo",
  "Категорії оголошень": "Listing categories",
  "Закрити": "Close",
  " у банківській системі, фінансовому моніторингу, комплаєнсі та аналізі ризиків.": " in banking, financial monitoring, compliance, and risk analysis.",
  "у банківській системі, фінансовому моніторингу, комплаєнсі та аналізі ризиків.": "in banking, financial monitoring, compliance, and risk analysis.",
  "Перевірка контрагентів": "Counterparty checks",
  "Категорія": "Category",
  "Показати": "Show",
  "Перевірка та розвиток бізнесу в Україні": "Business verification and growth in Ukraine",
  "© 2026 КІП-БІЗНЕС": "© 2026 KIP-BUSINESS",
  "в обране": "to favorites",
  "Додати": "Add",
  "Увійдіть у свій акаунт, щоб надіслати заявку.": "Sign in to your account to send a request.",
  "Не вдалося надіслати заявку. Перевірте налаштування Supabase Function та пошти": "Could not send the request. Check the Supabase Function and email settings",
  "Заявку збережено в базі, але email-сповіщення не надіслано. Перевірте налаштування Gmail SMTP у Supabase.": "The request was saved, but the email notification was not sent. Check the Gmail SMTP settings in Supabase.",
  "Не вдалося завантажити оголошення з бази": "Could not load listings from the database",
  "Не вдалося завантажити обране": "Could not load favorites",
  "Не вдалося перевірити права акаунта": "Could not verify account permissions",
  "Не вдалося змінити пароль": "Could not update password",
  "Пароль змінено, але не вдалося завершити сесію": "Password updated, but could not end the session",
  "Акаунт уже є, але пошта ще не підтверджена. Перевірте спам або надішліть лист підтвердження ще раз.": "This account already exists, but the email is not confirmed. Check your spam folder or resend the confirmation email.",
  "Цей акаунт уже існує. Перейдіть до «Увійти» або скористайтеся відновленням пароля.": "This account already exists. Choose “Sign in” or reset your password.",
  "Supabase не надіслав лист. Для тестового SMTP адреса має належати учаснику проєкту; для інших адрес налаштуйте власний SMTP у Supabase Auth.": "Supabase did not send the email. With test SMTP, the address must belong to a project member; for other addresses, configure a custom SMTP server in Supabase Auth.",
  "Якщо для цієї адреси потрібне підтвердження, перевірте пошту та папку «Спам». Якщо акаунт уже існує — перейдіть до «Увійти».": "If this address requires confirmation, check your inbox and spam folder. If the account already exists, choose “Sign in.”",
  "Запит на лист надіслано. Перевірте вхідні, спам і правильність адреси.": "The email request was sent. Check your inbox and spam folder, and verify the address.",
  "Якщо акаунт із цією адресою існує, надіслано посилання для зміни пароля. Перевірте також папку «Спам».": "If an account exists for this address, a password reset link has been sent. Also check your spam folder.",
  "Публікувати оголошення може лише авторизований модератор.": "Only an authenticated moderator can publish listings.",
  "Увійдіть або створіть акаунт, щоб зберігати оголошення в обраному.": "Sign in or create an account to save listings to favorites.",
  "Щоб зберігати оголошення, спочатку підключіть Supabase.": "Connect Supabase first to save listings.",
  "Додавати оголошення може лише модератор.": "Only a moderator can add listings.",
  "Гостьовий режим: підключіть URL та anon key у supabase-config.js, щоб увімкнути акаунти й оголошення з бази.": "Guest mode: add the URL and anon key in supabase-config.js to enable accounts and database listings.",
  "Не вдалося завантажити бібліотеку Supabase. Перевірте підключення до інтернету.": "Could not load the Supabase library. Check your internet connection.",
  "Посилання підтверджено. Введіть новий пароль для акаунта.": "The link is confirmed. Enter a new password for your account.",
  "Вхід": "Sign in",
  "Створити акаунт": "Create account",
  "Задайте новий пароль": "Set a new password",
  "Новий пароль": "New password",
  "Зареєструватися": "Register",
  "Зберегти новий пароль": "Save new password",
  "Заявку збережено": "Request saved",
  "Додати оголошення": "Add a listing",
  "Виробничий комплекс": "Industrial complex",
  "готельний комплекс": "hotel complex",
  "Увійдіть у свій акаунт, щоб надіслати заявку.": "Sign in to your account to send a request.",
  "Не вдалося завантажити оголошення з бази:": "Could not load listings from the database:",
  "Не вдалося завантажити обране:": "Could not load favorites:",
  "Не вдалося перевірити права акаунта:": "Could not verify account permissions:",
  "Не вдалося змінити пароль:": "Could not update password:",
  "Пароль змінено, але не вдалося завершити сесію:": "Password updated, but could not end the session:",
  "Не вдалося надіслати лист:": "Could not send the email:",
  "Не вдалося надіслати посилання:": "Could not send the link:",
  "Не вдалося опублікувати оголошення:": "Could not publish the listing:",
  "Не вдалося оновити обране:": "Could not update favorites:",
  "Не вдалося вийти з акаунта:": "Could not sign out:",
  "Помилка налаштування Supabase:": "Supabase configuration error:",
  "Не вдалося відновити сесію:": "Could not restore the session:",
  "Не вдалося завантажити оголошення:": "Could not load listings:",
  "Не вдалося надіслати заявку. Перевірте налаштування Supabase Function та пошти:": "Could not send the request. Check the Supabase Function and email settings:",
  "Цей акаунт уже існує. Перейдіть до «Увійти» або скористайтеся відновленням пароля.": "This account already exists. Choose “Sign in” or reset your password.",
  "Акаунт уже є, але пошта ще не підтверджена. Перевірте спам або надішліть лист підтвердження ще раз.": "This account exists, but the email is not confirmed. Check your spam folder or resend the confirmation email.",
  "Публікувати оголошення може лише авторизований модератор.": "Only an authenticated moderator can publish listings.",
  "Увійдіть або створіть акаунт, щоб зберігати оголошення в обраному.": "Sign in or create an account to save listings to favorites.",
  "Заявку збережено в базі, але email-сповіщення не надіслано. Перевірте налаштування Gmail SMTP у Supabase.": "The request was saved, but the email notification was not sent. Check the Gmail SMTP settings in Supabase.",
  "Заявку збережено в базі": "The request was saved in the database",
  "Введіть пошту акаунта для відновлення пароля.": "Enter your account email to reset your password.",
  "Заявку не збережено. Спробуйте ще раз пізніше.": "The request was not saved. Please try again later.",
  "Щоб подати заявку, увійдіть або створіть акаунт. Після входу форма заявки відкриється автоматично.": "Sign in or create an account to submit a request. The request form will open automatically after you sign in.",
  "Сховати": "Hide",
  "Не вдалося завантажити бібліотеку Supabase. Перевірте підключення до інтернету.": "Could not load the Supabase library. Check your internet connection.",
  "Пароль змінено. Тепер можна увійти.": "Password updated. You can now sign in.",
  "Ви увійшли.": "You are signed in.",
  "Введіть свою електронну пошту.": "Enter your email address.",
  "Запит на лист надіслано. Перевірте вхідні, спам і правильність адреси.": "The email request was sent. Check your inbox and spam folder, and verify the address.",
  "Якщо акаунт із цією адресою існує, надіслано посилання для зміни пароля. Перевірте також папку «Спам».": "If an account exists for this address, a password reset link has been sent. Also check your spam folder.",
  "Публікувати оголошення може лише авторизований модератор.": "Only an authenticated moderator can publish listings.",
  "Оголошення опубліковано.": "Listing published.",
  "Увійдіть або створіть акаунт, щоб зберігати оголошення в обраному.": "Sign in or create an account to save listings to favorites.",
  "Щоб зберігати оголошення, спочатку підключіть Supabase.": "Connect Supabase first to save listings.",
  "Деталі надаються за запитом.": "Details are available upon request.",
  "Пропозиція": "Listing",
  "Додавати оголошення може лише модератор.": "Only a moderator can add listings.",
  "Ви вийшли з акаунта. Доступний гостьовий режим.": "You have signed out. Guest mode is available.",
  "Гостьовий режим: підключіть URL та anon key у supabase-config.js, щоб увімкнути акаунти й оголошення з бази.": "Guest mode: add the URL and anon key in supabase-config.js to enable accounts and database listings.",
  "Посилання підтверджено. Введіть новий пароль для акаунта.": "The link is confirmed. Enter a new password for your account.",
  "Введіть свою електронну пошту.": "Enter your email address.",
  "Введіть пошту акаунта для відновлення пароля.": "Enter your account email to reset your password.",
  "Паролі не збігаються.": "Passwords do not match.",
  "Пароль змінено. Тепер можна увійти.": "Password updated. You can now sign in.",
  "Ви увійшли.": "You are signed in.",
  "Ви вийшли з акаунта. Доступний гостьовий режим.": "You have signed out. Guest mode is available.",
  "Оголошення опубліковано.": "Listing published.",
  "Заявка буде надіслана команді КІП-БІЗНЕС. Для її подання потрібно увійти або створити акаунт.": "Your request will be sent to the KIP-BUSINESS team. Sign in or create an account to submit it.",
  "Надсилаємо заявку…": "Sending your request…",
  "Заявку не збережено. Спробуйте ще раз пізніше.": "The request was not saved. Please try again later.",
  "Заявку надіслано. Ми зв'яжемося з вами.": "Request sent. We will be in touch.",
  "Гостьовий режим: підключіть URL та anon key у supabase-config.js, щоб увімкнути акаунти й оголошення з бази.": "Guest mode: add the URL and anon key in supabase-config.js to enable accounts and database listings.",
  "Спочатку підключіть Supabase у файлі supabase-config.js.": "Connect Supabase in supabase-config.js first.",
  "Ви ведете бізнес — ми надаємо інформацію, потрібну для впевнених рішень.": "You run your business—we provide the information you need to make confident decisions.",
}));

const englishToUkrainian = new Map(
  [...ukrainianToEnglish].map(([ukrainian, english]) => [english, ukrainian]),
);
const translationKeysByLength = {
  en: [...ukrainianToEnglish.keys()].sort((first, second) => second.length - first.length),
  uk: [...englishToUkrainian.keys()].sort((first, second) => second.length - first.length),
};
const originalText = new WeakMap();
const originalAttributes = new WeakMap();
const originalMailto = new WeakMap();
let siteLanguage = "uk";

function translateText(value, language = siteLanguage) {
  if (typeof value !== "string") return value;
  const dictionary = language === "en" ? ukrainianToEnglish : englishToUkrainian;
  const trimmed = value.trim();
  let translated = dictionary.get(trimmed);
  if (!translated) {
    const keys = translationKeysByLength[language === "en" ? "en" : "uk"];
    const prefix = keys.find(
      (key) =>
        trimmed.startsWith(key) &&
        trimmed.length > key.length &&
        /^[\s:—-]/.test(trimmed.slice(key.length)),
    );
    if (prefix) translated = `${dictionary.get(prefix)}${trimmed.slice(prefix.length)}`;
  }
  if (!translated) return value;
  const start = value.match(/^\s*/)?.[0] || "";
  const end = value.match(/\s*$/)?.[0] || "";
  return `${start}${translated}${end}`;
}

function setSiteLanguage(language, persist = true) {
  siteLanguage = language === "en" ? "en" : "uk";
  document.documentElement.lang = siteLanguage;
  document.title = translateText(
    "КІП-БІЗНЕС — перевірка та розвиток бізнесу",
    siteLanguage,
  );
  const socialTitle = document.querySelector('meta[property="og:title"]');
  if (socialTitle) socialTitle.content = document.title;
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.content = document.title;
  const description = document.querySelector('meta[name="description"]');
  const socialDescription = document.querySelector(
    'meta[property="og:description"]',
  );
  const twitterDescription = document.querySelector(
    'meta[name="twitter:description"]',
  );
  const descriptionText =
    "Перевірка контрагентів, супровід угод і консультації щодо фінансування та купівлі бізнесу в Україні.";
  if (description) {
    description.content = translateText(descriptionText, siteLanguage);
  }
  if (socialDescription) {
    socialDescription.content = translateText(descriptionText, siteLanguage);
  }
  if (twitterDescription) {
    twitterDescription.content = translateText(descriptionText, siteLanguage);
  }

  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (node.parentElement?.closest("#language-toggle")) continue;
    if (!originalText.has(node)) originalText.set(node, node.nodeValue);
    const translated = translateText(originalText.get(node), siteLanguage);
    if (translated !== node.nodeValue) node.nodeValue = translated;
  }

  const translatedAttributes = ["aria-label", "title", "placeholder", "alt"];
  document.body.querySelectorAll("*").forEach((element) => {
    let originals = originalAttributes.get(element);
    if (!originals) {
      originals = new Map();
      originalAttributes.set(element, originals);
    }
    translatedAttributes.forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;
      if (!originals.has(attribute)) {
        originals.set(attribute, element.getAttribute(attribute));
      }
      element.setAttribute(
        attribute,
        translateText(originals.get(attribute), siteLanguage),
      );
    });
  });

  const languageButton = document.querySelector("#language-toggle");
  if (languageButton) {
    languageButton.value = siteLanguage;
  }
  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    if (!originalMailto.has(link)) {
      originalMailto.set(link, link.getAttribute("href"));
    }
    const originalHref = originalMailto.get(link);
    if (siteLanguage === "uk") {
      link.setAttribute("href", originalHref);
      return;
    }
    const mailto = new URL(originalHref);
    const subject = mailto.searchParams.get("subject");
    if (subject) mailto.searchParams.set("subject", translateText(subject, "en"));
    link.setAttribute("href", mailto.href);
  });
  if (persist) {
    try {
      localStorage.setItem("kip-language", siteLanguage);
    } catch (error) {
      console.warn("Could not save language preference.", error);
    }
  }
  window.dispatchEvent(new CustomEvent("languagechange", { detail: siteLanguage }));
}

try {
  const savedLanguage = localStorage.getItem("kip-language");
  if (savedLanguage === "en") siteLanguage = "en";
} catch (error) {
  console.warn("Could not read language preference.", error);
}

window.translateText = translateText;
window.setSiteLanguage = setSiteLanguage;
setSiteLanguage(siteLanguage, false);
document.querySelector("#language-toggle")?.addEventListener("change", (event) => {
  setSiteLanguage(event.currentTarget.value);
});

new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.type === "characterData") {
      if (mutation.target.parentElement?.closest("#language-toggle")) return;
      const translated = translateText(mutation.target.nodeValue);
      if (translated !== mutation.target.nodeValue) {
        mutation.target.nodeValue = translated;
      }
      return;
    }

    if (mutation.type === "attributes") {
      if (mutation.target.closest("#language-toggle")) return;
      const value = mutation.target.getAttribute(mutation.attributeName);
      if (value === null) return;
      const translated = translateText(value);
      if (translated !== value) {
        mutation.target.setAttribute(mutation.attributeName, translated);
      }
      return;
    }

    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.parentElement?.closest("#language-toggle")) return;
        const translated = translateText(node.nodeValue);
        if (translated !== node.nodeValue) node.nodeValue = translated;
        return;
      }
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
      let textNode;
      while ((textNode = walker.nextNode())) {
        if (textNode.parentElement?.closest("#language-toggle")) continue;
        const translated = translateText(textNode.nodeValue);
        if (translated !== textNode.nodeValue) textNode.nodeValue = translated;
      }
      [node, ...node.querySelectorAll("*")].forEach((element) => {
        if (element.closest("#language-toggle")) return;
        ["aria-label", "title", "placeholder", "alt"].forEach((attribute) => {
          if (element.hasAttribute(attribute)) {
            const value = element.getAttribute(attribute);
            const translated = translateText(value);
            if (translated !== value) element.setAttribute(attribute, translated);
          }
        });
      });
    });
  });
}).observe(document.body, {
  subtree: true,
  childList: true,
  characterData: true,
  attributes: true,
  attributeFilter: ["aria-label", "title", "placeholder", "alt"],
});
