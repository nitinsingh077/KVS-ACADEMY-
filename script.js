// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Add active class to nav items based on scroll position
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLi.forEach(li => {
        li.classList.remove('active');
        if (li.getAttribute('href') === `#${current}`) {
            li.classList.add('active');
        }
    });
});

// Add animation to elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .course-card, .testimonial, .footer-content > div');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
};

// Run animation function when DOM is loaded
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Simple carousel for testimonials on smaller screens
const createMobileCarousel = () => {
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length <= 1) return;
    
    let currentIndex = 0;
    
    const showTestimonial = (index) => {
        testimonials.forEach((testimonial, i) => {
            if (i === index) {
                testimonial.style.display = 'block';
                testimonial.classList.add('active');
            } else {
                testimonial.style.display = 'none';
                testimonial.classList.remove('active');
            }
        });
    };
    
    // Show only the first testimonial initially on mobile
    const handleResize = () => {
        if (window.innerWidth < 768) {
            showTestimonial(currentIndex);
        } else {
            // On desktop, show all testimonials
            testimonials.forEach(testimonial => {
                testimonial.style.display = 'block';
            });
        }
    };
    
    // Auto advance the carousel
    const autoAdvance = () => {
        if (window.innerWidth < 768) {
            currentIndex = (currentIndex + 1) % testimonials.length;
            showTestimonial(currentIndex);
        }
    };
    
    // Initial setup
    handleResize();
    
    // Set up interval for auto-advancing
    setInterval(autoAdvance, 5000);
    
    // Listen for window resize
    window.addEventListener('resize', handleResize);
};

// Create mobile carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', createMobileCarousel);

// Add interactive elements to course cards
const courseCards = document.querySelectorAll('.course-card');

courseCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.course-icon img');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            setTimeout(() => {
                icon.style.transform = 'scale(1) rotate(0)';
            }, 300);
        }
    });
});

// Create rainbow effect on section headers
const createRainbowEffect = () => {
    const rainbows = document.querySelectorAll('.rainbow-underline');
    
    rainbows.forEach(rainbow => {
        rainbow.style.backgroundPosition = '0px';
        
        // Animate the gradient
        let position = 0;
        setInterval(() => {
            position -= 1;
            rainbow.style.backgroundPosition = `${position}px 0`;
        }, 50);
    });
};

document.addEventListener('DOMContentLoaded', createRainbowEffect);

// Add confetti effect when clicking the "Enroll Now" button
const enrollButton = document.querySelector('.cta .btn.primary.large');

if (enrollButton) {
    enrollButton.addEventListener('click', (e) => {
        // Simple confetti effect
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random position, color, and size
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.top = `${e.clientY - 20}px`;
            confetti.style.backgroundColor = ['var(--primary)', 'var(--secondary)', 'var(--accent)', 'var(--purple)', 'var(--blue)'][Math.floor(Math.random() * 5)];
            confetti.style.width = `${Math.random() * 10 + 5}px`;
            confetti.style.height = `${Math.random() * 10 + 5}px`;
            
            document.body.appendChild(confetti);
            
            // Animate falling
            const animation = confetti.animate([
                { transform: 'translateY(0) rotate(0)', opacity: 1 },
                { transform: `translateY(${Math.random() * 200 + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 1000 + 1000,
                easing: 'cubic-bezier(0, .9, .57, 1)',
                fill: 'forwards'
            });
            
            // Remove confetti element after animation
            animation.onfinish = () => {
                confetti.remove();
            };
        }
    });
}

// Add CSS for the confetti
const style = document.createElement('style');
style.textContent = `
    .confetti {
        position: fixed;
        z-index: 1000;
        border-radius: 50%;
        pointer-events: none;
    }
    
    .animated {
        animation: fadeUp 0.6s ease forwards;
    }
    
    @keyframes fadeUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Navigation functionality
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            
            // Remove active class from all links
            navLinksItems.forEach(item => item.classList.remove('active'));
            // Add active class to clicked link
            link.classList.add('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });

    // Add smooth scrolling to all navigation links
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
            }
        });
    });
});

