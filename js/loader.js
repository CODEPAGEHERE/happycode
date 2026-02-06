document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("hc-loader");
  if (!loader) return;

  // 🔒 prevent scrollbar during loader
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  let released = false;

  const releaseLoader = () => {
    if (released) return;
    released = true;

    // 🔓 restore scrolling
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";

    document.body.classList.add("hc-ready");

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

  const FAILSAFE_MS = 15000;
  const failsafe = setTimeout(releaseLoader, FAILSAFE_MS);

  window.addEventListener(
    "load",
    () => {
      setTimeout(() => {
        clearTimeout(failsafe);
        releaseLoader();
      }, 5000);
    },
    { once: true }
  );
});
