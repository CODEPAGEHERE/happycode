$(document).ready(function () {
  const fallbackImage = "fallback.jpg"; // Your fallback image in images/

  $.getJSON("projects.json", function (data) {
    $(".contact-line").on("click", function () {
      const key = $(this).data("key");
      const projects = data[key];

      if (projects && projects.length > 0) {
        let contentHtml = `<h2><i class="bi bi-folder2-open"></i> ${$(this).text()}</h2><div class="row">`;

        projects.forEach(project => {
          let imagesHtml = "";
          (project.images || []).forEach((img, index) => {
            imagesHtml += `
              <img 
                src="images/${img}" 
                alt="${project.title} image ${index + 1}" 
                onerror="this.onerror=null; this.src='images/${fallbackImage}'" 
                class="img-thumbnail m-1" 
                style="width: 100px; height: auto; cursor: pointer;"
              >
            `;
          });

          contentHtml += `
            <div class="col-md-6 mb-4">
              <div class="card h-100">
                <div class="p-2 d-flex flex-wrap justify-content-center">
                  ${imagesHtml}
                </div>
                <div class="card-body">
                  <h5 class="card-title">${project.title}</h5>
                  <p class="card-text">${project.description}</p>
                  <a href="${project.link}" class="btn btn-primary" target="_blank">View Project</a>
                </div>
              </div>
            </div>
          `;
        });

        contentHtml += `</div>`;
        $("#aboutContent").fadeOut(200, function () {
          $(this).html(contentHtml).fadeIn(200);
        });
      } else {
        $("#aboutContent").fadeOut(200, function () {
          $(this).html(`<h5>No projects available in this category yet.</h5>`).fadeIn(200);
        });
      }
    });
  });
});
