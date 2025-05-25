// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Page Loading Animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    document.querySelectorAll('.service-card').forEach((el, index) => {
        el.classList.add('animate-on-scroll', 'slide-up');
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    document.querySelectorAll('.team-member').forEach((el, index) => {
        el.classList.add('animate-on-scroll', 'slide-up');
        el.style.animationDelay = `${index * 0.2}s`;
        observer.observe(el);
    });

    document.querySelectorAll('.gallery-item').forEach((el, index) => {
        el.classList.add('animate-on-scroll', 'slide-up');
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });

    // Add animation to about section
    const aboutImg = document.querySelector('.about-img');
    const aboutContent = document.querySelector('.about-content');
    if (aboutImg && aboutContent) {
        aboutImg.classList.add('animate-on-scroll', 'slide-left');
        aboutContent.classList.add('animate-on-scroll', 'slide-right');
        aboutContent.style.animationDelay = '0.2s';
        observer.observe(aboutImg);
        observer.observe(aboutContent);
    }
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
    });
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Testimonial Slider
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentTestimonialIndex = 0;
    
    // Clone first and last items for infinite loop if there are items
    if (testimonialItems.length > 0) {
        const firstClone = testimonialItems[0].cloneNode(true);
        const lastClone = testimonialItems[testimonialItems.length - 1].cloneNode(true);
        
        testimonialTrack.appendChild(firstClone);
        testimonialTrack.insertBefore(lastClone, testimonialItems[0]);
        
        // Set initial position
        testimonialTrack.style.transform = `translateX(-${(currentTestimonialIndex + 1) * 100}%)`;
        
        nextBtn.addEventListener('click', () => {
            currentTestimonialIndex++;
            testimonialTrack.style.transition = 'transform 0.5s ease';
            testimonialTrack.style.transform = `translateX(-${(currentTestimonialIndex + 1) * 100}%)`;
            
            if (currentTestimonialIndex === testimonialItems.length) {
                setTimeout(() => {
                    testimonialTrack.style.transition = 'none';
                    currentTestimonialIndex = 0;
                    testimonialTrack.style.transform = `translateX(-${(currentTestimonialIndex + 1) * 100}%)`;
                }, 500);
            }
        });
        
        prevBtn.addEventListener('click', () => {
            currentTestimonialIndex--;
            testimonialTrack.style.transition = 'transform 0.5s ease';
            testimonialTrack.style.transform = `translateX(-${(currentTestimonialIndex + 1) * 100}%)`;
            
            if (currentTestimonialIndex === -1) {
                setTimeout(() => {
                    testimonialTrack.style.transition = 'none';
                    currentTestimonialIndex = testimonialItems.length - 1;
                    testimonialTrack.style.transform = `translateX(-${(currentTestimonialIndex + 1) * 100}%)`;
                }, 500);
            }
        });
        
        // Auto slide testimonials
        let testimonialInterval = setInterval(() => {
            nextBtn.click();
        }, 6000);
        
        // Pause auto sliding on hover
        testimonialTrack.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialTrack.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(() => {
                nextBtn.click();
            }, 6000);
        });
    }
    
    // Testimonial Tabs
    const testimonialTabs = document.querySelectorAll('.testimonial-tab');
    const testimonialContents = document.querySelectorAll('.testimonial-content');
    
    testimonialTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabTarget = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            testimonialTabs.forEach(t => t.classList.remove('active'));
            testimonialContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to current tab and content
            tab.classList.add('active');
            document.getElementById(tabTarget).classList.add('active');
        });
    });
    
    // Hero Slider
    let slideIndex = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    // Initialize slider if there are slides
    if (slides.length > 0) {
        // Show slides function
        function showSlides(n) {
            // Reset active slides
            slides.forEach((slide, index) => {
                slide.classList.remove('active');
                slide.style.display = 'none';
                // Reset content animations
                const content = slide.querySelector('.slide-content');
                if (content) {
                    content.style.animation = 'none';
                    content.offsetHeight; // Trigger reflow
                    content.style.animation = null;
                }
            });

            // Reset active dots
            dots.forEach(dot => {
                dot.classList.remove('active-dot');
            });

            // Show current slide and dot with enhanced animations
            if (slides[n] && dots[n]) {
                slides[n].classList.add('active');
                slides[n].style.display = 'block';
                dots[n].classList.add('active-dot');

                // Trigger content animations
                const slideContent = slides[n].querySelector('.slide-content');
                if (slideContent) {
                    const elements = slideContent.querySelectorAll('.hero-subtitle, .hero-title, .hero-text, .hero-btns');
                    elements.forEach((el, index) => {
                        el.style.animationDelay = `${0.2 + index * 0.2}s`;
                    });
                }
            }
        }
        
        // Next/previous controls
        window.plusSlides = function(n) {
            slideIndex += n;
            
            if (slideIndex >= slides.length) {
                slideIndex = 0;
            }
            
            if (slideIndex < 0) {
                slideIndex = slides.length - 1;
            }
            
            showSlides(slideIndex);
        }
        
        // Thumbnail image controls
        window.currentSlide = function(n) {
            slideIndex = n;
            showSlides(slideIndex);
        }
        
        // Add click listeners to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide(index);
            });
        });
        
        // Auto slide
        let slideInterval = setInterval(() => {
            plusSlides(1);
        }, 5000);
        
        // Pause auto slide on hover
        document.querySelector('.slider-container').addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        document.querySelector('.slider-container').addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                plusSlides(1);
            }, 5000);
        });
        
        // Initialize the slider
        showSlides(slideIndex);
    }
    
    
    // Active nav link highlighting based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollPosition = window.scrollY + 100; // Offset for header height
    
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (correspondingNavLink) {
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    correspondingNavLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    // Call once on page load to set active link
    highlightNavLink();

    // Google Reviews Integration - DeNiro's Barbers
    if (typeof loadGoogleReviews === 'function') {
        loadGoogleReviews();
    }


    // Notification System
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10001;
            font-weight: 500;
            max-width: 300px;
            transform: translateX(350px);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(350px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }

    // Enhanced Gallery Lightbox with Navigation
    let currentLightboxIndex = 0;
    const galleryImages = document.querySelectorAll('.gallery-img');

    galleryImages.forEach((item, index) => {
        item.parentElement.addEventListener('click', function() {
            currentLightboxIndex = index;
            openLightbox(item.getAttribute('src'));
        });
    });

    function openLightbox(imgSrc) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        lightbox.innerHTML = `
            <div style="position: relative; max-width: 90%; max-height: 90%; display: flex; align-items: center;">
                <button class="lightbox-prev" style="position: absolute; left: -50px; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.2); border: none; color: white; font-size: 24px; padding: 10px 15px; cursor: pointer; border-radius: 4px; z-index: 10001;">&lt;</button>
                <img src="${imgSrc}" style="max-width: 100%; max-height: 90vh; display: block; border-radius: 4px;">
                <button class="lightbox-next" style="position: absolute; right: -50px; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.2); border: none; color: white; font-size: 24px; padding: 10px 15px; cursor: pointer; border-radius: 4px; z-index: 10001;">&gt;</button>
                <span class="lightbox-close" style="position: absolute; top: -40px; right: 0; font-size: 30px; color: white; cursor: pointer; z-index: 10001;">&times;</span>
                <div class="lightbox-counter" style="position: absolute; bottom: -30px; left: 50%; transform: translateX(-50%); color: white; font-size: 14px;">${currentLightboxIndex + 1} / ${galleryImages.length}</div>
            </div>
        `;

        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';

        // Fade in
        setTimeout(() => {
            lightbox.style.opacity = '1';
        }, 10);

        // Navigation
        lightbox.querySelector('.lightbox-prev').addEventListener('click', () => {
            currentLightboxIndex = currentLightboxIndex === 0 ? galleryImages.length - 1 : currentLightboxIndex - 1;
            const newSrc = galleryImages[currentLightboxIndex].getAttribute('src');
            lightbox.querySelector('img').src = newSrc;
            lightbox.querySelector('.lightbox-counter').textContent = `${currentLightboxIndex + 1} / ${galleryImages.length}`;
        });

        lightbox.querySelector('.lightbox-next').addEventListener('click', () => {
            currentLightboxIndex = currentLightboxIndex === galleryImages.length - 1 ? 0 : currentLightboxIndex + 1;
            const newSrc = galleryImages[currentLightboxIndex].getAttribute('src');
            lightbox.querySelector('img').src = newSrc;
            lightbox.querySelector('.lightbox-counter').textContent = `${currentLightboxIndex + 1} / ${galleryImages.length}`;
        });

        // Close lightbox
        function closeLightbox() {
            lightbox.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
            }, 300);
        }

        lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') lightbox.querySelector('.lightbox-prev').click();
            if (e.key === 'ArrowRight') lightbox.querySelector('.lightbox-next').click();
        });
    }

    // Performance Optimization - Lazy Loading
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Enhanced Error Handling
    window.addEventListener('error', function(e) {
        console.error('An error occurred:', e.error);
        // Could send error reports to analytics service here
    });

    // Service Worker Registration for PWA (if service worker exists)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('ServiceWorker registration successful');
                })
                .catch(function(err) {
                    console.log('ServiceWorker registration failed');
                });
        });
    }
});

