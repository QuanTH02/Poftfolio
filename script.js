// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Language Toggle
const langToggle = document.getElementById('langToggle');
let currentLang = localStorage.getItem('language') || 'en';

// Load saved language
updateLanguage(currentLang);

langToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'vi' : 'en';
    updateLanguage(currentLang);
    localStorage.setItem('language', currentLang);
});

function updateLanguage(lang) {
    langToggle.textContent = lang.toUpperCase();
    
    // Update all elements with data attributes
    document.querySelectorAll('[data-en]').forEach(element => {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = element.getAttribute(`data-${lang}`);
        } else {
            element.textContent = element.getAttribute(`data-${lang}`);
        }
    });

    // Update show more buttons
    document.querySelectorAll('.show-more-btn').forEach(button => {
        const projectContent = button.closest('.project-content');
        const isExpanded = projectContent.classList.contains('expanded');
        button.textContent = isExpanded ? 
            (lang === 'en' ? 'Show Less' : 'Thu Gọn') : 
            (lang === 'en' ? 'Show More' : 'Xem Thêm');
    });
}

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
            navLinks.classList.remove('active');
        }
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = currentLang === 'en' 
        ? 'Thank you for your message! I will get back to you soon.'
        : 'Cảm ơn tin nhắn của bạn! Tôi sẽ liên hệ lại sớm.';
    alert(message);
    contactForm.reset();
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.section-title, .about-content, .skills-grid, .projects-grid, .contact-content');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial styles
revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Active Navigation Links
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Show More Button
document.querySelectorAll('.show-more-btn').forEach(button => {
    button.addEventListener('click', () => {
        const projectContent = button.closest('.project-content');
        const isExpanded = projectContent.classList.contains('expanded');
        
        projectContent.classList.toggle('expanded');
        button.textContent = isExpanded ? 
            (currentLang === 'en' ? 'Show More' : 'Xem Thêm') : 
            (currentLang === 'en' ? 'Show Less' : 'Thu Gọn');
    });
}); 