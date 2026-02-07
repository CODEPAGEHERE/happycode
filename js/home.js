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

    // typing animation
    const lines = resolveTypingLines(typing);
    if (lines.length) startTypewriterRotation(lines);
  } catch (_) {}
}

/* -----------------------------
   TYPING JSON RESOLVER
----------------------------- */

function resolveTypingLines(typing) {
  if (!typing) return [];

  if (Array.isArray(typing)) return typing.filter(Boolean);

  if (typeof typing === "string") return [typing];

  if (typeof typing === "object") {
    if (Array.isArray(typing.lines))
      return typing.lines.filter(Boolean);

    if (Array.isArray(typing.messages))
      return typing.messages.filter(Boolean);

    if (typing.text) return [typing.text];
  }

  return [];
}

/* -----------------------------
   GSAP TYPEWRITER ROTATION
----------------------------- */

function startTypewriterRotation(lines) {
  const el = document.getElementById("hc-home-typewriter");
  if (!el || !window.gsap || !lines.length) return;

  let index = 0;

  function typeLine(text, onComplete) {
    el.textContent = "";

    gsap.to(
      { i: 0 },
      {
        i: text.length,
        duration: 1.6,
        ease: "none",
        onUpdate() {
          el.textContent = text.slice(0, Math.floor(this.targets()[0].i));
        },
        onComplete,
      }
    );
  }

  function eraseLine(onComplete) {
    const text = el.textContent;

    gsap.to(
      { i: text.length },
      {
        i: 0,
        duration: 0.9,
        ease: "none",
        delay: 1.2,
        onUpdate() {
          el.textContent = text.slice(0, Math.floor(this.targets()[0].i));
        },
        onComplete,
      }
    );
  }

  function loop() {
    const line = lines[index];

    typeLine(line, () => {
      eraseLine(() => {
        index = (index + 1) % lines.length;
        loop();
      });
    });
  }

  loop();
}

/* -----------------------------
   CLOUD FLOAT ANIMATION
----------------------------- */

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
