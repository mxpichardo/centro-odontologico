// Navbar scroll effect
const navbar = document.querySelector('.navbar');
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');
const scrollProgress = document.querySelector('.scroll-progress');
const counters = document.querySelectorAll('.counter');
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.carousel-control.prev');
const nextBtn = document.querySelector('.carousel-control.next');
const sections = document.querySelectorAll('section[id]');
const navLinksItems = document.querySelectorAll('.nav-links a');
let testimonialIndex = 0;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (scrollProgress) {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        scrollProgress.style.width = `${scrollPercent}%`;
    }

    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinksItems.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
    });
});

// Mobile menu toggle
if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const isOpen = navLinks.classList.contains('open');
        mobileToggle.innerHTML = isOpen ? '<i class="ri-close-line"></i>' : '<i class="ri-menu-line"></i>';
        document.body.classList.toggle('no-scroll', isOpen);
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                mobileToggle.innerHTML = '<i class="ri-menu-line"></i>';
                document.body.classList.remove('no-scroll');
            }
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('open')) {
            navLinks.classList.remove('open');
            mobileToggle.innerHTML = '<i class="ri-menu-line"></i>';
            document.body.classList.remove('no-scroll');
        }
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            history.pushState(null, null, targetId);
        }
    });
});

// Scroll Reveal Animation Set up
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, revealOptions);

revealElements.forEach(el => revealObserver.observe(el));

// Counter animation
const animateCounter = (counter) => {
    const target = Number(counter.dataset.target);
    const suffix = counter.dataset.suffix || '';
    let current = 0;
    const step = Math.max(1, Math.floor(target / 120));

    const update = () => {
        current += step;
        if (current >= target) {
            counter.textContent = `${target}${suffix}`;
        } else {
            counter.textContent = `${current}${suffix}`;
            requestAnimationFrame(update);
        }
    };

    update();
};

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            if (!counter.dataset.animated) {
                animateCounter(counter);
                counter.dataset.animated = 'true';
            }
        }
    });
}, { threshold: 0.4 });

counters.forEach(counter => counterObserver.observe(counter));

// Testimonial slider
const updateTestimonial = (index) => {
    testimonialCards.forEach((card, i) => {
        card.classList.toggle('active', i === index);
    });
};

const showNextTestimonial = () => {
    testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
    updateTestimonial(testimonialIndex);
};

const showPrevTestimonial = () => {
    testimonialIndex = (testimonialIndex - 1 + testimonialCards.length) % testimonialCards.length;
    updateTestimonial(testimonialIndex);
};

if (prevBtn) prevBtn.addEventListener('click', showPrevTestimonial);
if (nextBtn) nextBtn.addEventListener('click', showNextTestimonial);

setInterval(() => {
    if (testimonialCards.length > 1) {
        showNextTestimonial();
    }
}, 9000);
