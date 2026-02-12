document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement; // Use <html> for consistency

  /* -------------------------
     THEME SYSTEM
  ------------------------- */
  const getAutoTheme = () => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18 ? "day" : "night";
  };

  function applyTheme(theme) {
    root.classList.toggle("night-mode", theme === "night"); // consistent with HTML
    localStorage.setItem("hc-theme", theme);

    const toggle = document.getElementById("hc-theme-toggle");
    if (toggle) toggle.checked = theme === "night";

    document.dispatchEvent(new CustomEvent("hc:theme-change"));
  }

  const savedTheme = localStorage.getItem("hc-theme") || getAutoTheme();
  applyTheme(savedTheme);

  // Listen for toggle events
  document.addEventListener("change", (e) => {
    if (e.target && e.target.id === "hc-theme-toggle") {
      applyTheme(e.target.checked ? "night" : "day");
    }
  });
});
