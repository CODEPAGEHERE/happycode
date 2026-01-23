// Inject header
fetch("/components/header.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("hc-header").innerHTML = html;

    // Setup theme toggle
    const toggle = document.getElementById("hc-theme-toggle");
    if (!toggle) return;

    const body = document.body;

    const getAutoTheme = () => {
      const hour = new Date().getHours();
      return hour >= 6 && hour < 18 ? "day" : "night";
    };

    const savedTheme = localStorage.getItem("hc-theme") || getAutoTheme();
    body.classList.toggle("night-mode", savedTheme === "night");
    toggle.checked = savedTheme === "night";

    toggle.addEventListener("change", () => {
      body.classList.toggle("night-mode", toggle.checked);
      localStorage.setItem("hc-theme", toggle.checked ? "night" : "day");
    });
  })
  .catch(err => console.error("Header injection failed:", err));
