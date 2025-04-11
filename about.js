$(document).ready(function () {
  let aboutData = {};

  // Load JSON file
  $.getJSON("about.json", function (data) {
    aboutData = data;
  });

  // Handle click events
  $(".contact-line").click(function () {
    const key = $(this).text().trim().toLowerCase().replace(/ /g, "");
    const section = aboutData[key];
    if (section) {
      $("#aboutContent").html(`
        <h2><i class="bi ${section.icon}"></i> ${section.title}</h2>
        <p>${section.content}</p>
      `);
    }
  });
});
