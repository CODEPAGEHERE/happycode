document.addEventListener("DOMContentLoaded", function () {
    gsap.to(".big-floating-cloud", {
        y: -20, /* Moves cloud up */
        repeat: -1, /* Infinite animation */
        yoyo: true, /* Moves back to original position */
        duration: 3, /* Speed of animation */
        ease: "power1.inOut" /* Smooth effect */
    });
});
