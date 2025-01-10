// 맨 위로 이동 버튼
// let moveToTop = function () {
//     document.body.scrollIntoView({ behavior: "smooth" });
// };

// List of text strings for the typing effect
const texts = ['Hello', '안녕하세요', 'สวัสดีครับ'];
let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;
let typingSpeed = 100; // Typing speed
let deletingSpeed = 50; // Deleting speed
let pauseTime = 1000; // Pause time between text changes
let typingDonePause = 2000; // Delay before starting the deletion after typing is done

// Function to type and delete text
function typeEffect() {
    const typingElement = document.getElementById('typing-text');
    const cursor = document.getElementById('cursor');
    
    let currentText = texts[currentTextIndex];

    // Change font depending on the current text
    if (currentTextIndex === 0) {
        typingElement.className = 'text1'; // Use Montserrat for "Hello"
    } else if (currentTextIndex === 1) {
        typingElement.className = 'text2'; // Use Kanit for Korean
    } else if (currentTextIndex === 2) {
        typingElement.className = 'text3'; // Use SukhumvitSet for Thai
    }

    if (currentTextIndex < texts.length) {
        // Type or delete text based on the state
        if (isDeleting) {
            typingElement.innerText = currentText.slice(0, currentCharIndex);
            currentCharIndex--;

            if (currentCharIndex === 0) {
                isDeleting = false;
                currentTextIndex++;
                setTimeout(typeEffect, pauseTime); // Wait before starting next typing
            } else {
                setTimeout(typeEffect, deletingSpeed);
            }
        } else {
            typingElement.innerText = currentText.slice(0, currentCharIndex);
            currentCharIndex++;

            if (currentCharIndex === currentText.length) {
                // Wait for a bit after the text is fully typed
                setTimeout(() => {
                    isDeleting = true;
                    typeEffect(); // Start deleting after the pause
                }, typingDonePause);
            } else {
                setTimeout(typeEffect, typingSpeed);
            }
        }
    } else {
        // Restart after reaching the end of the texts array
        currentTextIndex = 0;
        currentCharIndex = 0;
        isDeleting = false;
        setTimeout(typeEffect, pauseTime); // Restart after all texts have been cycled through
    }
}

// Detect when the user starts scrolling and hide the typing effect
let hasScrolled = false; // Flag to track scrolling

window.addEventListener('scroll', function () {
    if (!hasScrolled) {
        const typingContainer = document.getElementById('typing-container');
        typingContainer.classList.add('hidden'); // Hide the typing effect once scrolling begins
        hasScrolled = true; // Set flag to ensure it only happens once
    }
});

// Start the typing effect when the page loads
window.onload = function () {
    typeEffect();
};



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


// const $txt = document.querySelector(".txt-title");
// const $profileImage = document.querySelector("#profile-image");
// const content = "안녕하세요 😊\nAI개발자 아티프입니다!";
// let contentIndex = 0;

// let typing = function () {
//     if (contentIndex < content.length) {
//         $txt.innerHTML += content[contentIndex];
//         if (content[contentIndex] === "\n") {
//             $txt.innerHTML += "<br />";
//         }
//         contentIndex++;
//         setTimeout(typing, 200); // Delay between each character
//     } else {
//         // After typing is done, move the profile image into place
//         setTimeout(() => {
//             $profileImage.style.bottom = "20px"; // Move the profile image upwards into view
//         }, 500); // Slight delay to allow typing to finish before moving the image
//     }
// };

// // Run the typing effect once when the page loads
// typing();


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
    const userChoice = confirm('Unfortunately, you don\'t have access to the file. Contact for more information.');
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



// document.getElementById('resume-en').addEventListener('click', () => {
//     const userChoice = confirm("Unfortunately, you don't have access to the file. Contact me for more information. Or click 'OK' to enter the password.");
//     if (userChoice) {
//         const userPassword = prompt('Enter the password to access the file:');
//         if (userPassword === '123456') {
//             // alert('Access granted! The file will now download.');
//             // Create a link element and trigger the download
//             const link = document.createElement('a');
//             link.href = '1.jpg'; // Update with the actual path to your file
//             link.download = '1.jpg'; // Suggested filename for the download
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
//         } else {
//             alert('Incorrect password. Please try again or contact me for more information.');
//         }
//     }
// });

