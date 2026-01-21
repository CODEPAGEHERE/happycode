document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggle = document.getElementById("hc-theme-toggle");

  if (!toggle) return;

  // Decide initial theme
  const getAutoTheme = () => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18 ? "day" : "night";
  };

  const savedTheme = localStorage.getItem("hc-theme") || getAutoTheme();

  applyTheme(savedTheme);

  // Toggle handler
  toggle.addEventListener("change", () => {
    const theme = toggle.checked ? "night" : "day";
    localStorage.setItem("hc-theme", theme);
    applyTheme(theme);
  });

  function applyTheme(theme) {
    if (theme === "night") {
      body.classList.add("night-mode");
      toggle.checked = true;
    } else {
      body.classList.remove("night-mode");
      toggle.checked = false;
    }
  }
});
