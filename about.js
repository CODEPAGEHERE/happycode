$(document).ready(function () {
  let aboutData = {};

  $.getJSON("about.json", function (data) {
    aboutData = data;

    $(".contact-line").on("click", function () {
      const key = $(this).data("key");
      const section = aboutData[key];

      if (section) {
        $("#aboutContent").fadeOut(200, function () {
          $(this).html(`
            <h2><i class="bi ${section.icon}"></i> ${section.title}</h2>
            <p>${section.content}</p>
          `).fadeIn(200);
        });
      }
    });
  });
});
