// /js/contentful.js
document.addEventListener("DOMContentLoaded", () => {
  if (!window.contentful) {
    console.error("Contentful SDK not loaded.");
    return;
  }

  // Init once globally
  window.hcContentful = contentful.createClient({
    space: "YOUR_SPACE_ID",
    accessToken: "YOUR_DELIVERY_API_KEY",
  });

  console.log("✅ Contentful client ready");
});
