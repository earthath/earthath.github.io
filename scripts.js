// scripts.js

// Typing Effect
document.addEventListener('DOMContentLoaded', () => {
    const nameElement = document.getElementById('typing-name');
    const nameText = nameElement.textContent;
    nameElement.textContent = '';
    let i = 0;

    function typeWriter() {
        if (i < nameText.length) {
            nameElement.textContent += nameText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    }

    typeWriter();
});

// Parallax Effect
window.addEventListener('scroll', () => {
    const star1 = document.getElementById('star1');
    const star2 = document.getElementById('star2');

    let offset = window.pageYOffset;

    star1.style.top = 20 + offset * 0.05 + '%';
    star2.style.top = 60 + offset * 0.1 + '%';
});

// Smooth Scrolling
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        gsap.to(window, {duration: 2, scrollTo: {y: this.getAttribute('href'), offsetY: 50}});
    });
});
