// Animaciones de scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observar elementos para animaciones de scroll
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu .nav-link');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        // Close mobile menu when clicking on links
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Elementos que se animan al hacer scroll
    const animateElements = document.querySelectorAll('.category-item, .property-card, .stat-card, .location-card');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });

    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        // Add background blur when scrolled
        if (scrollTop > 50) {
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.backgroundColor = 'white';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
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

    // Property card hover effects
    const propertyCards = document.querySelectorAll('.property-card');
    propertyCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
            card.style.boxShadow = '0 25px 50px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
    });

    // Category item hover effects
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('.category-icon');
            icon.style.transform = 'scale(1.2) rotate(5deg)';
            icon.style.background = 'linear-gradient(135deg, #4A90E2, #357ABD)';
            icon.style.color = 'white';
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('.category-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
            icon.style.background = 'linear-gradient(135deg, #F8F9FA, #E9ECEF)';
            icon.style.color = 'inherit';
        });
    });

    // Search box focus effects
    const searchInput = document.querySelector('.search-input');
    const searchBox = document.querySelector('.search-box');
    
    if (searchInput && searchBox) {
        searchInput.addEventListener('focus', () => {
            searchBox.style.transform = 'translateY(-5px) scale(1.02)';
            searchBox.style.boxShadow = '0 20px 50px rgba(74, 144, 226, 0.2)';
        });
        
        searchInput.addEventListener('blur', () => {
            searchBox.style.transform = 'translateY(0) scale(1)';
            searchBox.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        });
    }

    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all tabs
            tabButtons.forEach(tab => tab.classList.remove('active'));
            // Add active class to clicked tab
            btn.classList.add('active');
            
            // Add click animation
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1.05)';
            }, 100);
        });
    });

    // Filter buttons functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all filters
            filterButtons.forEach(filter => filter.classList.remove('active'));
            // Add active class to clicked filter
            btn.classList.add('active');
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255,255,255,0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = '50%';
            ripple.style.top = '50%';
            ripple.style.width = '20px';
            ripple.style.height = '20px';
            ripple.style.marginLeft = '-10px';
            ripple.style.marginTop = '-10px';
            
            btn.style.position = 'relative';
            btn.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Property favorite buttons
    const favoriteButtons = document.querySelectorAll('.property-favorite');
    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Toggle favorite state
            const isActive = btn.classList.contains('active');
            if (isActive) {
                btn.classList.remove('active');
                btn.style.background = 'rgba(255,255,255,0.9)';
                btn.style.color = 'inherit';
            } else {
                btn.classList.add('active');
                btn.style.background = '#FF6B6B';
                btn.style.color = 'white';
            }
            
            // Add pulse animation
            btn.style.transform = 'scale(1.3)';
            setTimeout(() => {
                btn.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // Location cards parallax effect - DISABLED to fix scroll issues
    // const locationCards = document.querySelectorAll('.location-card');
    // window.addEventListener('scroll', () => {
    //     const scrolled = window.pageYOffset;
    //     const rate = scrolled * -0.5;
    //     
    //     locationCards.forEach((card, index) => {
    //         const img = card.querySelector('img');
    //         if (img) {
    //             img.style.transform = `translateY(${rate * (index + 1) * 0.1}px)`;
    //         }
    //     });
    // });

    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats');
    
    const animateCounters = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target + '+';
                }
            };
            
            updateCounter();
        });
    };

    // Trigger counter animation when stats section is visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Newsletter subscription
    const newsletterForm = document.querySelector('.newsletter');
    if (newsletterForm) {
        const input = newsletterForm.querySelector('input');
        const button = newsletterForm.querySelector('button');
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            if (input.value.trim()) {
                // Success animation
                button.textContent = '✓ Subscribed!';
                button.style.background = '#28A745';
                input.value = '';
                
                setTimeout(() => {
                    button.textContent = 'Subscribe';
                    button.style.background = 'linear-gradient(135deg, #4A90E2, #357ABD)';
                }, 2000);
            } else {
                // Error animation
                input.style.borderColor = '#FF6B6B';
                input.placeholder = 'Please enter your email';
                
                setTimeout(() => {
                    input.style.borderColor = '';
                    input.placeholder = 'Email';
                }, 2000);
            }
        });
    }

    // Add floating animation to hero images
    const heroImageLeft = document.querySelector('.hero-image-left');
    const heroImageRight = document.querySelector('.hero-image-right');
    const heroImageCenterTop = document.querySelector('.hero-image-center-top');
    const heroImageBottomLeft = document.querySelector('.hero-image-bottom-left');
    const heroImageBottomRight = document.querySelector('.hero-image-bottom-right');
    const heroImageTopLeft = document.querySelector('.hero-image-top-left');
    const heroImageTopRight = document.querySelector('.hero-image-top-right');
    const heroImageCenterBottom = document.querySelector('.hero-image-center-bottom');
    
    const heroImages = [heroImageLeft, heroImageRight, heroImageCenterTop, heroImageBottomLeft, 
                       heroImageBottomRight, heroImageTopLeft, heroImageTopRight, heroImageCenterBottom];
    
    if (heroImages.every(img => img)) {
        setInterval(() => {
            heroImages.forEach((img, index) => {
                if (img) {
                    img.style.animation = `float 3s ease-in-out infinite ${index * 0.3}s`;
                }
            });
        }, 100);
    }

    // Mouse cursor effects
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: linear-gradient(135deg, #4A90E2, #357ABD);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        opacity: 0;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.opacity = '0.7';
    });

    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .property-card, .category-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(2)';
            cursor.style.opacity = '0.3';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.opacity = '0.7';
        });
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

