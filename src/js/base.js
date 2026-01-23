document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const loader = document.getElementById("hc-loader");

  /* -------------------------
     THEME SETUP
  ------------------------- */

  const getAutoTheme = () => {
    const hour = new Date().getHours();
    return hour >= 6 && hour < 18 ? "day" : "night";
  };

  const savedTheme = localStorage.getItem("hc-theme") || getAutoTheme();
  applyTheme(savedTheme);

  function applyTheme(theme) {
    body.classList.toggle("night-mode", theme === "night");
  }

  /* -------------------------
     LOADER LOGIC
  ------------------------- */

  window.addEventListener("load", () => {
    // Wait 3 seconds AFTER full load
    setTimeout(() => {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          loader.style.display = "none";
        }
      });
    }, 3000);
  });
});




/* -------------------------
   HEADER INJECTION
------------------------- */

fetch("/components/header.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("hc-header").innerHTML = html;
  })
  .catch(err => {
    console.error("Header load failed:", err);
  });
