// Theme and Language Management
let currentTheme = localStorage.getItem('theme') || 'light';
let currentLanguage = localStorage.getItem('language') || 'en';

// Load saved theme and language
document.documentElement.setAttribute('data-theme', currentTheme);
document.documentElement.setAttribute('lang', currentLanguage);

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
});

// Language Toggle
const languageToggle = document.getElementById('language-toggle');
languageToggle.addEventListener('click', () => {
    currentLanguage = currentLanguage === 'en' ? 'vi' : 'en';
    document.documentElement.setAttribute('lang', currentLanguage);
    localStorage.setItem('language', currentLanguage);
    updateLanguage();
});

// Update theme icon
function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Update language text
function updateLanguage() {
    const elements = document.querySelectorAll('[data-en], [data-vi]');
    elements.forEach(element => {
        const text = currentLanguage === 'en' ? 
            element.getAttribute('data-en') : 
            element.getAttribute('data-vi');
        if (text) element.textContent = text;
    });
}

// Mobile Navigation
const mobileNavToggle = document.getElementById('mobile-nav-toggle');
const nav = document.querySelector('nav');

mobileNavToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Close mobile nav when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !mobileNavToggle.contains(e.target)) {
        nav.classList.remove('active');
    }
});

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
            nav.classList.remove('active');
        }
    });
});

// Form submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = currentLanguage === 'en' ? 
        'Thank you for your message! I will get back to you soon.' : 
        'Cảm ơn tin nhắn của bạn! Tôi sẽ liên hệ lại sớm.';
    alert(message);
    contactForm.reset();
});

// Scroll reveal animation
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(element => observer.observe(element));

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

// Show More functionality for project cards
function initializeShowMoreButtons() {
    console.log('Initializing show more buttons...');
    const buttons = document.querySelectorAll('.show-more-btn');
    console.log('Found buttons:', buttons.length);
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            console.log('Button clicked!');
            e.preventDefault();
            e.stopPropagation();
            
            const card = this.closest('.project-card');
            const content = card.querySelector('.project-content');
            console.log('Content element:', content);
            const isExpanded = content.classList.toggle('expanded');
            console.log('Is expanded:', isExpanded);
            
            // Update button text based on language
            this.textContent = currentLanguage === 'en' ? 
                (isExpanded ? 'Show Less' : 'Show More') : 
                (isExpanded ? 'Thu gọn' : 'Xem thêm');
        });
    });
}

// Initialize show more buttons when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing...');
    initializeShowMoreButtons();
});

// Re-initialize show more buttons when language changes
const originalUpdateLanguage = updateLanguage;
updateLanguage = function() {
    console.log('Language changed, re-initializing...');
    originalUpdateLanguage();
    initializeShowMoreButtons();
}; 