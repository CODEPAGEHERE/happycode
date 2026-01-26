// js/loader.js
document.addEventListener("DOMContentLoaded", () => {
  const mount = document.getElementById("hc-loader");
  if (!mount) return;

  let loaderRemoved = false;

  const removeLoader = (overlay) => {
    if (loaderRemoved || !overlay) return;
    loaderRemoved = true;

    if (window.gsap) {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => overlay.remove()
      });
    } else {
      overlay.remove(); // GSAP failed → hard remove
    }
  };

  fetch("/components/loader.html")
    .then(res => res.text())
    .then(html => {
      mount.innerHTML = html;

      const overlay = mount.querySelector(".hc-loader-overlay");
      if (!overlay) return;

      /* -------------------------
         FAILSAFE (ABSOLUTE MAX)
      ------------------------- */
      const failsafeTimer = setTimeout(() => {
        console.warn("Loader failsafe triggered");
        removeLoader(overlay);
      }, 12000);

      /* -------------------------
         NORMAL EXIT
      ------------------------- */
      const normalExit = () => {
        setTimeout(() => {
          clearTimeout(failsafeTimer);
          removeLoader(overlay);
        }, 3000);
      };

      if (document.readyState === "complete") {
        normalExit();
      } else {
        window.addEventListener("load", normalExit, { once: true });
      }
    })
    .catch(err => {
      console.error("Loader injection failed:", err);
      mount.remove(); // nothing to show → unblock UI
    });
});
