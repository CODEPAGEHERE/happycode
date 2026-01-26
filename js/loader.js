// js/loader.js
document.addEventListener("DOMContentLoaded", () => {
  const mount = document.getElementById("hc-loader");

  fetch("/components/loader.html")
    .then(res => res.text())
    .then(html => {
      mount.innerHTML = html;

      const overlay = mount.querySelector(".hc-loader-overlay");
      if (!overlay) return;

      const hideLoader = () => {
        setTimeout(() => {
          gsap.to(overlay, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => overlay.remove()
          });
        }, 3000);
      };

      // IMPORTANT PART 👇
      if (document.readyState === "complete") {
        // page already loaded → run immediately
        hideLoader();
      } else {
        // page still loading → wait
        window.addEventListener("load", hideLoader, { once: true });
      }
    })
    .catch(err => console.error("Loader injection failed:", err));
});
