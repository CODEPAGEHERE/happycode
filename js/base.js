document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;

  /* -------------------------
     THEME SYSTEM
  ------------------------- */
  const getAutoTheme = () => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18 ? "day" : "night";
  };

  function applyTheme(theme) {
    body.classList.toggle("night-mode", theme === "night");
    localStorage.setItem("hc-theme", theme);

    const toggle = document.getElementById("hc-theme-toggle");
    if (toggle) toggle.checked = theme === "night";
  }

  const savedTheme = localStorage.getItem("hc-theme") || getAutoTheme();
  applyTheme(savedTheme);

  // Listen for toggle even if injected later
  document.addEventListener("change", (e) => {
    if (e.target && e.target.id === "hc-theme-toggle") {
      applyTheme(e.target.checked ? "night" : "day");
    }
  });
});
