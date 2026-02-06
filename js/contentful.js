// /js/contentful.js

async function waitForConfig(maxWaitMs = 2000) {
  const start = Date.now();

  while (!window.HC_CONFIG) {
    if (Date.now() - start > maxWaitMs) {
      console.error("❌ HC_CONFIG missing after waiting.");
      return false;
    }

    await new Promise(resolve => setTimeout(resolve, 50));
  }

  return true;
}

document.addEventListener("DOMContentLoaded", async () => {
  if (!window.contentful) {
    console.error("❌ Contentful SDK not loaded.");
    return;
  }

  const ready = await waitForConfig();

  if (!ready) return;

  const { CONTENTFUL_SPACE_ID, CONTENTFUL_DELIVERY_TOKEN } = window.HC_CONFIG;

  if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_DELIVERY_TOKEN) {
    console.error("❌ Missing Contentful credentials in HC_CONFIG.");
    return;
  }

  // Init once globally for the entire project
  window.hcContentful = contentful.createClient({
    space: CONTENTFUL_SPACE_ID,
    accessToken: CONTENTFUL_DELIVERY_TOKEN,
  });

  console.log("✅ Contentful client ready:", window.hcContentful);
});
