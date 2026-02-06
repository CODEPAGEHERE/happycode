(async function loadConfig() {
  try {
    const res = await fetch("/api/config");
    const cfg = await res.json();

    window.HC_CONFIG = cfg;

    console.log("✅ Config loaded:", cfg);

    // signal readiness
    window.dispatchEvent(new Event("hc:config-ready"));
  } catch (err) {
    console.error("❌ Config load failed:", err);
  }
})();
