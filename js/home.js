async function loadHomeFromContentful() {
  const client = window.hcContentful;

  console.log("🔎 hcContentful client:", client);

  if (!client) {
    console.error("❌ Contentful client not ready (hcContentful missing).");
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
      logoEl.src = isNight ? nightlogo : daylogo;
    }

    // Typing
    const typeEl = document.getElementById("hc-home-typewriter");
    if (typeEl) typeEl.textContent = resolveTypingText(typing);

  } catch (err) {
    console.error("❌ Contentful fetch failed:", err);
  }
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
