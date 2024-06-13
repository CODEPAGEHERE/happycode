// typewriter.js
$(document).ready(function() {
    const texts = [
        "a Computer Enthusiast.",
        "a Computer Naturalist.",
        "a Developer",
        "an Information and Communication Scientist.",
        "a Lover of Science and Technology.",
        ""
    ];

    let textIndex = 0;
    let charIndex = 0;
    const speed = 200;
    const typewriterText = $('.typewriter-text');

    function typeWriter() {
        if (charIndex < texts[textIndex].length) {
            typewriterText.text(texts[textIndex].substring(0, charIndex + 1)); // Set the text directly
            charIndex++;
            setTimeout(typeWriter, speed);
        } else {
            setTimeout(eraseText, 1000); // Wait for 1 second before erasing text
        }
    }
    

    function eraseText() {
        if (charIndex > 0) {
            typewriterText.text(texts[textIndex].substring(0, charIndex - 1));
            charIndex--;
            setTimeout(eraseText, speed);
        } else {
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeWriter, 1000); // Wait for 0.5 second before typing next text
        }
    }

    setTimeout(typeWriter, 1000); // Start typing after 0.5 second
});
