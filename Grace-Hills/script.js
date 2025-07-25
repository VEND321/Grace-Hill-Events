 // Elegant Preloader
 window.addEventListener('load', function() {
    setTimeout(function() {
        const preloader = document.getElementById('preloader');
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        // Initialize all animations and functionality after preloader hides
        initAll();
    }, 1500);
});

function initAll() {
    // Initialize Swiper Gallery
    const gallerySwiper = new Swiper('.gallerySwiper', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 20,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
        }
    });

    // Initialize Swiper Testimonials
    const testimonialsSwiper = new Swiper('.testimonialsSwiper', {
        loop: true,
        autoplay: {
            delay: 8000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        
        // Toggle body scroll when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            document.body.style.overflow = '';
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        const header = document.getElementById('header');
        header.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate the position to scroll to
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                // Smooth scroll
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });

    // Initialize lightbox
    lightbox.option({
        'resizeDuration': 200,
        'wrapAround': true,
        'showImageNumberLabel': false,
        'fadeDuration': 300
    });

    // Quote Calculator
    const quoteForm = document.getElementById('quoteForm');
    const calculatorResult = document.getElementById('calculatorResult');
    
    quoteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const eventType = document.getElementById('eventType').value;
        const guestCount = parseInt(document.getElementById('guestCount').value);
        
        // Calculate estimate (simplified for demo)
        let basePrice = 0;
        
        switch(eventType) {
            case 'wedding':
                basePrice = 500000;
                break;
            case 'birthday':
                basePrice = 250000;
                break;
            case 'anniversary':
                basePrice = 350000;
                break;
            case 'corporate':
                basePrice = 400000;
                break;
            default:
                basePrice = 300000;
        }
        
        // Adjust for guest count
        let guestAdjustment = 0;
        if (guestCount > 100) guestAdjustment = 100000;
        if (guestCount > 200) guestAdjustment = 200000;
        if (guestCount > 300) guestAdjustment = 350000;
        
        const minEstimate = basePrice + guestAdjustment;
        const maxEstimate = minEstimate * 1.3;
        
        // Format as currency
        const formatter = new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            maximumFractionDigits: 0
        });
        
        document.getElementById('quoteAmount').textContent = 
            `${formatter.format(minEstimate)} - ${formatter.format(maxEstimate)}`;
        
        // Show result
        calculatorResult.style.display = 'block';
        
        // Scroll to result
        calculatorResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });

    // WhatsApp Form
    const whatsappForm = document.getElementById('whatsappForm');
    if (whatsappForm) {
        whatsappForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const eventType = document.getElementById('eventType').value;
            const name = e.target[1].value;
            const email = e.target[2].value;
            const phone = e.target[3].value;
            const message = `Hi Grace Hills! I'm ${name} planning a ${eventType}. ${e.target[4].value} (Contact: ${phone} | ${email})`;
            window.open(`https://api.whatsapp.com/message/5XZ6JVBVVBAFO1?autoload=1&app_absent=0?text=${encodeURIComponent(message)}`, '_blank');
        });
    }

    // Date Picker
    flatpickr("#eventDate", {
        minDate: "today",
        dateFormat: "Y-m-d",
    });

    // Animated Counters
    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    };

    // Initialize counters when they come into view
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target.querySelector('.stat-number');
                const target = parseInt(entry.target.getAttribute('data-count'));
                animateCounter(counter, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-item').forEach(item => {
        counterObserver.observe(item);
    });

    // Animation on scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Apply different delays
        if (el.classList.contains('delay-1')) {
            el.style.transitionDelay = '0.2s';
        } else if (el.classList.contains('delay-2')) {
            el.style.transitionDelay = '0.4s';
        }
        
        fadeObserver.observe(el);
    });
}