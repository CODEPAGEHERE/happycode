// /js/home.js
document.addEventListener("DOMContentLoaded", () => {
  const mount = document.getElementById("hc-page");
  if (!mount) {
    console.warn("⚠️ #hc-page not found.");
    return;
  }

  fetch("/components/home.html")
    .then((res) => {
      if (!res.ok) throw new Error("home.html not found");
      return res.text();
    })
    .then((html) => {
      mount.innerHTML = html;

      initHomeAnimation();
      loadHomeFromContentful();
    })
    .catch((err) => console.error("❌ Home load failed:", err));
});

async function loadHomeFromContentful() {
  const client = window.hcContentful;

  if (!client) {
    console.error("❌ Contentful client not ready.");
    return;
  }

  try {
    const res = await client.getEntries({
      content_type: "entryForHomepage",
      limit: 1,
    });

    const entry = res?.items?.[0];
    if (!entry?.fields) {
      console.warn("⚠️ No homepage entry found.");
      return;
    }

    // Alias Contentful field names → internal names
    const {
      headliner: headline,
      daylogo,
      nitelogo: nightlogo,
      typing,
    } = entry.fields;

    // Headline
    const headlineEl = document.getElementById("hc-home-title");
    if (headlineEl && typeof headline === "string") {
      headlineEl.textContent = headline;
    }

    // Theme logo
    const logoEl = document.getElementById("hc-home-logo");
    if (logoEl) {
      const isNight = document.body.classList.contains("night-mode");
      const selectedLogo = isNight ? nightlogo : daylogo;

      if (typeof selectedLogo === "string") {
        logoEl.src = selectedLogo;
      } else {
        console.warn("⚠️ Invalid logo value:", selectedLogo);
      }
    }

    // Typing text
    const typeEl = document.getElementById("hc-home-typewriter");
    if (typeEl) {
      typeEl.textContent = resolveTypingText(typing);
    }
  } catch (err) {
    console.error("❌ Contentful fetch failed:", err);
  }
}

function resolveTypingText(typing) {
  if (!typing) return "";

  if (typeof typing === "string") return typing;

  if (typeof typing === "object") {
    if (typing.text) return typing.text;
    if (Array.isArray(typing.lines) && typing.lines.length) return typing.lines[0];
    if (Array.isArray(typing.messages) && typing.messages.length)
      return typing.messages[0];
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
