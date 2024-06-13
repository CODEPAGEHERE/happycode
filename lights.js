$(document).ready(function() {
  // Initially hide both themes
  $('#happyday').hide();
  $('#happynight').hide();

  // Get the current hour
  var currentHour = new Date().getHours();

  // Set the initial theme based on the current hour
  if (currentHour >= 6 && currentHour < 18) {
      // Daytime
      $('#happyday').show();
  } else {
      // Nighttime
      $('#happynight').show();
  }

  // Function to toggle between day and night themes
  $('.themetogg').click(function() {
      $('#happyday').toggle();
      $('#happynight').toggle();
  });
});