// document.getElementById('resume-kr').addEventListener('click', () => {
//     const userChoice = confirm('죄송합니다만, 해당 파일에 접근할 수 없습니다. 자세한 정보는 문의해 주세요. 또는 "확인"을 클릭하여 비밀번호를 입력하세요.');
//     if (userChoice) {
//         const userPassword = prompt('비밀번호를 입력하여 파일에 접근하세요:');
//         if (userPassword === '123456') {
//             // alert('접근 허가되었습니다! 파일이 다운로드됩니다.');
//             // Create a link element and trigger the download
//             const link = document.createElement('a');
//             link.href = '1.jpg'; // Update with the actual path to your file
//             link.download = '1.jpg'; // Suggested filename for the download
//             document.body.appendChild(link);
//             link.click();
//             document.body.removeChild(link);
//         } else {
//             alert('비밀번호가 잘못되었습니다. 다시 시도하거나 문의해 주세요.');
//         }
//     }
// });



// Get project container and a project element
const projectContainer = document.querySelector('.project-container');
const project = document.querySelector('.project');

// Dynamically calculate the scroll amount
const projectWidth = project.offsetWidth + parseInt(getComputedStyle(project).marginLeft) + parseInt(getComputedStyle(project).marginRight);

document.getElementById('scroll-left').addEventListener('click', () => {
    projectContainer.scrollBy({
        left: -projectWidth,
        behavior: 'smooth'
    });
});

document.getElementById('scroll-right').addEventListener('click', () => {
    projectContainer.scrollBy({
        left: projectWidth,
        behavior: 'smooth'
    });
});

{/* <script> */}
document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll("nav.main-menu ul.menu-links li a");

    links.forEach(link => {
        link.addEventListener("click", function() {
            // Remove 'active' class from all links
            links.forEach(link => link.classList.remove("active"));
            
            // Add 'active' class to the clicked link
            this.classList.add("active");
        });
    });
});
// </script>


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


function changeImage(src) {
    document.getElementById('exampleImage').src = src;
}

// Change image on hover
const button = document.querySelector('.more-info-btn');
const image = document.getElementById('exampleImage');

button.addEventListener('mouseover', () => {
    image.src = 'src/memoji2.png'; // Change to hover image
});

button.addEventListener('mouseout', () => {
    image.src = 'src/memoji.png'; // Revert to original image
});

// Navigate to #about on click
function navigateToAbout() {
    window.location.href = '#about';
}
// 이미지 슬라이드
let imgIndex = 0;
let position = 0;
const $btnPrev = document.querySelector(".btn-prev");
const $btnNext = document.querySelector(".btn-next");
const $slideImgs = document.querySelector(".slide-images");
const $slideAlbum = document.querySelector(".slide-album"); // The container for images

let IMG_WIDTH = $slideAlbum.offsetWidth; // Get the initial width of the container

// Update IMG_WIDTH on window resize
window.addEventListener("resize", function () {
  IMG_WIDTH = $slideAlbum.offsetWidth; // Recalculate image width on resize
  position = -imgIndex * IMG_WIDTH; // Adjust position to maintain current image
  $slideImgs.style.transform = `translateX(${position}px)`; // Apply new position
});

let prev = function () {
  if (imgIndex > 0) {
    $btnNext.removeAttribute("disabled");
    position += IMG_WIDTH;
    $slideImgs.style.transform = `translateX(${position}px)`;
    $slideImgs.style.transition = "transform .5s ease-out";
    imgIndex = imgIndex - 1;
  }
  if (imgIndex == 0) {
    $btnPrev.setAttribute("disabled", "true");
  }
};

let next = function () {
  if (imgIndex < 3) {
    $btnPrev.removeAttribute("disabled");
    position -= IMG_WIDTH;
    $slideImgs.style.transform = `translateX(${position}px)`;
    $slideImgs.style.transition = "transform .5s ease-out";
    imgIndex = imgIndex + 1;
  }
  if (imgIndex == 2) {
    $btnNext.setAttribute("disabled", "true");
  }
};

let init = function () {
  $btnPrev.setAttribute("disabled", "true");
  $btnPrev.addEventListener("click", prev);
  $btnNext.addEventListener("click", next);
};

init();


// 모달
const $modalBg = document.getElementsByClassName("modal-background");
const $btnOpen = document.getElementsByClassName("btn-open");
const $btnClose = document.getElementsByClassName("btn-close");

function modal(num) {
  $btnOpen[num].addEventListener("click", () => {
    $modalBg[num].style.display = "flex";
    document.body.style.overflow = "hidden";
  });
  $btnClose[num].addEventListener("click", () => {
    $modalBg[num].style.display = "none";
    document.body.style.overflow = "unset";
  });
}

for (let i = 0; i < $btnOpen.length; i++) {
  modal(i);
}

