$(document).ready(function () {
    const toggleSwitch = $("#themeToggle"); // jQuery selector
    const body = $("body");

    // Function to determine if it's day or night based on time
    function getCurrentTheme() {
        const hour = new Date().getHours();
        return (hour >= 6 && hour < 18) ? "day" : "night"; // Day: 6 AM - 6 PM, Night: 6 PM - 6 AM
    }

    // Check for saved theme preference
    let savedTheme = localStorage.getItem("theme");

    if (!savedTheme) {
        savedTheme = getCurrentTheme(); // If no preference, use time-based theme
        localStorage.setItem("theme", savedTheme);
    }

    // Apply the saved or time-based theme
    if (savedTheme === "night") {
        body.addClass("night-mode");
        toggleSwitch.prop("checked", true); // Ensure the switch is checked
    }

    // Theme Toggle Function (Manual Override)
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
