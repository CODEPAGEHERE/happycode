document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("hc-loader");
  if (!loader) return;

  let released = false;

  const releaseLoader = () => {
    if (released) return;
    released = true;

    // Show page content
    document.body.classList.add("hc-ready");

    // Fade out loader
    if (window.gsap) {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => loader.remove()
      });
    } else {
      loader.style.transition = "opacity 0.8s ease";
      loader.style.opacity = "0";
      setTimeout(() => loader.remove(), 850);
    }
  };

  // -------------------------
  // FAILSAFE: max 15s
  // -------------------------
  const FAILSAFE_MS = 15000;
  const failsafe = setTimeout(releaseLoader, FAILSAFE_MS);

  // -------------------------
  // NORMAL EXIT: page fully loaded + 5s
  // -------------------------
  window.addEventListener(
    "load",
    () => {
      setTimeout(() => {
        clearTimeout(failsafe);
        releaseLoader();
      }, 5000); // 5 seconds after full load
    },
    { once: true }
  );
});
