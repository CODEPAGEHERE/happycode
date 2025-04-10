document.addEventListener("DOMContentLoaded", function () {
    gsap.to(".big-floating-cloud", {
        y: "+=50",  // Moves slightly up (3px) and down (-3px)
        repeat: -1,  // Infinite animation
        yoyo: true,  // Moves back smoothly
        duration: 3,  // Slow floating (5 seconds per cycle)
        ease: "sine.inOut"  // Smooth and natural motion
    });
});








// Floating Cloud Animation for Clouds 1-4
const cloudSettings = [
    { selector: '.cloud1', size: 250, top:'1%', duration: 50, speed: 'fast' },
    { selector: '.cloud2', size: 200, top: '30%', duration: 80, speed: 'slow' },
    { selector: '.cloud3', size: 120, top: '60%', duration: 60, speed: 'medium' },
    { selector: '.cloud4', size: 150, top: '65%', duration: 75, speed: 'medium' }
];

cloudSettings.forEach(({ selector, size, top, duration, speed }) => {
    const cloud = document.querySelector(selector);
    if (cloud) {
        cloud.style.width = `${size}px`;
        cloud.style.position = 'absolute';
        cloud.style.top = top;
        gsap.set(cloud, { x: '-200px' });  // Set initial position for clouds
        gsap.to(cloud, {
            x: '120vw',  // Move horizontally from left to right
            duration,
            repeat: -1,  // Infinite loop
            yoyo: true,  // Reverse the animation
            ease: speed === 'fast' ? 'power2.out' : speed === 'slow' ? 'power2.in' : 'linear',
        });
    }
});

// Separate animation for Cloud 5 (fixed in bottom-right, up/down motion)
const cloud5 = document.querySelector('.cloud5');
if (cloud5) {
    cloud5.style.position = 'absolute';
    cloud5.style.bottom = '0';  // Fix it to the bottom-right corner
    cloud5.style.right = '0';   // Position at the far-right

    // Animation ONLY for up/down movement (no left/right motion)
    gsap.to(cloud5, {
        y: '+=10',   // Slight up/down movement
        duration: 2,
        repeat: -1,  // Infinite loop
        yoyo: true,  // Reverse the animation
        ease: 'ease-in-out',
    });
}

