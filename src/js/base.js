document.addEventListener("DOMContentLoaded", async () => {

  const loaderMount = document.getElementById("hc-loader");
  if (!loaderMount) return;

  try {
    // Inject loader component
    const res = await fetch("../components/loader.html");
    loaderMount.innerHTML = await res.text();

    // Animate loader out
    if (window.gsap) {
      gsap.to(".hc-loader", {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.4,
        onComplete: () => {
          loaderMount.innerHTML = "";
        }
      });
    }

  } catch (err) {
    console.error("Loader failed to load", err);
    loaderMount.innerHTML = "";
  }

});