// Add scroll-based active state for navigation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links li a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Add WhatsApp floating button
document.addEventListener('DOMContentLoaded', function() {
    // Create WhatsApp button element
    const whatsappButton = document.createElement('div');
    whatsappButton.className = 'whatsapp-btn';
    whatsappButton.innerHTML = '<i class="fab fa-whatsapp"></i>';
    document.body.appendChild(whatsappButton);
    
    // Add click event to WhatsApp button
    whatsappButton.addEventListener('click', function() {
        const message = "Hello, I'm interested in KVS Academy services.";
        sendToWhatsApp(message);
    });
    
    // Create modal for quick contact
    const modalHTML = `
    <div class="contact-modal" id="contactModal">
        <div class="modal-content">
            <span class="modal-close" id="modalClose">&times;</span>
            <h2 class="modal-title">Quick Contact</h2>
            <form id="modalContactForm">
                <div class="form-group">
                    <input type="text" name="modalName" placeholder="Your Name" required>
                </div>
                <div class="form-group">
                    <input type="tel" name="modalPhone" placeholder="Your Phone Number" required>
                </div>
                <div class="form-group">
                    <textarea name="modalMessage" placeholder="How can we help you?" required></textarea>
                </div>
                <button type="submit" class="btn primary">Send Message</button>
            </form>
            <div id="modalFormMessage" class="form-message"></div>
        </div>
    </div>`;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Modal functionality
    const contactModal = document.getElementById('contactModal');
    const modalClose = document.getElementById('modalClose');
    const contactNowBtn = document.getElementById('contactButton');
    
    if (contactNowBtn) {
        contactNowBtn.addEventListener('click', function() {
            contactModal.classList.add('active');
        });
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            contactModal.classList.remove('active');
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === contactModal) {
            contactModal.classList.remove('active');
        }
    });
    
    // Modal contact form submission
    const modalContactForm = document.getElementById('modalContactForm');
    if (modalContactForm) {
        modalContactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const formData = new FormData(modalContactForm);
            const formDataObj = {};
            
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            const message = `Quick Contact Request:
Name: ${formDataObj.modalName}
Phone: ${formDataObj.modalPhone}
Message: ${formDataObj.modalMessage}`;
            
            sendToWhatsApp(message);
            
            const modalFormMessage = document.getElementById('modalFormMessage');
            modalFormMessage.textContent = "Message sent successfully! We'll contact you shortly.";
            modalFormMessage.className = "form-message success";
            
            modalContactForm.reset();
            
            // Auto close modal after success
            setTimeout(function() {
                contactModal.classList.remove('active');
                modalFormMessage.className = "form-message";
                modalFormMessage.textContent = "";
            }, 3000);
        });
    }
    
    // Enrollment form handling
    const enrollmentForm = document.getElementById('enrollmentForm');
    if (enrollmentForm) {
        enrollmentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get all form data
            const formData = new FormData(enrollmentForm);
            const formDataObj = {};
            
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            // Prepare message for WhatsApp
            const message = `New Enrollment Request:
Student Name: ${formDataObj.studentName}
Age: ${formDataObj.age}
Parent's Name: ${formDataObj.parentName}
Email: ${formDataObj.email}
Phone: ${formDataObj.phone}
Course: ${formDataObj.course}`;
            
            // Send to WhatsApp
            sendToWhatsApp(message);
            
            // Show success message
            const successMessage = document.getElementById('successMessage');
            if (successMessage) {
                enrollmentForm.style.display = 'none';
                successMessage.classList.add('show');
            }
        });
    }
    
    // Contact form in footer handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const formData = new FormData(contactForm);
            const formDataObj = {};
            
            formData.forEach((value, key) => {
                formDataObj[key] = value;
            });
            
            const message = `Contact Form Submission:
Name: ${formDataObj.contactName}
Email: ${formDataObj.contactEmail}
Phone: ${formDataObj.contactPhone}
Message: ${formDataObj.contactMessage}`;
            
            sendToWhatsApp(message);
            
            // Create a success message
            const formMessage = document.createElement('div');
            formMessage.className = 'form-message success';
            formMessage.textContent = 'Message sent successfully! We will get back to you soon.';
            
            // Append message after form
            contactForm.parentNode.insertBefore(formMessage, contactForm.nextSibling);
            
            // Reset form
            contactForm.reset();
            
            // Remove message after 5 seconds
            setTimeout(function() {
                formMessage.remove();
            }, 5000);
        });
    }
    
    // Make phone and email elements clickable
    const phoneElement = document.querySelector('.footer-contact .phone');
    if (phoneElement) {
        phoneElement.addEventListener('click', function() {
            const phoneNumber = phoneElement.textContent.replace(/[^0-9+]/g, '');
            window.open(`tel:${phoneNumber}`);
        });
    }
    
    const emailElement = document.querySelector('.footer-contact .email');
    if (emailElement) {
        emailElement.addEventListener('click', function() {
            const email = emailElement.textContent.replace(/[^a-zA-Z0-9@._-]/g, '');
            window.open(`mailto:${email}`);
        });
    }
});

// Function to send data to WhatsApp
function sendToWhatsApp(message) {
    // Format your phone number with country code
    const phoneNumber = '+919125718855'; // Your contact number with country code
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappURL, '_blank');
}

// Function to handle contact requests
function sendContactRequest(requestType) {
    const message = `Contact Request from KVS Academy Website:
Request Type: ${requestType}
Date: ${new Date().toLocaleString()}`;
    
    sendToWhatsApp(message);
}

// Add creator credit toast notification
function showCreatorCredit() {
    // Remove existing toast if present
    const existingToast = document.getElementById('creator-toast');
    if (existingToast) {
        existingToast.remove();
    }
    
    // Create toast element
    const toast = document.createElement('div');
    toast.id = 'creator-toast';
    toast.className = 'creator-toast';
    toast.innerHTML = `
        <div class="creator-toast-content">
            <i class="fas fa-code"></i>
            <span>Created by Nitin Singh</span>
        </div>
    `;
    
    // Add to body
    document.body.appendChild(toast);
    
    // Show animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        // Remove after animation
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 3000);
}

// Add creator credit CSS
const creatorStyle = document.createElement('style');
creatorStyle.textContent = `
    .creator-toast {
        position: fixed;
        bottom: -60px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(var(--dark-rgb), 0.9);
        color: white;
        padding: 10px 20px;
        border-radius: 30px;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
    
    .creator-toast.show {
        bottom: 20px;
    }
    
    .creator-toast-content {
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: 'Bubblegum Sans', cursive;
    }
    
    .creator-toast i {
        color: var(--accent);
    }
`;
document.head.appendChild(creatorStyle);

// Show creator credit on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add watermark to all pages
    const watermark = document.createElement('div');
    watermark.className = 'creator-watermark';
    watermark.innerHTML = 'Created by Nitin Singh';
    document.body.appendChild(watermark);
    
    // Show creator credit on page load
    showCreatorCredit();
    
    // Add click listeners to all buttons and links
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('click', function(event) {
            // Don't show for modal close or navigation toggle
            if (this.className.includes('modal-close') || 
                this.className.includes('hamburger') ||
                this.parentElement.className.includes('nav-links')) {
                return;
            }
            
            // Show creator toast
            showCreatorCredit();
        });
    });
}); 