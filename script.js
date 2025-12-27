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
}

// الانتظار حتى تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
    
    // تهيئة عداد الزيارات
    new VisitCounter();
    
    // تبديل القائمة في الجوال
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // أنيميشن الهامبرجر
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }
    
    // إغلاق القائمة عند النقر على رابط
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // أنيميشن الأرقام عند التمرير
    const statNumbers = document.querySelectorAll('.stat-number');
    const animateNumbers = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-count'));
            const duration = 2000; // مدة الأنيميشن بالمللي ثانية
            const increment = target / (duration / 16); // 60fps
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current);
            }, 16);
        });
    };
    
    // تفعيل أنيميشن الأرقام عند الوصول للقسم
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(statsSection);
    }
    
    // أنيميشن التمرير السلس
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
    
    // تأثير ظهور العناصر عند التمرير
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
    
    // تطبيق المراقبة على العناصر
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .contact-item, .feature-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // تأثير typing للنص الرئيسي
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.borderLeft = '3px solid var(--gold-color)';
        heroTitle.style.paddingLeft = '10px';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                heroTitle.style.borderLeft = 'none';
                heroTitle.style.paddingLeft = '0';
            }
        };
        
        // بدء التأثير بعد تحميل الصفحة
        setTimeout(typeWriter, 500);
    }
    
    // تأثير parallax للأشكال العائمة
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.2);
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
    
    // تأثيرات على البطاقات عمران الفأرة
    const cards = document.querySelectorAll('.service-card, .portfolio-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // تأثيرات على الأزرار
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-login, .btn-register, .btn-submit');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // إنشاء تأثير ripple
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
    
    // تأثيرات على شريط البحث
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', function() {
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                // هنا يمكنك إضافة منطق البحث
                console.log('Searching for:', searchTerm);
                
                // تأثير بصري
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });
    }
    
    // تأثيرات على النماذج
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // إضافة تأثير تحميل
            const submitBtn = this.querySelector('.btn-submit');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'جاري التحميل...';
                submitBtn.disabled = true;
                
                // محاكاة الإرسال
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // رسالة نجاح
                    showNotification('تم الإرسال بنجاح!', 'success');
                }, 2000);
            }
        });
    });
    
    // دالة إظهار الإشعارات
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
    
    // تأثيرات إضافية للصفحات الداخلية
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle) {
        pageTitle.style.opacity = '0';
        pageTitle.style.transform = 'translateY(-30px)';
        
        setTimeout(() => {
            pageTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            pageTitle.style.opacity = '1';
            pageTitle.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // تأثيرات على الحقول عند التركيز
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // تأثيرات على الأيقونات الاجتماعية
    const socialIcons = document.querySelectorAll('.social-icons a');
    socialIcons.forEach((icon, index) => {
        icon.style.opacity = '0';
        icon.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            icon.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            icon.style.opacity = '1';
            icon.style.transform = 'translateY(0)';
        }, 1000 + (index * 100));
    });
    
    console.log('تم تحميل جميع التأثيرات بنجاح!');
});