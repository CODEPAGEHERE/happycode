// /js/contentful.js
document.addEventListener("DOMContentLoaded", () => {
  if (!window.contentful) {
    console.error("Contentful SDK not loaded.");
    return;
  }

  // Init once globally
  window.hcContentful = contentful.createClient({
    space: "6nds636k8ebm",
    accessToken: "Lbv0LdPDTZlrRCAU2z2Yu6QiKpn3ilSitBXlMtjx22k",
  });

  console.log("✅ Contentful client ready");
});
