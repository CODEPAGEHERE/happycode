// js/loader.js
document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("hc-loader");
  let released = false;

  const release = () => {
    if (released) return;
    released = true;

    document.body.classList.add("hc-ready");

    if (!loader) return;

    if (window.gsap) {
      gsap.to(loader, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => loader.remove()
      });
    } else {
      loader.remove();
    }
  };

  /* -------------------------
     FAILSAFE (HARD STOP)
  ------------------------- */
  setTimeout(release, 10000);

  /* -------------------------
     NORMAL EXIT
  ------------------------- */
  if (document.readyState === "complete") {
    setTimeout(release, 3000);
  } else {
    window.addEventListener(
      "load",
      () => setTimeout(release, 3000),
      { once: true }
    );
  }
});
