// /js/contentful.js
document.addEventListener("DOMContentLoaded", () => {
  if (!window.contentful) {
    console.error("❌ Contentful SDK not loaded.");
    return;
  }

  if (!window.HC_CONFIG) {
    console.error("❌ HC_CONFIG missing. Did you load /js/config.js ?");
    return;
  }

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
