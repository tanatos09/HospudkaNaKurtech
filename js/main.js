/**
 * Hospůdka na Kurtech - Main JavaScript
 * Inicializace, animace a interaktivita
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('🍺 Hospůdka na Kurtech - Web inicializován');

    // Inicializace všech modulů
    initializeStatus();
    initializeScrollAnimations();
    initializeHeaderScroll();
    initializeSmoothScroll();
});

/**
 * Určení, jestli je hospoda otevřena/zavřena
 */
function initializeStatus() {
    const statusElement = document.getElementById('status-text');
    const indicator = document.querySelector('.status__indicator');
    const statusWrapper = document.getElementById('status');
    
    if (!statusElement) return;

    const now = new Date();
    const day = now.getDay();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours * 60 + minutes;

    let isOpen = false;

    // Otevírací doba:
    // Po-Pá: 14:00 – 23:00 (840 - 1380 minut)
    // So-Ne: 12:00 – 23:00 (720 - 1380 minut)

    if (day >= 1 && day <= 5) {
        // Pondělí - pátek
        isOpen = currentTime >= 840 && currentTime <= 1380;
    } else if (day === 0 || day === 6) {
        // Sobota - neděle
        isOpen = currentTime >= 720 && currentTime <= 1380;
    }

    // Aktualizuj status
    if (isOpen) {
        statusElement.textContent = 'Právě otevřeno';
        if (indicator) {
            indicator.style.backgroundColor = 'var(--color-success)';
            indicator.style.boxShadow = '0 0 10px var(--color-success)';
        }
        if (statusWrapper) {
            statusWrapper.style.borderColor = 'var(--color-success)';
            statusWrapper.style.background = 'rgba(16, 185, 129, 0.2)';
        }
    } else {
        statusElement.textContent = 'Momentálně zavřeno';
        if (indicator) {
            indicator.style.backgroundColor = '#ef4444';
            indicator.style.boxShadow = '0 0 10px #ef4444';
            indicator.style.animation = 'none';
        }
        if (statusWrapper) {
            statusWrapper.style.borderColor = '#ef4444';
            statusWrapper.style.background = 'rgba(239, 68, 68, 0.2)';
        }
    }
}

/**
 * Animace elementů při scrollování (Intersection Observer)
 */
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right');
    
    if (animatedElements.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Přidáme malé zpoždění pro kaskádový efekt
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
                
                // Přestaneme sledovat již animovaný element
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Změna stylu headeru při scrollování
 */
function initializeHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateHeader = () => {
        const scrollY = window.scrollY;
        
        // Přidej/odeber třídu pro scrollovaný stav
        if (scrollY > 50) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
        
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }, { passive: true });
}

/**
 * Plynulé scrollování na kotvy
 */
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Ignoruj prázdné kotvy nebo jen #
            if (href === '#' || href === '') return;
            
            const target = document.querySelector(href);
            if (!target) return;
            
            e.preventDefault();
            
            // Zavři mobilní menu pokud je otevřené
            const nav = document.querySelector('.header__nav');
            const burger = document.querySelector('.header__burger');
            if (nav && nav.classList.contains('nav--open')) {
                nav.classList.remove('nav--open');
                burger?.classList.remove('burger--open');
            }
            
            // Scrolluj na cíl
            const headerHeight = document.querySelector('.header')?.offsetHeight || 70;
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * Lazy loading pro obrázky (fallback pro starší prohlížeče)
 */
if ('loading' in HTMLImageElement.prototype) {
    // Nativní lazy loading je podporován
    console.log('Nativní lazy loading aktivní');
} else {
    // Fallback pro starší prohlížeče
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
}