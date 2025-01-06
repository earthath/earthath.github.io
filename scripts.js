// 맨 위로 이동 버튼
// let moveToTop = function () {
//     document.body.scrollIntoView({ behavior: "smooth" });
// };

// Back-to-top button functionality
const backToTop = document.getElementById('backToTop');

// Show the icon after scrolling down a bit
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// Scroll smoothly to the top when clicked
backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
});


// 타이핑 효과
const $txt = document.querySelector(".txt-title");
const content = "안녕하세요 😊\n맛있는 페페 개구리입니다.";
let contentIndex = 0;

let typing = function () {
    if (contentIndex < content.length) {
        $txt.innerHTML += content[contentIndex];
        if (content[contentIndex] === "\n") {
            $txt.innerHTML += "<br />";
        }
        contentIndex++;
        setTimeout(typing, 200); // Delay between each character
    }
};

// Run the typing effect once when the page loads
typing();

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
document.getElementById('resume-en').addEventListener('click', () => {
    const userChoice = confirm('Unfortunately, you don\'t have access to the file. Contact me for more information.');
    if (userChoice) {
        window.location.href = '#contact';
    }
});

document.getElementById('resume-kr').addEventListener('click', () => {
    const userChoice = confirm('죄송합니다만, 해당 파일에 접근할 수 없습니다. 자세한 정보는 문의해 주세요.');
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

