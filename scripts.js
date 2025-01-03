// Typing Effect
document.addEventListener('DOMContentLoaded', () => {
    const nameElement = document.getElementById('typing-name');
    const nameText = nameElement.innerHTML;
    nameElement.innerHTML = '';
    let i = 0;

    function typeWriter() {
        if (i < nameText.length) {
            nameElement.innerHTML += nameText.charAt(i);
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

// document.addEventListener('DOMContentLoaded', () => {
//     document.getElementById('resume-kr').addEventListener('click', () => {
//         const userChoice = confirm(
//             'Unfortunately, you don\'t have access to the file. Contact me for more information.\n\n불행히도 파일에 접근할 수 없습니다. 자세한 내용은 저에게 문의하십시오.\n\nContact me?'
//         );
//         if (userChoice) {
//             document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
//         }
//     });

//     document.getElementById('resume-en').addEventListener('click', () => {
//         const userChoice = confirm(
//             'Unfortunately, you don\'t have access to the file. Contact me for more information.\n\n불행히도 파일에 접근할 수 없습니다. 자세한 내용은 저에게 문의하십시오.\n\nContact me?'
//         );
//         if (userChoice) {
//             document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
//         }
//     });
// });
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