// Pop-out Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const popoutMenu = document.getElementById('popoutMenu');
    const menuToggle = document.getElementById('menuToggle');
    const popoutClose = document.getElementById('popoutClose');
    const popoutLinks = document.querySelectorAll('.popout-menu-link');

    function openMenu() {
        popoutMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        popoutMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            openMenu();
        });
    }

    if (popoutClose) {
        popoutClose.addEventListener('click', (e) => {
            e.stopPropagation();
            closeMenu();
        });
    }

    // Close menu when clicking outside
    popoutMenu.addEventListener('click', (e) => {
        if (e.target === popoutMenu) {
            closeMenu();
        }
    });

    // Close menu when clicking a link
    popoutLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(() => {
                closeMenu();
            }, 200);
        });
    });
});

// Active navigation state based on scroll position (for popout menu) - Optimized with throttling
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.popout-menu-link');
    const sections = document.querySelectorAll('section[id]');
    let ticking = false;
    
    function updateActiveNav() {
        let current = '';
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateActiveNav);
            ticking = true;
        }
    }, { passive: true });
    updateActiveNav(); // Initial call
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll - Optimized with throttling
let navbarTicking = false;
window.addEventListener('scroll', () => {
    if (!navbarTicking) {
        window.requestAnimationFrame(() => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(10, 10, 10, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
            } else {
                navbar.style.background = 'rgba(10, 10, 10, 0.95)';
                navbar.style.boxShadow = 'none';
            }
            navbarTicking = false;
        });
        navbarTicking = true;
    }
}, { passive: true });

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.section-title, .about-text, .about-image, .skill-category, .project-card, .contact-info, .contact-form');
    
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
});

// Skill bars animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('data-width');
            entry.target.style.width = width;
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-progress').forEach(bar => {
    skillObserver.observe(bar);
});

// Typing animation for hero name (similar to reactbits.dev/text-animations/text-type)
class TypeWriter {
    constructor(element, text, options = {}) {
        this.element = element;
        this.text = text;
        this.speed = options.speed || 100;
        this.deleteSpeed = options.deleteSpeed || 50;
        this.delay = options.delay || 0;
        this.onComplete = options.onComplete || null;
        this.currentIndex = 0;
        this.isDeleting = false;
    }

    type() {
        const fullText = this.text;
        
        if (this.delay > 0) {
            setTimeout(() => {
                this.delay = 0;
                this.type();
            }, this.delay);
            this.delay = 0;
            return;
        }

        if (this.isDeleting) {
            // Delete characters
            this.element.textContent = fullText.substring(0, this.currentIndex - 1);
            this.currentIndex--;
            
            if (this.currentIndex === 0) {
                this.isDeleting = false;
            }
        } else {
            // Type characters
            this.element.textContent = fullText.substring(0, this.currentIndex + 1);
            this.currentIndex++;
            
            if (this.currentIndex === fullText.length) {
                if (this.onComplete) {
                    this.onComplete();
                }
                return; // Stop typing
            }
        }

        const typingSpeed = this.isDeleting ? this.deleteSpeed : this.speed;
        setTimeout(() => this.type(), typingSpeed);
    }

    start() {
        this.type();
    }
}

// Initialize typing animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const typingNameElement = document.getElementById('typing-name');
    const cursorElement = document.querySelector('.typing-cursor');
    const subtitleElement = document.getElementById('typing-subtitle');
    
    if (typingNameElement) {
        const name = 'Athip Somtham';
        
        // Hide cursor initially
        if (cursorElement) {
            cursorElement.style.opacity = '0';
        }
        
        // Start typing animation after a brief delay
        setTimeout(() => {
            if (cursorElement) {
                cursorElement.style.opacity = '1';
            }
            
            const typeWriter = new TypeWriter(typingNameElement, name, {
                speed: 120,
                delay: 300,
                onComplete: () => {
                    // After name is typed, show subtitle with fade in
                    setTimeout(() => {
                        if (subtitleElement) {
                            subtitleElement.style.display = 'block';
                            subtitleElement.classList.add('visible');
                            // Trigger fade-in animation
                            setTimeout(() => {
                                subtitleElement.style.opacity = '1';
                            }, 50);
                        }
                    }, 500);
                }
            });
            
            typeWriter.start();
        }, 500);
    }
});

