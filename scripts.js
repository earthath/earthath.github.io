// Typing Effect
document.addEventListener('DOMContentLoaded', () => {
    const nameElement = document.getElementById('typing-name');
    const titleElement = document.getElementById('typing-title');
    const nameText = nameElement.innerHTML;
    const titleText = titleElement.innerHTML;
    nameElement.innerHTML = '';
    titleElement.innerHTML = '';
    let i = 0, j = 0;

    function typeWriter1() {
        if (i < nameText.length) {
            nameElement.innerHTML += nameText.charAt(i);
            i++;
            setTimeout(typeWriter1, 100);
        }
    }

    function typeWriter2() {
        if (j < titleText.length) {
            titleElement.innerHTML += titleText.charAt(j);
            j++;
            setTimeout(typeWriter2, 100);
        }
    }

    // Start both typewriter functions simultaneously
    typeWriter1();
    typeWriter2();
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

// Resume Buttons
document.getElementById('resume-kr').addEventListener('click', () => {
    const userChoice = confirm('Unfortunately, you don\'t have access to the file. Contact me for more information.\n\n불행히도 파일에 접근할 수 없습니다. 자세한 내용은 저에게 문의하십시오.\n\nContact me?');
    if (userChoice) {
        window.location.href = '#contact';
    }
});

document.getElementById('resume-en').addEventListener('click', () => {
    const userChoice = confirm('Unfortunately, you don\'t have access to the file. Contact me for more information.\n\n불행히도 파일에 접근할 수 없습니다. 자세한 내용은 저에게 문의하십시오.\n\nContact me?');
    if (userChoice) {
        window.location.href = '#contact';
    }
});

// Scrolling buttons functionality
document.getElementById('scroll-left').addEventListener('click', () => {
    document.querySelector('.project-container').scrollBy({
        left: -300,
        behavior: 'smooth'
    });
});

document.getElementById('scroll-right').addEventListener('click', () => {
    document.querySelector('.project-container').scrollBy({
        left: 300,
        behavior: 'smooth'
    });
});

// Pop-up functionality
document.querySelectorAll('.project').forEach(project => {
    project.addEventListener('click', () => {
        document.getElementById('popup').style.display = 'block';
        document.getElementById('popup-title').innerText = project.getAttribute('data-title');
        document.getElementById('popup-description').innerText = project.getAttribute('data-description');
    });
});

document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('popup').style.display = 'none';
});

window.onclick = function(event) {
    if (event.target == document.getElementById('popup')) {
        document.getElementById('popup').style.display = 'none';
    }
};
