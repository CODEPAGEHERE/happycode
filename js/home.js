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
    .catch(() => {});
});

/* -----------------------------
   CONTENTFUL LOAD
----------------------------- */

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

    // headline
    const headlineEl = document.getElementById("hc-home-title");
    if (headlineEl) headlineEl.textContent = headliner || "";

    // logo
    const logoEl = document.getElementById("hc-home-logo");
    if (logoEl) {
      const isNight = document.body.classList.contains("night-mode");
      const src = isNight ? nitelogo : daylogo;
      if (typeof src === "string") logoEl.src = src;
    }

    // typing rotation
    const lines = resolveTypingLines(typing);
    startTypewriterRotation(lines);
  } catch (_) {}
}

/* -----------------------------
   TYPING JSON RESOLVER
----------------------------- */

function resolveTypingLines(typing) {
  if (!typing) return [];

  if (Array.isArray(typing)) return typing;

  if (typeof typing === "object") {
    if (Array.isArray(typing.lines)) return typing.lines;
    if (Array.is
