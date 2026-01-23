document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const loader = document.getElementById("hc-loader");

  /* -------------------------
     THEME SYSTEM
  ------------------------- */
  const toggle = document.getElementById("hc-theme-toggle");

  const getAutoTheme = () => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18 ? "day" : "night";
  };

  const savedTheme = localStorage.getItem("hc-theme") || getAutoTheme();
  applyTheme(savedTheme);

  function applyTheme(theme) {
    body.classList.toggle("night-mode", theme === "night");
    localStorage.setItem("hc-theme", theme);
    if (toggle) toggle.checked = theme === "night";
  }

  if (toggle) {
    toggle.addEventListener("change", () => {
      applyTheme(toggle.checked ? "night" : "day");
    });
  }

}); // <-- THIS WAS MISSING
