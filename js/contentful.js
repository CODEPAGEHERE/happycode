async function waitForConfig(timeout = 3000) {
  if (window.HC_CONFIG) return true;

  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      console.error("HC_CONFIG not available after timeout.");
      resolve(false);
    }, timeout);

    window.addEventListener(
      "hc:config-ready",
      () => {
        clearTimeout(timer);
        resolve(true);
      },
      { once: true }
    );
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  if (!window.contentful) {
    console.error("❌ Contentful SDK missing.");
    return;
  }

  const ready = await waitForConfig();
  if (!ready) return;

  const { CONTENTFUL_SPACE_ID, CONTENTFUL_DELIVERY_TOKEN } = window.HC_CONFIG || {};

  if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_DELIVERY_TOKEN) {
    console.error("❌ Contentful credentials missing.");
    return;
  }

  // Initialize global Contentful client
  window.hcContentful = contentful.createClient({
    space: CONTENTFUL_SPACE_ID,
    accessToken: CONTENTFUL_DELIVERY_TOKEN,
  });

  // signal client ready
  window.dispatchEvent(new Event("hc:contentful-ready"));
});
