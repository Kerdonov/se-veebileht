// Autor: Kevin Laig

/**
 * Ootab kuni DOM on täielikult laetud enne skripti käivitamist.
 * See tagab, et kõik HTML elemendid on olemas enne nende manipuleerimist.
 */
document.addEventListener("DOMContentLoaded", function () {
  /**
   * ThemeController objekt haldab veebilehe välimust (tume/hele režiim).
   * Võimaldab kasutajal vahetada režiimi ja salvestab eelistuse brauseri mällu.
   */
  const ThemeController = {
    // Võti, mida kasutatakse kasutaja režiimi eelistuse salvestamiseks localStorage'is
    STORAGE_KEY: "user-theme-preference",

    /**
     * Initsialiseerib teemakontrolleri:
     * - Leiab režiimi vahetamise nupu
     * - Seadistab ligipääsetavuse atribuudid
     * - Lisab vajalikud kuularid
     * - Määrab algse režiimi
     */
    init() {
      this.button = document.getElementById("theme-toggle");

      if (this.button) {
        this.setupButtonA11y();
        this.addEventListeners();
        this.setInitialTheme();
      }
    },

    /**
     * Seadistab nupu ligipääsetavuse atribuudid.
     * Lisab ARIA atribuudid.
     */
    setupButtonA11y() {
      this.button.setAttribute("role", "switch");
      this.button.setAttribute("aria-label", "Toggle theme");
    },

    /**
     * Lisab kõik vajalikud sündmuste kuularid:
     * - Hiireklõps teem vahetamiseks
     * - Klaviatuuri tugi (Enter ja tühik)
     * - Süsteemi režiimi muutuste jälgimine
     */
    addEventListeners() {
      // Režiimi vahetamise nupu klõpsamise kuular
      this.button.addEventListener("click", () => this.toggleTheme());

      // Klaviatuuri toe lisamine ligipääsetavuse parandamiseks
      this.button.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.toggleTheme();
        }
      });

      // Jälgib süsteemi režiimi muutusi (tume/hele režiim)
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => this.handleSystemThemeChange(e));
    },

    /**
     * Määrab lehe esialgse režiimi vastavalt:
     * 1. Kasutaja salvestatud eelistusele
     * 2. Süsteemi eelistusele, kui salvestatud eelistust pole
     */
    setInitialTheme() {
      const savedTheme = localStorage.getItem(this.STORAGE_KEY);
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      if (savedTheme) {
        document.documentElement.setAttribute("data-theme", savedTheme);
      } else if (systemPrefersDark) {
        document.documentElement.setAttribute("data-theme", "dark");
      }
    },

    /**
     * Vahetab režiimi tumeda ja heleda vahel.
     * Uuendab dokumendi data-theme atribuuti ja salvestab valiku localStorage'i.
     * Uuendab ka ARIA atribuute.
     */
    toggleTheme() {
      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";
      const newTheme = isDark ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem(this.STORAGE_KEY, newTheme);

      this.button.setAttribute("aria-checked", (!isDark).toString());
    },

    /**
     * Käsitleb süsteemi režiimi muutusi.
     * Muudab lehe režiimi ainult siis, kui kasutaja pole oma eelistust salvestanud.
     *
     * @param {MediaQueryListEvent} e - Süsteemi režiimi muutuse sündmus
     */
    handleSystemThemeChange(e) {
      if (!localStorage.getItem(this.STORAGE_KEY)) {
        const newTheme = e.matches ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
      }
    },
  };

  /**
   * Navigatsiooni funktsionaalsus
   * Lisab klikisündmuste kuularid kõigile navigatsiooni linkidele.
   */
  const links = document.querySelectorAll("nav ul.navbar li a");
  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetPage = event.target.getAttribute("href");
      window.location.href = targetPage;
    });
  });

  // Käivitab teemakontrolleri
  ThemeController.init();
});
