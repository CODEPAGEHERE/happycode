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

    buildGhostHeadline(headliner || "");

    const logoEl = document.getElementById("hc-home-logo");
    if (logoEl) {
      const isNight = document.body.classList.contains("night-mode");
      logoEl.src = isNight ? nitelogo : daylogo;
    }

    const typeEl = document.getElementById("hc-home-typewriter");
    if (typeEl) typeEl.textContent = resolveTypingText(typing);

  } catch (err) {
    console.error("Contentful fetch failed:", err);
  }
}

function buildGhostHeadline(text) {
  const el = document.getElementById("hc-home-title");
  if (!el) return;

  el.innerHTML = "";

  [...text].forEach((char) => {
    const span = document.createElement("span");

    if (char === " ") {
      span.className = "space";
      span.innerHTML = "&nbsp;";
    } else {
      span.className = "letter";
      span.textContent = char;
    }

    el.appendChild(span);
  });
}

function resolveTypingText(typing) {
  if (!typing) return "";
  if (typeof typing === "string") return typing;
  if (Array.isArray(typing)) return typing[0] || "";
  if (typing.lines) return typing.lines[0] || "";
  if (typing.messages) return typing.messages[0] || "";
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
