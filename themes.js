// عداد الزيارات فقط (تم إيقاف الثيمات مؤقتاً)

// عداد الزيارات
class VisitCounter {
    constructor() {
        this.storageKey = 'visitCount';
        this.lastVisitKey = 'lastVisitDate';
        this.init();
    }

    init() {
        const today = new Date().toDateString();
        const lastVisit = localStorage.getItem(this.lastVisitKey);
        
        let visitCount = parseInt(localStorage.getItem(this.storageKey)) || 0;
        
        // إذا كانت هذه أول زيارة أو زيارة جديدة في يوم مختلف
        if (!lastVisit || lastVisit !== today) {
            visitCount++;
            localStorage.setItem(this.storageKey, visitCount);
            localStorage.setItem(this.lastVisitKey, today);
        }
        
        this.updateDisplay(visitCount);
    }

    updateDisplay(count) {
        const counterElements = document.querySelectorAll('.visit-counter-number');
        counterElements.forEach(element => {
            element.textContent = count.toLocaleString();
        });
    }

    reset() {
        localStorage.removeItem(this.storageKey);
        localStorage.removeItem(this.lastVisitKey);
        this.init();
    }
}

// نظام الثيمات - تم إيقافه مؤقتاً
class ThemeManager {
    constructor() {
        // لا يقوم بأي شيء حالياً
    }

    init() {
        // لا يقوم بأي شيء حالياً
    }
}

// أنيميشن الأرقام
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateNumber = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumber(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
}

// تأثيرات التمرير
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .contact-item, .feature-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// تأثيرات على البطاقات
function initCardEffects() {
    const cards = document.querySelectorAll('.service-card, .portfolio-item, .feature-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// تأثيرات على الأزرار
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-login, .btn-register, .btn-submit');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
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
}

// تبديل القائمة في الجوال
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
}

// إشعارات
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 30px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideInDown 0.5s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutUp 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// تهيئة كل شيء عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة عداد الزيارات
    new VisitCounter();
    
    // تهيئة نظام الثيمات - معطل حالياً
    new ThemeManager();
    
    // تهيئة التأثيرات
    animateNumbers();
    initScrollAnimations();
    initCardEffects();
    initButtonEffects();
    initMobileMenu();
    
    // إضافة أنيميشن للإشعارات
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInDown {
            from {
                opacity: 0;
                transform: translate(-50%, -100%);
            }
            to {
                opacity: 1;
                transform: translate(-50%, 0);
            }
        }
        
        @keyframes slideOutUp {
            from {
                opacity: 1;
                transform: translate(-50%, 0);
            }
            to {
                opacity: 0;
                transform: translate(-50%, -100%);
            }
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.3);
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
    
    console.log('تم تحميل جميع التأثيرات بنجاح!');
});