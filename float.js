document.addEventListener("DOMContentLoaded", function () {
    gsap.to(".big-floating-cloud", {
        y: "+=50",  // Moves slightly up (3px) and down (-3px)
        repeat: -1,  // Infinite animation
        yoyo: true,  // Moves back smoothly
        duration: 3,  // Slow floating (5 seconds per cycle)
        ease: "sine.inOut"  // Smooth and natural motion
    });
});
