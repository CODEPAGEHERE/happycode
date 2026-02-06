// /js/home.js
document.addEventListener("DOMContentLoaded", () => {
  const mount = document.getElementById("hc-page");
  if (!mount) return;

  fetch("/components/home.html")
    .then((res) => {
      if (!res.ok) throw new Error("home.html not found");
      return res.text();
    })
    .then((html) => {
      mount.innerHTML = html;

      initHomeAnimation();

      // wait for contentful client
      if (window.hcContentful) {
        loadHomeFromContentful();
      } else {
        window.addEventListener(
          "hc:contentful-ready",
          loadHomeFromContentful,
          { once: true }
        );
      }
    })
    .catch((err) => console.error("Home load failed:", err));
});

async function loadHomeFromContentful() {
  const client = window.hcContentful;
  if (!client) return;

  try {
    const res = await client.getEntries({
      content_type: "entryForHomepage",
      limit: 1,
    });

    const entry = res?.items?.[0];
    if (!entry) return;

    const { headliner, daylogo, nitelogo, typing } = entry.fields;

    // headline (FIXED name)
    const headlineEl = document.getElementById("hc-home-title");
    if (headlineEl) headlineEl.textContent = headliner || "";

    // logo (FIXED names)
    const logoEl = document.getElementById("hc-home-logo");
    if (logoEl) {
      const isNight = document.body.classList.contains("night-mode");
      const src = isNight ? nitelogo : daylogo;

      if (typeof src === "string") logoEl.src = src;
    }

    // typing
    const typeEl = document.getElementById("hc-home-typewriter");
    if (typeEl) typeEl.textContent = resolveTypingText(typing);
  } catch (err) {
    console.error("Contentful fetch failed:", err);
  }
}

function resolveTypingText(typing) {
  if (!typing) return "";

  if (typeof typing === "string") return typing;

  if (typeof typing === "object") {
    if (typing.text) return typing.text;
    if (Array.isArray(typing.lines)) return typing.lines[0] || "";
    if (Array.isArray(typing.messages)) return typing.messages[0] || "";
  }

  return "";
}

function initHomeAnimation() {
  if (!window.gsap) return;

  gsap.to(".cloud-container", {
    y: 35,
    repeat: -1,
    yoyo: true,
    duration: 3.5,
    ease: "sine.inOut",
  });
}
