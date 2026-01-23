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

  /* -------------------------
     LOADER
  ------------------------- */

  window.addEventListener("load", () => {
    setTimeout(() => {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => loader.remove()
      });
    }, 3000);
  });

  /* -------------------------
     HEADER INJECTION
  ------------------------- */

  fetch("/components/header.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("hc-header").innerHTML = html;
    })
    .catch(err => console.error("Header load failed:", err));
});


// Inject loader
fetch("/components/loader.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("hc-loader").innerHTML = html;
  });