// Parallax effect for floating cards
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-card');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Contact form handling
document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS
    emailjs.init("tFwLnert7PgXN9q-t");
    
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data - use more specific selectors
            const inputs = contactForm.querySelectorAll('input');
            const name = inputs[0].value; // First input (name)
            const email = inputs[1].value; // Second input (email)
            const subject = inputs[2].value; // Third input (subject)
            const message = contactForm.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Get submit button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Send email using EmailJS
            const templateParams = {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
                to_email: 'athip.som@gmail.com'
            };
            
            emailjs.send('service_7jd9dcr', 'template_contact', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Thank you for your message! I\'ll get back to you soon.');
                    contactForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    // Fallback to mailto if EmailJS fails
                    const mailtoLink = `mailto:athip.som@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`)}`;
                    window.location.href = mailtoLink;
                    alert('Opening your email client as backup...');
                    contactForm.reset();
                })
                .finally(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
});

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat h3');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Smooth reveal animation for sections
const revealElements = document.querySelectorAll('section');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    revealObserver.observe(section);
});

// Add click effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Collapsible sections functionality
document.addEventListener('DOMContentLoaded', () => {
    const collapsibleItems = document.querySelectorAll('.collapsible-item');
    
    collapsibleItems.forEach(item => {
        const header = item.querySelector('.collapsible-header');
        const content = item.querySelector('.collapsible-content');
        const icon = item.querySelector('.collapsible-icon');
        
        header.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            collapsibleItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
});

// Experience counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Experience counter observer
const experienceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target.querySelector('.counter');
            const target = parseInt(counter.getAttribute('data-target'));
            animateCounter(counter, target);
            experienceObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Observe experience section
const experienceSection = document.querySelector('.experience-section');
if (experienceSection) {
    experienceObserver.observe(experienceSection);
}

// Timeline animation observer
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const timelineItems = entry.target.querySelectorAll('.timeline-item');
            timelineItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 200);
            });
        }
    });
}, { threshold: 0.1 });

// Observe timeline sections
document.addEventListener('DOMContentLoaded', () => {
    const timelineSections = document.querySelectorAll('.timeline');
    timelineSections.forEach(section => {
        // Set initial styles for animation
        const timelineItems = section.querySelectorAll('.timeline-item');
        timelineItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
        
        timelineObserver.observe(section);
    });
});

// Lanyard Badge Visibility - Show only on landing page
document.addEventListener('DOMContentLoaded', () => {
    const lanyardContainer = document.getElementById('lanyard-container');
    const heroSection = document.querySelector('#home');
    
    if (!lanyardContainer || !heroSection) return;
    
    // Intersection Observer to show/hide lanyard based on hero section visibility
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                lanyardContainer.style.opacity = '1';
                lanyardContainer.style.pointerEvents = 'none';
            } else {
                lanyardContainer.style.opacity = '0';
                lanyardContainer.style.pointerEvents = 'none';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '-100px 0px'
    });
    
    observer.observe(heroSection);
    
    // Initially show if hero is visible
    if (heroSection.getBoundingClientRect().top < window.innerHeight) {
        lanyardContainer.style.opacity = '1';
    } else {
        lanyardContainer.style.opacity = '0';
    }
});

// Liquid Ether Background Mouse Interaction - Optimized
document.addEventListener('DOMContentLoaded', () => {
    const blobs = document.querySelectorAll('.blob');
    let mouseX = 0;
    let mouseY = 0;
    let isHovering = false;
    let animationRunning = false;
    
    // Update mouse position - throttled
    let mouseUpdateTicking = false;
    document.addEventListener('mousemove', (e) => {
        if (!mouseUpdateTicking) {
            window.requestAnimationFrame(() => {
                mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
                mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
                isHovering = true;
                mouseUpdateTicking = false;
            });
            mouseUpdateTicking = true;
        }
    }, { passive: true });
    
    // Reset when mouse leaves
    document.addEventListener('mouseleave', () => {
        isHovering = false;
        mouseX = 0;
        mouseY = 0;
    });
    
    // Animate blobs based on mouse position - only when hovering
    function animateBlobs() {
        if (!isHovering) {
            animationRunning = false;
            return;
        }
        
        animationRunning = true;
        blobs.forEach((blob, index) => {
            const intensity = 30 * (index + 1);
            const x = mouseX * intensity;
            const y = mouseY * intensity;
            
            // Use translate3d for GPU acceleration
            blob.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0)`;
        });
        
        if (animationRunning) {
            requestAnimationFrame(animateBlobs);
        }
    }
    
    // Start animation on first hover
    document.addEventListener('mousemove', () => {
        if (isHovering && !animationRunning) {
            animateBlobs();
        }
    }, { once: true, passive: true });
});
