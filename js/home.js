// /js/home.js
document.addEventListener("DOMContentLoaded", () => {
  const mount = document.getElementById("hc-page");
  if (!mount) return;

  fetch("/components/home.html")
    .then((res) => res.text())
    .then((html) => {
      mount.innerHTML = html;

      initHomeAnimation();
      loadHomeFromContentful();
    })
    .catch((err) => console.error("Home load failed:", err));
});

async function loadHomeFromContentful() {
  const client = window.hcContentful;
  if (!client) {
    console.error("❌ Contentful client not ready (hcContentful missing).");
    return;
  }

  try {
    const res = await client.getEntries({
      content_type: "entryForHomepage",
      limit: 1,
    });

    const entry = res?.items?.[0];
    if (!entry) {
      console.warn("⚠️ No entry found for entryForHomepage.");
      return;
    }

    const { headline, logo, typing } = entry.fields;

    // Headline (inside cloud bottom)
    const headlineEl = document.getElementById("hc-home-title");
    if (headlineEl && headline) headlineEl.textContent = headline;

    // Logo (ImageKit URL stored as TEXT)
    const logoEl = document.getElementById("hc-home-logo");
    if (logoEl && logo) logoEl.src = logo;

    // Typing field (JSON)
    // expected examples:
    // typing = { "text": "Hello, I'm Oluwaseyi!" }
    // OR typing = { "lines": ["Hello...", "Welcome..."] }
    const typeEl = document.getElementById("hc-home-typewriter");

    if (typeEl) {
      const typedText = resolveTypingText(typing);
      typeEl.textContent = typedText || "Welcome to Happycode!";
    }
  } catch (err) {
    console.error("❌ Contentful fetch failed:", err);
  }
}

function resolveTypingText(typing) {
  if (!typing) return "";

  // if typing is plain string (some people store json but still string)
  if (typeof typing === "string") return typing;

  // if typing is JSON
  if (typeof typing === "object") {
    if (typing.text) return typing.text;
    if (Array.isArray(typing.lines)) return typing.lines[0];
    if (Array.isArray(typing.messages)) return typing.messages[0];
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
