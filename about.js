$(document).ready(function () {
  let aboutData = {};

  $.getJSON("about.json", function (data) {
    aboutData = data;

    const fallbackImage = data.fallback_image || "images/logo.png";

    $(".contact-line").on("click", function () {
      const key = $(this).data("key");
      const section = aboutData[key];

      if (section && section.content) {
        const content = section.content;
        let html = `
          <h2><i class="bi ${section.icon}"></i> ${section.title}</h2>
        `;

        if (content.header) {
          html += `<h3>${content.header}</h3>`;
        }

        if (content.body) {
          html += `<p>${content.body}</p>`;
        }

        if (content.sub_header) {
          html += `<h4>${content.sub_header}</h4>`;
        }

        if (content.sub_body) {
          html += `<p>${content.sub_body.replace(/\n/g, "<br>")}</p>`;
        }

        // Optional image (fallback to logo)
        if (content.image || content.name) {
          html += `
            <div class="about-image my-3">
              <img src="${content.image || fallbackImage}" alt="${content.name || 'Image'}" class="img-fluid" style="max-height: 200px;">
              ${content.name ? `<p class="mt-2 font-weight-bold">${content.name}</p>` : ""}
            </div>
          `;
        }

        // Team members (if any)
        if (content.team_members) {
          html += `<div class="row justify-content-center team-row">`;
          content.team_members.forEach(member => {
            html += `
              <div class="col-md-3 col-sm-6 text-center mb-4">
                <img src="${member.image || fallbackImage}" class="img-fluid rounded-circle mb-2" alt="${member.name}" style="width: 100px; height: 100px; object-fit: cover;">
                <h5 class="mb-0">${member.name}</h5>
                <small>${member.role}</small>
              </div>
            `;
          });
          html += `</div>`;
        }

        // Partners (if any)
        if (content.partners) {
          html += `<div class="row justify-content-center partner-row mt-4">`;
          content.partners.forEach(partner => {
            html += `
              <div class="col-md-2 col-sm-4 text-center mb-3">
                <img src="${partner.logo || fallbackImage}" alt="${partner.name}" class="img-fluid mb-1" style="max-height: 60px;">
                <p class="small">${partner.name}</p>
              </div>
            `;
          });
          html += `</div>`;
        }

        $("#aboutContent").fadeOut(200, function () {
          $(this).html(html).fadeIn(200);
        });
      }
    });
  });
});
