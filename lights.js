$(document).ready(function () {
    const toggleSwitch = $("#themeToggle");
    const body = $("body");
    const textElements = $(".nav-link, .typewriter-container, .animated-text, body");
    const dayCloud = $("#day-cloud");
    const nightCloud = $("#night-cloud");

    // Function to get the current theme based on time
    function getCurrentTheme() {
        const hour = new Date().getHours();
        return (hour >= 6 && hour < 18) ? "day" : "night";
    }

    // Function to apply theme
    function updateTheme(theme) {
        if (theme === "night") {
            body.addClass("night-mode");
            textElements.css("color", "gold");
            dayCloud.hide();
            nightCloud.show();
            toggleSwitch.prop("checked", true);
            console.log("🌙 Night mode activated.");
        } else {
            body.removeClass("night-mode");
            textElements.css("color", "cornflowerblue");
            dayCloud.show();
            nightCloud.hide();
            toggleSwitch.prop("checked", false);
            console.log("☀️ Day mode activated.");
        }
    }

    // Apply saved theme or time-based theme
    let savedTheme = localStorage.getItem("theme") || getCurrentTheme();
    updateTheme(savedTheme);

    // Toggle theme on switch click
    toggleSwitch.change(function () {
        let newTheme = this.checked ? "night" : "day";
        localStorage.setItem("theme", newTheme);
        updateTheme(newTheme);
    });

    console.log("✅ Theme Toggle Fully Functional!");
});
