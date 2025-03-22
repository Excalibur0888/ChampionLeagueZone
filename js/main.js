// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const body = document.body;
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
            body.classList.toggle('menu-open');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = mainNav.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                body.classList.remove('menu-open');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu after clicking a link
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    if (mobileMenuToggle) {
                        mobileMenuToggle.classList.remove('active');
                    }
                    body.classList.remove('menu-open');
                }
            }
        });
    });
    
    // Simple testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    const testimonialSlider = document.querySelector('.testimonials-slider');
    
    if (testimonials.length > 0 && testimonialSlider) {
        // Add automatic scrolling for testimonials on desktop
        let scrollInterval;
        let currentScroll = 0;
        let direction = 1;
        
        // Only enable auto-scroll on larger screens
        function handleAutoScroll() {
            if (window.innerWidth > 768) {
                startAutoScroll();
            } else {
                stopAutoScroll();
            }
        }
        
        function startAutoScroll() {
            if (scrollInterval) clearInterval(scrollInterval);
            
            scrollInterval = setInterval(() => {
                if (!testimonialSlider) return;
                
                // Change direction when reaching the end
                if (currentScroll >= testimonialSlider.scrollWidth - testimonialSlider.clientWidth) {
                    direction = -1;
                } else if (currentScroll <= 0) {
                    direction = 1;
                }
                
                currentScroll += direction * 1;
                testimonialSlider.scrollLeft = currentScroll;
            }, 20);
        }
        
        function stopAutoScroll() {
            if (scrollInterval) {
                clearInterval(scrollInterval);
                scrollInterval = null;
            }
        }
        
        // Pause auto-scroll when hovering
        if (testimonialSlider) {
            testimonialSlider.addEventListener('mouseenter', stopAutoScroll);
            testimonialSlider.addEventListener('mouseleave', () => {
                if (window.innerWidth > 768) {
                    startAutoScroll();
                }
            });
        }
        
        // Initialize based on screen size
        handleAutoScroll();
        
        // Update on window resize
        window.addEventListener('resize', handleAutoScroll);
    }
    
    // Animate elements when they come into view
    const animatedElements = document.querySelectorAll('.feature-box, .hero-content, .hero-image, .overview-content, .overview-image, .team-member, .stat-box, .next-step-box');
    
    if ('IntersectionObserver' in window) {
        const appearOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -100px 0px"
        };
        
        const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('appear');
                appearOnScroll.unobserve(entry.target);
            });
        }, appearOptions);
        
        animatedElements.forEach(element => {
            element.classList.add('animate');
            appearOnScroll.observe(element);
        });
    } else {
        // Fallback for browsers that don't support Intersection Observer
        animatedElements.forEach(element => {
            element.classList.add('appear');
        });
    }
    
    // Tabs functionality for Game Highlights section
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    if (tabButtons.length > 0 && tabPanels.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and panels
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabPanels.forEach(panel => panel.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Show corresponding panel
                const tabId = button.getAttribute('data-tab');
                const targetPanel = document.getElementById(tabId);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    }
    
    // FAQ Accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            
            // Toggle active class on the FAQ item
            faqItem.classList.toggle('active');
            
            // Toggle visibility of the answer
            if (faqItem.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
            
            // Close other open items
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    const otherItem = otherQuestion.parentElement;
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    
                    otherItem.classList.remove('active');
                    otherAnswer.style.maxHeight = '0';
                }
            });
        });
    });
    
    // Update news dates to use the current date
    const newsDateElements = document.querySelectorAll('.news-date');
    if (newsDateElements.length > 0) {
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June', 
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        const today = new Date();
        
        newsDateElements.forEach((dateElement, index) => {
            // Calculate date: today for first news, then 5 and 12 days earlier for others
            const daysToSubtract = index * 7; // Space news 7 days apart
            const newsDate = new Date(today);
            newsDate.setDate(today.getDate() - daysToSubtract);
            
            // Format the date like "June 10, 2025"
            const month = months[newsDate.getMonth()];
            const day = newsDate.getDate();
            const year = newsDate.getFullYear();
            
            dateElement.textContent = `${month} ${day}, ${year}`;
        });
    }
}); 