console.log("Script loaded");

// Theme and Language Management
let currentTheme = localStorage.getItem('theme') || 'dark';
let currentLanguage = localStorage.getItem('language') || 'en';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded, initializing...");
    
    // Load saved theme and language
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.documentElement.setAttribute('lang', currentLanguage);

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', currentTheme);
            localStorage.setItem('theme', currentTheme);
            updateThemeIcon();
        });
    }

    // Language Toggle
    const languageToggle = document.getElementById('language-toggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', () => {
            currentLanguage = currentLanguage === 'en' ? 'vi' : 'en';
            document.documentElement.setAttribute('lang', currentLanguage);
            localStorage.setItem('language', currentLanguage);
            updateLanguage();
        });
    }

    // Update theme icon
    function updateThemeIcon() {
        const icon = themeToggle?.querySelector('i');
        if (icon) {
            icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    // Update language text
    function updateLanguage() {
        const elements = document.querySelectorAll('[data-en], [data-vi]');
        elements.forEach(element => {
            const text = currentLanguage === 'en' ? 
                element.getAttribute('data-en') : 
                element.getAttribute('data-vi');
            if (text) {
                // Preserve the name in the highlight span
                if (element.classList.contains('highlight')) {
                    element.textContent = 'Trần Hồng Quân';
                } else {
                    element.textContent = text;
                }
            }
        });
    }

    // Mobile Navigation
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const nav = document.querySelector('nav');

    if (mobileNavToggle && nav) {
        mobileNavToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });

        // Close mobile nav when clicking outside
        document.addEventListener('click', (e) => {
            if (!nav.contains(e.target) && !mobileNavToggle.contains(e.target)) {
                nav.classList.remove('active');
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                if (nav) nav.classList.remove('active');
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = currentLanguage === 'en' ? 
                'Thank you for your message! I will get back to you soon.' : 
                'Cảm ơn tin nhắn của bạn! Tôi sẽ liên hệ lại sớm.';
            alert(message);
            contactForm.reset();
        });
    }

    // Show More/Less functionality using event delegation
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('show-more-btn')) {
            console.log('Show more button clicked');
            const card = e.target.closest('.project-card');
            const content = card.querySelector('.project-content');
            const shortTags = card.querySelector('.project-tags:not(.full-tags)');
            const fullTags = card.querySelector('.project-tags.full-tags');
            const isExpanded = content.classList.toggle('expanded');
            
            // Toggle visibility of tags
            if (shortTags && fullTags) {
                shortTags.style.display = isExpanded ? 'none' : 'flex';
                fullTags.style.display = isExpanded ? 'flex' : 'none';
            }
            
            // Update button text based on language
            e.target.textContent = currentLanguage === 'en' ? 
                (isExpanded ? 'Show Less' : 'Show More') : 
                (isExpanded ? 'Thu gọn' : 'Xem thêm');
        }
    });

    // Initialize snow effect
    console.log('Initializing snow effect');
    initSnowEffect();

    // Check for truncated content
    checkTruncation();
});

// Snow Effect
function createSnowflake() {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    
    // Random size between 2px and 4px for natural look
    const size = Math.random() * 2 + 2;
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    
    // Random position across the screen
    snowflake.style.left = `${Math.random() * 100}%`;
    
    // Random animation duration between 8s and 12s for slower, more natural movement
    const duration = Math.random() * 4 + 8;
    snowflake.style.animationDuration = `${duration}s`;
    
    // Random delay for natural distribution
    const delay = Math.random() * 5;
    snowflake.style.animationDelay = `${delay}s`;
    
    return snowflake;
}

function initSnowEffect() {
    const snowContainer = document.querySelector('.snow-container');
    if (!snowContainer) return;
    
    const snowflakeCount = 15; // Reduced number for subtle effect
    
    // Create initial snowflakes
    for (let i = 0; i < snowflakeCount; i++) {
        const snowflake = createSnowflake();
        snowContainer.appendChild(snowflake);
    }
    
    // Add new snowflakes occasionally
    setInterval(() => {
        if (Math.random() < 0.3) { // 30% chance to add new snowflake
            const snowflake = createSnowflake();
            snowContainer.appendChild(snowflake);
            
            // Remove snowflake after animation completes
            snowflake.addEventListener('animationend', () => {
                snowflake.remove();
            });
        }
    }, 1000); // Check every second
}

// Active navigation link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Check for truncated content
function checkTruncation() {
    const elements = document.querySelectorAll('[data-tooltip]');
    elements.forEach(element => {
        if (element.offsetWidth < element.scrollWidth) {
            element.classList.add('truncated');
        } else {
            element.classList.remove('truncated');
        }
    });
}

// Check on load and resize
window.addEventListener('load', checkTruncation);
window.addEventListener('resize', checkTruncation);

// Check when show more is clicked
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('show-more-btn')) {
        setTimeout(checkTruncation, 100); // Check after animation
    }
}); 