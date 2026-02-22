(() => {
  "use strict";

   // =========================
  // VERCEL ANALYTICS
  // =========================
  function injectVercelAnalytics() {
    if (document.querySelector('script[src="/_vercel/insights/script.js"]')) return;

    window.va =
      window.va ||
      function () {
        (window.vaq = window.vaq || []).push(arguments);
      };

    const s = document.createElement("script");
    s.defer = true;
    s.src = "/_vercel/insights/script.js";
    document.head.appendChild(s);
  }

  const CONFIG = {
    languages: ["bg", "en"],
    defaultLang: "bg",

    logo: {
      light: "images/logo-on-light.svg", // за светъл фон (тъмни букви)
      dark: "images/logo-on-dark.svg",   // за тъмен фон (бели букви)
      alt: {
        bg: "Лого на сайта",
        en: "Site logo",
      },
    },

    nav: {
      bg: [
        { label: "Начало", path: "index.html" },

        {
          label: "Бизнес услуги",
          path: "biznes-uslugi/biznes-uslugi.html",
          children: [
            { label: "Сайт", path: "biznes-uslugi/sait.html" },
            { label: "Лого", path: "biznes-uslugi/logo.html" },
            { label: "Визитки", path: "biznes-uslugi/vizitki.html" },
            { label: "Флаери и брошури", path: "biznes-uslugi/flaeri.html" },
            { label: "Календари", path: "biznes-uslugi/kalendari.html" },
            { label: "Етикети", path: "biznes-uslugi/etiketi.html" },
            { label: "Обяви за социални мрежи", path: "biznes-uslugi/postove.html" },
            { label: "Тетрадки и планери", path: "biznes-uslugi/tetradki-planeri.html" },
            { label: "Менюта и ценоразписи", path: "biznes-uslugi/cenorazpisi.html" },
          ],
        },

        {
          label: "Персонализирани артикули",
          path: "personalizirani/personalizirani.html",
          children: [
            { label: "Аксесоари и подаръци", path: "personalizirani/podaruci.html" },
            { label: "Дрехи", path: "personalizirani/drehi.html" },
            { label: "Тетрадки и планери", path: "personalizirani/tetradki-planeri.html" },
            { label: "Библейски дневници", path: "personalizirani/dnevnici.html" },
            { label: "Календари", path: "personalizirani/kalendari.html" },
            { label: "Картички", path: "personalizirani/kartichki.html" },
            { label: "Книгоразделители", path: "personalizirani/knigorazdeliteli.html" },
          ],
        },

        {
          label: "Специални събития",
          path: "sabitiya/sabitiya.html",
          children: [
            { label: "Покани", path: "sabitiya/pokani.html" },
            { label: "Табелки", path: "sabitiya/tabelki.html" },
            { label: "Картички с QR кодове", path: "sabitiya/qr-kartichki.html" },
            { label: "Аксесоари за събития", path: "sabitiya/aksesoari.html" },
          ],
        },

        { label: "Контакт", path: "index.html#contact" },
      ],

      en: [
        { label: "Home", path: "index.html" },

        {
          label: "Business Services",
          path: "biznes-uslugi/biznes-uslugi.html",
          children: [
            { label: "Website", path: "biznes-uslugi/sait.html" },
            { label: "Logo", path: "biznes-uslugi/logo.html" },
            { label: "Business Cards", path: "biznes-uslugi/vizitki.html" },
            { label: "Flyers & Brochures", path: "biznes-uslugi/flaeri.html" },
            { label: "Calendars", path: "biznes-uslugi/kalendari.html" },
            { label: "Labels", path: "biznes-uslugi/etiketi.html" },
            { label: "Social Media Posts", path: "biznes-uslugi/postove.html" },
            { label: "Notebooks & Planners", path: "biznes-uslugi/tetradki-planeri.html" },
            { label: "Menus & Price Lists", path: "biznes-uslugi/cenorazpisi.html" },
          ],
        },

        {
          label: "Personalized Items",
          path: "personalizirani/personalizirani.html",
          children: [
            { label: "Accessories & Gifts", path: "personalizirani/podaruci.html" },
            { label: "Clothing", path: "personalizirani/drehi.html" },
            { label: "Notebooks & Planners", path: "personalizirani/tetradki-planeri.html" },
            { label: "Biblical journals", path: "personalizirani/dnevnici.html" },
            { label: "Calendars", path: "personalizirani/kalendari.html" },
            { label: "Cards", path: "personalizirani/kartichki.html" },
            { label: "Bookmarks", path: "personalizirani/knigorazdeliteli.html" },
          ],
        },

        {
          label: "Special Events",
          path: "sabitiya/sabitiya.html",
          children: [
            { label: "Invitations", path: "sabitiya/pokani.html" },
            { label: "Name Place Cards", path: "sabitiya/tabelki.html" },
            { label: "QR Code Cards", path: "sabitiya/qr-kartichki.html" },
            { label: "Event Accessories", path: "sabitiya/aksesoari.html" },
          ],
        },

        { label: "Contact", path: "index.html#contact" },
      ],
    },
    legal: {
      bg: {
        terms: "terms_and_conditions/terms.html",
        privacy: "terms_and_conditions/privacy.html",
      },
      en: {
        terms: "terms_and_conditions/terms.html",
        privacy: "terms_and_conditions/privacy.html",
      },
    },

    footer: {
      copyright: {
        bg: "© 2026 Теодора Стоянов",
        en: "© 2026 Teodora Stoyanov",
      },
      social: [
        {
          key: "instagram",
          href: "https://www.instagram.com/tejodi_design_studio",
          icon: "images/futer_ikoni/instagram.svg",
          aria: { bg: "Instagram профил", en: "Instagram profile" },
          alt: { bg: "Instagram", en: "Instagram" },
        },
        {
          key: "messenger",
          href: "https://m.me/655115564362066",
          icon: "images/futer_ikoni/messenger.svg",
          aria: { bg: "Messenger съобщение", en: "Messenger message" },
          alt: { bg: "Messenger", en: "Messenger" },
        },
        {
          key: "viber",
          href: "https://connect.viber.com/en/account/tejodi-design-studio-34849",
          icon: "images/futer_ikoni/viber.svg",
          aria: { bg: "Viber чат", en: "Viber chat" },
          alt: { bg: "Viber", en: "Viber" },
        },
        {
          key: "email",
          href: "mailto:info@tejodidesign.eu",
          icon: "images/futer_ikoni/email.svg",
          aria: { bg: "Имейл", en: "Email" },
          alt: { bg: "Gmail", en: "Gmail" },
        },
      ],
    },
  };

  // =========================
  // Helpers
  // =========================
  function getBasePrefix() {
  const script =
    document.currentScript ||
    Array.from(document.scripts).find((s) => (s.src || "").includes("site-shell.js"));

  if (!script || !script.src) return "";

  const url = new URL(script.src, window.location.href);
  const href = url.href;

  // Ако някога решиш да го сложиш в /assets/js/, пак ще работи:
  const marker = "/assets/js/";
  const idx = href.toLowerCase().indexOf(marker);
  if (idx !== -1) return href.slice(0, idx + 1);

  // В твоя случай: site-shell.js е в root -> root prefix
  return href.replace(/site-shell\.js(\?.*)?$/i, "");
}


  function detectLang(pathname) {
    // pathname might be /en/... or /portfolio/en/... depending on hosting
    const parts = pathname.split("/").filter(Boolean);
    return parts.includes("en") ? "en" : "bg";
  }

  function getLangRootPrefix(lang) {
    return lang === "en" ? "en/" : "";
  }

function getCurrentLangRelativePath(pathname) {
  const parts = String(pathname || "").split("/").filter(Boolean);

  // Windows file:///C:/... -> махаме "C:" ако е първи сегмент
  if (parts[0] && /^[A-Za-z]:$/.test(parts[0])) parts.shift();

  // намираме къде е root папката на проекта
  // (ако проектът ти се казва по друг начин, смени "portfolio")
  const root = "portfolio";
  const rootIdx = parts.lastIndexOf(root);

  const safeParts = rootIdx !== -1 ? parts.slice(rootIdx + 1) : parts;

  // махаме езика от пътя, за да получим файл относително към root-а
  if (safeParts[0] === "en") safeParts.shift();

  return safeParts.join("/") || "index.html";
}

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (ch) => {
      const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };
      return map[ch] || ch;
    });
  }

  function fixLegalLinks(lang, basePrefix) {
    const legalCfg = (CONFIG.legal && (CONFIG.legal[lang] || CONFIG.legal[CONFIG.defaultLang])) || null;
    if (!legalCfg) return;

    const makeUrl = (path) => basePrefix + getLangRootPrefix(lang) + path;

    const termsUrl = makeUrl(legalCfg.terms);
    const privacyUrl = makeUrl(legalCfg.privacy);

    // Хващаме линкове по най-често срещани шаблони:
    // - по filename: terms.html / privacy.html
    // - по folder: terms_and_conditions
    // - по текст в линка: Terms/Privacy/Условия/Поверителност
    const anchors = Array.from(document.querySelectorAll("a[href]"));

    anchors.forEach((a) => {
      const href = (a.getAttribute("href") || "").trim();
      const text = (a.textContent || "").toLowerCase();

      const isTerms =
        /terms\.html(\#.*)?$/i.test(href) ||
        /terms_and_conditions\/terms/i.test(href) ||
        text.includes("terms") ||
        text.includes("условия");

      const isPrivacy =
        /privacy\.html(\#.*)?$/i.test(href) ||
        /terms_and_conditions\/privacy/i.test(href) ||
        text.includes("privacy") ||
        text.includes("поверител");

      if (isTerms) a.setAttribute("href", termsUrl);
      if (isPrivacy) a.setAttribute("href", privacyUrl);
    });
  }


  // =========================
  // Builders
  // =========================
  function buildNavHtml(lang, basePrefix) {
    const items = CONFIG.nav[lang] || CONFIG.nav[CONFIG.defaultLang];

    const link = (path) => basePrefix + getLangRootPrefix(lang) + path;

    const renderItem = (item) => {
      if (item.children && item.children.length) {
        const childrenHtml = item.children
          .map(
            (ch) =>
              `<li><a href="${escapeHtml(link(ch.path))}">${escapeHtml(ch.label)}</a></li>`
          )
          .join("");

        return `
          <li class="has-dropdown">
            <a href="${escapeHtml(link(item.path))}">${escapeHtml(item.label)}</a>
            <ul class="dropdown">
              ${childrenHtml}
            </ul>
          </li>
        `;
      }

      return `<li><a href="${escapeHtml(link(item.path))}">${escapeHtml(item.label)}</a></li>`;
    };

    return `<nav class="main-nav"><ul>${items.map(renderItem).join("")}</ul></nav>`;
  }

  function buildHeader(lang, basePrefix) {
  const home = basePrefix + getLangRootPrefix(lang) + "index.html";

  const logoLight = basePrefix + CONFIG.logo.light; // default за светла тема
  const logoDark = basePrefix + CONFIG.logo.dark;   // за dark mode

  const alt = CONFIG.logo.alt[lang] || CONFIG.logo.alt[CONFIG.defaultLang];

  return `
    <div class="logo-container">
      <a href="${escapeHtml(home)}">
        <picture class="brand-logo">
          <source media="(prefers-color-scheme: dark)" srcset="${escapeHtml(logoDark)}" />
          <img class="logo" src="${escapeHtml(logoLight)}" alt="${escapeHtml(alt)}" loading="eager" decoding="async" />
        </picture>
      </a>
    </div>
    ${buildNavHtml(lang, basePrefix)}
  `;
}

  function buildLanguageSwitcher(lang, basePrefix) {
  const rel = getCurrentLangRelativePath(window.location.pathname) || "index.html";

  const toBg = new URL(rel, basePrefix).href;
  const toEn = new URL("en/" + rel, basePrefix).href;

  return `
    <a class="lang${lang === "bg" ? " active" : ""}" href="${escapeHtml(toBg)}">БГ</a>
    <a class="lang${lang === "en" ? " active" : ""}" href="${escapeHtml(toEn)}">EN</a>
  `;
}

  function buildFooter(lang, basePrefix) {
    const c =
      CONFIG.footer.copyright[lang] ||
      CONFIG.footer.copyright[CONFIG.defaultLang];

    const links = CONFIG.footer.social
      .map((s) => {
        const href = s.href;
        const icon = basePrefix + s.icon;

        const aria =
          (s.aria && (s.aria[lang] || s.aria[CONFIG.defaultLang])) || "";

        const alt =
          (s.alt && (s.alt[lang] || s.alt[CONFIG.defaultLang])) || "";

        return `
          <a href="${escapeHtml(href)}" target="_blank" aria-label="${escapeHtml(
          aria
        )}" rel="noopener noreferrer">
            <img src="${escapeHtml(icon)}" alt="${escapeHtml(alt)}" />
          </a>
        `;
      })
      .join("");

    return `
      <div class="footer-content">
        <p>${escapeHtml(c)}</p>
        <div class="social-links">${links}</div>
      </div>
    `;
  }

  // =========================
  // Run
  // =========================
  function run() {
    injectVercelAnalytics(); 
    let basePrefix = getBasePrefix();
    const lang = detectLang(window.location.pathname);

    // ако basePrefix вече е .../en/, махаме /en/ за да не стане /en/en/
    basePrefix = basePrefix.replace(/\/en\/$/i, "/");

    const headerEl = document.getElementById("site-header");
    const switcherEl = document.getElementById("site-language-switcher");

    if (headerEl) {
      headerEl.classList.add("main-header");
      headerEl.innerHTML = buildHeader(lang, basePrefix);

      // Keep language switcher inside header (right side) even if
      // the placeholder div sits elsewhere in the HTML.
      if (switcherEl) {
        switcherEl.classList.add("language-switcher");
        switcherEl.innerHTML = buildLanguageSwitcher(lang, basePrefix);
        headerEl.appendChild(switcherEl);
      }
    } else if (switcherEl) {
      // Fallback: still render if there is no injected header on a page.
      switcherEl.classList.add("language-switcher");
      switcherEl.innerHTML = buildLanguageSwitcher(lang, basePrefix);
    }

    const footerEl = document.getElementById("site-footer");
    if (footerEl) {
      footerEl.classList.add("site-footer");
      footerEl.innerHTML = buildFooter(lang, basePrefix);
    }

    fixLegalLinks(lang, basePrefix);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
