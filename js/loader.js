// Inject loader HTML
fetch("/components/loader.html")
  .then(res => res.text())
  .then(html => {
    document.getElementById("hc-loader").innerHTML = html;
  })
  .catch(err => console.error("Loader injection failed:", err));

// Wait for full page load + 3s delay
window.addEventListener("load", () => {
  const loaderOverlay = document.querySelector(".hc-loader-overlay");
  if (!loaderOverlay) return;

  setTimeout(() => {
    gsap.to(loaderOverlay, {
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      onComplete: () => loaderOverlay.remove()
    });
  }, 3000);
});
