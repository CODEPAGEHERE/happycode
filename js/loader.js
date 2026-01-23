// loader.js
document.addEventListener("DOMContentLoaded", () => {
  const hcLoader = document.getElementById("hc-loader");

  // Inject loader HTML
  fetch("/components/loader.html")
    .then(res => res.text())
    .then(html => {
      hcLoader.innerHTML = html;

      // Now the loader overlay exists
      const loaderOverlay = hcLoader.querySelector(".hc-loader-overlay");
      if (!loaderOverlay) return;

      // Wait for the full page load
      window.addEventListener("load", () => {
        setTimeout(() => {
          gsap.to(loaderOverlay, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => loaderOverlay.remove(),
          });
        }, 3000); // Optional delay
      });
    })
    .catch(err => console.error("Loader injection failed:", err));
});
