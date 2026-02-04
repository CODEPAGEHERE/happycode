// /js/home.js
document.addEventListener("DOMContentLoaded", () => {
  const mount = document.getElementById("hc-page");
  if (!mount) {
    console.warn("⚠️ #hc-page not found, home.js will not mount.");
    return;
  }

  console.log("🏠 Home page mounting...");

  fetch("/components/home.html")
    .then((res) => {
      console.log("📦 home.html fetch status:", res.status);
      if (!res.ok) throw new Error("home.html not found");
      return res.text();
    })
    .then((html) => {
      mount.innerHTML = html;
      console.log("✅ Home component mounted");

      initHomeAnimation();
      loadHomeFromContentful();
    })
    .catch((err) => console.error("❌ Home load failed:", err));
});

async function loadHomeFromContentful() {
  const client = window.hcContentful;

  console.log("🔎 hcContentful client:", client);

  if (!client) {
    console.error("❌ Contentful client not ready (hcContentful missing).");
    console.error("➡️ Check script order: contentful sdk -> config.js -> contentful.js -> home.js");
    return;
  }

  try {
    console.log("⏳ Fetching entryForHomepage...");

    const res = await client.getEntries({
      content_type: "entryForHomepage",
      limit: 1,
    });

    console.log("📦 Contentful raw response:", res);
    console.log("📦 items length:", res?.items?.length);

    const entry = res?.items?.[0];
    if (!entry) {
      console.warn("⚠️ No entry found for entryForHomepage.");
      return;
    }

    console.log("✅ Found entry:", entry);
    console.log("🧾 Entry fields:", entry.fields);

    const { headline, daylogo, nightlogo, typing } = entry.fields;

    console.log("headline:", headline);
    console.log("daylogo:", daylogo);
    console.log("nightlogo:", nightlogo);
    console.log("typing:", typing);

    // Headline
    const headlineEl = document.getElementById("hc-home-title");
    if (headlineEl) headlineEl.textContent = headline || "";

    // Theme-based logo
    const logoEl = document.getElementById("hc-home-logo");
    if (logoEl) {
      const isNight = document.body.classList.contains("night-mode");
      const selectedLogo = isNight ? nightlogo : daylogo;

      // important: avoid [object Object]
      if (typeof selectedLogo === "string") {
        logoEl.src = selectedLogo;
      } else {
        console.warn("⚠️ Logo field is not string:", selectedLogo);
      }
    }

    // Typing
    const typeEl = document.getElementById("hc-home-typewriter");
    if (typeEl) typeEl.textContent = resolveTypingText(typing);

  } catch (err) {
    console.error("❌ Contentful fetch failed:", err);
  }
}

function resolveTypingText(typing) {
  if (!typing) return "";

  // if stored as plain text
  if (typeof typing === "string") return typing;

  // if stored as JSON object
  if (typeof typing === "object") {
    if (typing.text) return typing.text;
    if (Array.isArray(typing.lines) && typing.lines.length) return typing.lines[0];
    if (Array.isArray(typing.messages) && typing.messages.length) return typing.messages[0];
  }

  return "";
}

function initHomeAnimation() {
  if (!window.gsap) {
    console.warn("⚠️ GSAP not loaded.");
    return;
  }

  gsap.to(".cloud-container", {
    y: 35,
    repeat: -1,
    yoyo: true,
    duration: 3.5,
    ease: "sine.inOut",
  });

  console.log("☁️ Cloud animation running");
}