document.addEventListener("DOMContentLoaded", function() {
    // Get all menu links
    const menuLinks = document.querySelectorAll('nav.main-menu ul.menu-links li a');
    
    // Get the current page's URL
    const currentPage = window.location.pathname; // You can modify this if needed (e.g., for query parameters)
    
    // Loop through all menu links and add 'current-page' to the active one
    menuLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('current-page'); // Add the 'current-page' class to the active link
        } else {
            link.classList.remove('current-page'); // Remove it from others
        }
    });
});

function sendEmail(event) {
    event.preventDefault();  // Prevent form from submitting the usual way
    
    // Get form data
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    
    // Construct the mailto link with subject and body
    const subject = "Message from " + name;
    const body = "Name: " + name + "%0D%0A" + 
                 "Email: " + email + "%0D%0A" + 
                 "Message: " + message;

    // Construct mailto URL
    const mailtoLink = "mailto:athip.som@gmail.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    
    // Open the mail client with pre-filled details
    window.location.href = mailtoLink;

    
}

window.addEventListener('scroll', function () {
    const fadeText1 = document.querySelector('.fade-text-1');
    const fadeText2 = document.querySelector('.fade-text-2');
    const fadeContent = document.querySelector('.fade-content');
    const scrollY = window.scrollY;
    
    // Text1 Animation (Zoom, Grow, Fade Out)
    if (scrollY < 500) {
        fadeText1.style.opacity = 1 - scrollY / 500; // Fade out
        fadeText1.style.zoom = 1 + scrollY / 1000; // Zoom (grow)
    } else if (scrollY >= 500 && scrollY < 1000) {
        fadeText1.style.opacity = 0; // Continue fading out
        fadeText1.style.zoom = 1.3 - (scrollY - 500) / 1000; // Shrink back to original size smoothly
    } else {
        fadeText1.style.opacity = 0; // Fully faded out
        fadeText1.style.zoom = 1; // Reset zoom to original size
    }

    // Text2 Animation (Zoom, Grow, Fade In)
    if (scrollY >= 500 && scrollY < 1000) {
        fadeText2.style.opacity = (scrollY - 500) / 500; // Fade in
        fadeText2.style.zoom = 1.3   + (scrollY - 500) / 1000; // Zoom (grow)
    } else if (scrollY >= 1000 && scrollY < 1200) {
        fadeText2.style.opacity = 1; // Fully visible
        fadeText2.style.zoom = 1.3 - (scrollY - 1000) / 1000; // Shrink back to original size smoothly
    } else {
        fadeText2.style.opacity = 0; // Fully faded out
        fadeText2.style.zoom = 1; // Reset zoom to original size
    }

    // Image and Button Animation
    if (scrollY >= 1000 && scrollY < 1500) {
        fadeContent.style.opacity = (scrollY - 1000) / 500; // Fade in
    } else if (scrollY >= 1500) {
        fadeContent.style.opacity = 1;
    } else {
        fadeContent.style.opacity = 0;

    }

    // // Hide elements in the About section and below
    // const aboutSectionOffset = document.querySelector('#about').offsetTop;
    // if (scrollY >= aboutSectionOffset - window.innerHeight / 2) {
    //     fadeText1.style.zIndex = -1;
    //     fadeText2.style.zIndex = -1;
    //     fadeContent.style.zIndex = -1;
    // } else {
    //     fadeText1.style.zIndex = 1;
    //     fadeText2.style.zIndex = 1;
    //     fadeContent.style.zIndex = 1;
    // }
}); 

document.getElementById('phone-link').addEventListener('click', function (event) {
    event.preventDefault(); // Prevent default link behavior

    const phoneNumber = '+821022736595'; // Replace with your phone number

    // Check if the device is mobile
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        // Redirect to call
        window.location.href = `tel:${phoneNumber}`;
    } else {
        // Copy phone number to clipboard
        navigator.clipboard.writeText(phoneNumber).then(() => {
            // Show "copied" message
            const copyMessage = document.getElementById('copy-message');
            copyMessage.classList.add('show');

            // Hide the message after 2 seconds
            setTimeout(() => {
                copyMessage.classList.remove('show');
            }, 2000);
        }).catch((err) => {
            console.error('Failed to copy phone number:', err);
        });
    }
});

// no zoom
// window.addEventListener('scroll', function () {
//     const fadeText1 = document.querySelector('.fade-text-1');
//     const fadeText2 = document.querySelector('.fade-text-2');
//     const fadeContent = document.querySelector('.fade-content');
//     const scrollY = window.scrollY;
    