// Google Reviews Loading Function
async function loadGoogleReviews() {
    const reviewsGrid = document.getElementById('google-reviews-grid');
    const avgRatingEl = document.getElementById('google-avg-rating');
    const reviewCountEl = document.getElementById('google-review-count');
    const starsEl = document.getElementById('google-stars');

    try {
        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Demo reviews data - replace with actual Google Places API integration
        const reviewsData = {
            average_rating: 4.8,
            total_reviews: 47,
            reviews: [
                {
                    author_name: "James Mitchell",
                    rating: 5,
                    text: "Absolutely brilliant service! Bendi gave me the best haircut I've had in years. The attention to detail is incredible and the shop has such a professional atmosphere.",
                    time: "2 weeks ago",
                    profile_photo_url: "https://ui-avatars.com/api/?name=James+Mitchell&background=c59d5f&color=fff"
                },
                {
                    author_name: "Sarah Thompson",
                    rating: 5,
                    text: "Took my 6-year-old son here and they were so patient with him. Ali made the whole experience fun and my son actually enjoyed getting his haircut for the first time!",
                    time: "1 month ago",
                    profile_photo_url: "https://ui-avatars.com/api/?name=Sarah+Thompson&background=c59d5f&color=fff"
                },
                {
                    author_name: "David Richards",
                    rating: 5,
                    text: "I've been coming to DeNiro's for over 2 years now. Consistently excellent service, great atmosphere, and they really know how to handle different hair types. Highly recommend!",
                    time: "3 weeks ago",
                    profile_photo_url: "https://ui-avatars.com/api/?name=David+Richards&background=c59d5f&color=fff"
                },
                {
                    author_name: "Michael Foster",
                    rating: 5,
                    text: "The best barbershop in Penge! Professional service, clean environment, and the staff really care about getting your cut just right. The hot towel shave is amazing too.",
                    time: "1 week ago",
                    profile_photo_url: "https://ui-avatars.com/api/?name=Michael+Foster&background=c59d5f&color=fff"
                }
            ]
        };

        // Update average rating and count
        avgRatingEl.textContent = reviewsData.average_rating;
        reviewCountEl.textContent = `Based on ${reviewsData.total_reviews} reviews`;

        // Update stars based on rating
        updateStarsDisplay(starsEl, reviewsData.average_rating);

        // Clear loading state and add reviews
        reviewsGrid.innerHTML = '';

        reviewsData.reviews.forEach(review => {
            const reviewElement = createReviewElement(review);
            reviewsGrid.appendChild(reviewElement);
        });

    } catch (error) {
        console.error('Error loading Google reviews:', error);

        // Show error state
        reviewsGrid.innerHTML = `
            <div class="reviews-error">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Unable to load reviews at the moment.</p>
                <p>Please visit our <a href="https://maps.app.goo.gl/your-google-business-link" target="_blank">Google Business page</a> to see all reviews.</p>
            </div>
        `;

        reviewCountEl.textContent = 'Based on 47+ reviews';
    }
}

function createReviewElement(review) {
    const reviewDiv = document.createElement('div');
    reviewDiv.className = 'google-review';

    const starsHtml = generateStars(review.rating);

    reviewDiv.innerHTML = `
        <div class="google-review-header">
            <img src="${review.profile_photo_url}" alt="${review.author_name} Avatar" class="google-reviewer-avatar">
            <div class="google-reviewer-info">
                <div class="google-reviewer-name">${review.author_name}</div>
                <div class="google-review-date">${review.time}</div>
            </div>
        </div>
        <div class="google-review-rating">
            ${starsHtml}
        </div>
        <p class="google-review-text">${review.text}</p>
    `;

    return reviewDiv;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    let starsHtml = '';

    for (let i = 0; i < 5; i++) {
        starsHtml += '<span class="star">★</span>';
    }

    return starsHtml;
}

function updateStarsDisplay(starsElement, rating) {
    const stars = starsElement.querySelectorAll('.star');
    const fullStars = Math.floor(rating);

    stars.forEach((star, index) => {
        if (index < fullStars) {
            star.style.color = '#FBBC05';
        } else {
            star.style.color = '#ddd';
        }
    });
}