document.addEventListener("DOMContentLoaded", () => {
  const mount = document.getElementById("hc-page");
  if (!mount) return;

  fetch("/components/home.html")
    .then((res) => res.text())
    .then((html) => {
      mount.innerHTML = html;

      // Run animation AFTER component is injected
      if (window.gsap) {
        gsap.to(".big-floating-cloud", {
          y: 30,
          repeat: -1,
          yoyo: true,
          duration: 4.5,
          ease: "sine.inOut"
        });
      }
    })
    .catch((err) => console.error("Home load failed:", err));
});