//     // Text1 Animation (Fade Out and Zoom-In Effect via font-size)
//     if (scrollY < 500) {
//         fadeText1.style.opacity = 1 - scrollY / 500; // Fade out
//         fadeText1.style.fontSize = `${100 + scrollY / 10}%`; // Zoom (grow) via font-size
//     } else if (scrollY >= 500 && scrollY < 1000) {
//         fadeText1.style.opacity = 0; // Continue fading out
//         fadeText1.style.fontSize = `${200 - (scrollY - 500) / 10}%`; // Shrink back to original size smoothly
//     } else {
//         fadeText1.style.opacity = 0; // Fully faded out
//         fadeText1.style.fontSize = '100%'; // Reset font-size to original size
//     }

//     // Text2 Animation (Fade In and Zoom-In Effect via font-size)
//     if (scrollY >= 500 && scrollY < 1000) {
//         fadeText2.style.opacity = (scrollY - 500) / 500; // Fade in
//         fadeText2.style.fontSize = `${100 + (scrollY - 500) / 10}%`; // Zoom (grow) via font-size
//     } else if (scrollY >= 1000 && scrollY < 1500) {
//         fadeText2.style.opacity = 1; // Fully visible
//         fadeText2.style.fontSize = `${200 - (scrollY - 1000) / 10}%`; // Shrink back to original size smoothly
//     } else {
//         fadeText2.style.opacity = 0; // Fully faded out
//         fadeText2.style.fontSize = '100%'; // Reset font-size to original size
//     }

//     // Image and Button Animation
//     if (scrollY >= 1000 && scrollY < 1500) {
//         fadeContent.style.opacity = (scrollY - 1000) / 500; // Fade in
//     } else if (scrollY >= 1500) {
//         fadeContent.style.opacity = 1;
//     } else {
//         fadeContent.style.opacity = 0;
//     }
// });


function changeLanguage(lang) {
    fetch(`${lang}.json`)
        .then(response => response.json())
        .then(data => {
            // Update the text content of the webpage
            document.querySelector('#home p').textContent = data.home.intro;
            document.querySelector('#profile-pic').alt = data.home.profileAlt;

            document.querySelector('#about h2').textContent = data.about.heading;
            document.querySelector('#about p').textContent = data.about.description;
            document.querySelector('#resume-kr').textContent = data.about.resumeKr;
            document.querySelector('#resume-en').textContent = data.about.resumeEn;
            
            document.querySelector('.txt-about dt:nth-of-type(1)').textContent = data.about.details.name;
            document.querySelector('.txt-about dd:nth-of-type(1)').textContent = data.about.values.name;
            document.querySelector('.txt-about dt:nth-of-type(2)').textContent = data.about.details.birthdate;
            document.querySelector('.txt-about dd:nth-of-type(2)').textContent = data.about.values.birthdate;
            document.querySelector('.txt-about dt:nth-of-type(3)').textContent = data.about.details.residence;
            document.querySelector('.txt-about dd:nth-of-type(3)').textContent = data.about.values.residence;
            document.querySelector('.txt-about dt:nth-of-type(4)').textContent = data.about.details.school;
            document.querySelector('.txt-about dd:nth-of-type(4)').textContent = data.about.values.school;
            document.querySelector('.txt-about dt:nth-of-type(5)').textContent = data.about.details.major;
            document.querySelector('.txt-about dd:nth-of-type(5)').textContent = data.about.values.major;

            document.querySelector('#work h2').textContent = data.work.heading;
            document.querySelector('.project:nth-of-type(1) h3').textContent = data.work.projectTitle1;
            document.querySelector('.project:nth-of-type(1) p').textContent = data.work.projectDesc1;
            document.querySelector('.project:nth-of-type(2) h3').textContent = data.work.projectTitle2;
            document.querySelector('.project:nth-of-type(2) p').textContent = data.work.projectDesc2;

            document.querySelector('#contact h2').textContent = data.contact.heading;
            document.querySelector('.contact-link[href^="mailto:"] ion-icon').setAttribute('name', data.contact.emailAlt);
            document.querySelector('.contact-link[href^="https://www.linkedin.com"] ion-icon').setAttribute('name', data.contact.linkedinAlt);

            document.querySelector('footer p').innerHTML = data.footer.copyright;
        })
        .catch(error => console.error('Error loading language file:', error));
}

// Initialize the default language
document.addEventListener('DOMContentLoaded', () => {
    changeLanguage('en'); // Set the default language to English
});
