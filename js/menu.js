// Burger menu - otevírání a zavírání mobilní navigace

document.addEventListener('DOMContentLoaded', function() {
    const burgerBtn = document.querySelector('.header__burger');
    const navMenu = document.querySelector('.header__nav');

    if (!burgerBtn || !navMenu) {
        console.warn('Burger menu nebo nav nebyli nalezeny');
        return;
    }

    // Klik na burger button
    burgerBtn.addEventListener('click', function() {
        const isOpen = burgerBtn.classList.contains('burger--open');
        
        if (isOpen) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Zavření menu když uživatel klikne na odkaz
    const navLinks = navMenu.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // Zavření menu když uživatel klikne mimo menu
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnBurger = burgerBtn.contains(event.target);

        if (!isClickInsideNav && !isClickOnBurger) {
            closeMobileMenu();
        }
    });

    // Zavření menu při změně velikosti okna
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });

    // Funkce pro otevření menu
    function openMobileMenu() {
        burgerBtn.classList.add('burger--open');
        burgerBtn.setAttribute('aria-expanded', 'true');
        navMenu.classList.add('nav--open');
    }

    // Funkce pro zavření menu
    function closeMobileMenu() {
        burgerBtn.classList.remove('burger--open');
        burgerBtn.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('nav--open');
    }
});
