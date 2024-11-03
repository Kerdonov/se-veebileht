// main.js
document.addEventListener("DOMContentLoaded", function () {
  // Theme Controller
  const ThemeController = {
    STORAGE_KEY: "user-theme-preference",

    init() {
      this.button = document.getElementById("theme-toggle");

      if (this.button) {
        this.setupButtonA11y();
        this.addEventListeners();
        this.setInitialTheme();
      }
    },

    setupButtonA11y() {
      this.button.setAttribute("role", "switch");
      this.button.setAttribute("aria-label", "Toggle theme");
    },

    addEventListeners() {
      // Theme toggle click
      this.button.addEventListener("click", () => this.toggleTheme());

      // Keyboard support
      this.button.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          this.toggleTheme();
        }
      });

      // System theme changes
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => this.handleSystemThemeChange(e));
    },

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

    toggleTheme() {
      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";
      const newTheme = isDark ? "light" : "dark";

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem(this.STORAGE_KEY, newTheme);

      // Update aria attributes
      this.button.setAttribute("aria-checked", (!isDark).toString());
    },

    handleSystemThemeChange(e) {
      if (!localStorage.getItem(this.STORAGE_KEY)) {
        const newTheme = e.matches ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
      }
    },
  };

  // Navigation
  const links = document.querySelectorAll("nav ul.navbar li a");
  links.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetPage = event.target.getAttribute("href");
      window.location.href = targetPage;
    });
  });

  // Initialize Theme Controller
  ThemeController.init();
});
