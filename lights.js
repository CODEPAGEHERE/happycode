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







//transfer of theme through pages 

// Day/Night Theme Syncing (already added in your code)
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
} else {
    document.body.classList.remove('dark-mode');
}

// Toggle Theme when clicked (For example, with a button or a switch)
const themeToggleButton = document.querySelector('#theme-toggle');
themeToggleButton.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    if (isDark) {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    }
});
