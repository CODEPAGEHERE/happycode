$(document).ready(function () {
  const fallbackImage = "img/default.png"; // Your fallback image path

  $.getJSON("projects.json", function (data) {
    $(".contact-line").on("click", function () {
      const key = $(this).data("key");
      const category = data.categories.find(cat => cat.key === key);

      if (category && category.projects.length > 0) {
        let contentHtml = `<h2><i class="bi ${category.icon}"></i> ${category.name}</h2><div class="row">`;

        category.projects.forEach(project => {
          const carouselId = `carousel-${Math.random().toString(36).substring(2, 9)}`;

          let imagesHtml = `
            <div id="${carouselId}" class="carousel slide mb-3" data-bs-ride="carousel">
              <div class="carousel-inner">
          `;

          (project.images || []).forEach((img, index) => {
            imagesHtml += `
              <div class="carousel-item ${index === 0 ? 'active' : ''}">
                <img 
                  src="images/${img}" 
                  alt="${project.title} image ${index + 1}" 
                  onerror="this.onerror=null; this.src='${fallbackImage}'"
                  class="d-block w-100"
                  style="height: 250px; object-fit: cover; border-radius: 8px;"
                >
              </div>
            `;
          });

          imagesHtml += `
              </div>
              <button class="carousel-control-prev" type="button" data-bs-target="#${carouselId}" data-bs-slide="prev">
                <span class="carousel-control-prev-icon"></span>
              </button>
              <button class="carousel-control-next" type="button" data-bs-target="#${carouselId}" data-bs-slide="next">
                <span class="carousel-control-next-icon"></span>
              </button>
            </div>
          `;

          contentHtml += `
            <div class="col-md-6 mb-4">
              <div class="card h-100">
                <div class="p-2">
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
