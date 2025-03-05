$(document).ready(function () {
    const toggleSwitch = $("#themeToggle"); // jQuery selector
    const body = $("body");

    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "night") {
        body.addClass("night-mode");
        toggleSwitch.prop("checked", true); // Ensure the switch is checked
    }

    // Theme Toggle Function
    toggleSwitch.change(function () {
        if (this.checked) {
            body.addClass("night-mode");
            localStorage.setItem("theme", "night");
        } else {
            body.removeClass("night-mode");
            localStorage.setItem("theme", "day");
        }
    });
});
