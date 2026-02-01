document.addEventListener("DOMContentLoaded", () => {
  const mount = document.getElementById("hc-page");
  if (!mount) return;

  fetch("/components/home.html")
    .then((res) => res.text())
    .then((html) => {
      mount.innerHTML = html;
    })
    .catch((err) => console.error("Home load failed:", err));
});
