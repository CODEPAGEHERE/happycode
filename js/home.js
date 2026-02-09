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

    renderGhostHeadline(headliner || "");

    const logoEl = document.getElementById("hc-home-logo");
    if (logoEl) {
      const isNight = document.body.classList.contains("night-mode");
      const src = isNight ? nitelogo : daylogo;
      if (typeof src === "string") logoEl.src = src;
    }

    const lines = resolveTypingLines(typing);
    if (lines.length) startTypewriterRotation(lines);

  } catch (_) {}
}

/* -----------------------------
   GHOST HEADLINE RENDER
----------------------------- */

function renderGhostHeadline(text) {
  const el = document.getElementById("hc-home-title");
  if (!el) return;

  el.innerHTML = "";

  text.split("").forEach((char) => {
    const span = document.createElement("span");

    if (char === " ") {
      span.className = "letter space";
      span.textContent = "";
    } else {
      span.className = "letter";
      span.textContent = char;
    }

    el.appendChild(span);
  });
}

/* -----------------------------
   TYPING JSON RESOLVER
----------------------------- */

function resolveTypingLines(typing) {
  if (!typing) return [];

  if (Array.isArray(typing)) return typing.filter(Boolean);

  if (typeof typing === "string") return [typing];

  if (typeof typing === "object") {
    if (Array.isArray(typing.lines)) return typing.lines.filter(Boolean);
    if (Array.isArray(typing.messages)) return typing.messages.filter(Boolean);
    if (typing.text) return [typing.text];
  }

  return [];
}

/* -----------------------------
   GSAP TYPEWRITER
----------------------------- */

function startTypewriterRotation(lines) {
  const el = document.getElementById("hc-home-typewriter");
  if (!el || !window.gsap) return;

  let index = 0;

  function typeLine(text, done) {
    el.textContent = "";

    gsap.to({ i: 0 }, {
      i: text.length,
      duration: 7.6,
      ease: "none",
      onUpdate() {
        el.textContent = text.slice(0, Math.floor(this.targets()[0].i));
      },
      onComplete: done
    });
  }

  function eraseLine(done) {
    const text = el.textContent;

    gsap.to({ i: text.length }, {
      i: 0,
      duration: 2.9,
      delay: 1.2,
      ease: "none",
      onUpdate() {
        el.textContent = text.slice(0, Math.floor(this.targets()[0].i));
      },
      onComplete: done
    });
  }

  function loop() {
    typeLine(lines[index], () => {
      eraseLine(() => {
        index = (index + 1) % lines.length;
        loop();
      });
    });
  }

  loop();
}

/* -----------------------------
   CLOUD FLOAT
----------------------------- */

function initHomeAnimation() {
  if (!window.gsap) return;

  gsap.to(".cloud-float", {
    y: 35,
    repeat: -1,
    yoyo: true,
    duration: 3.5,
    ease: "sine.inOut",
  });
}
