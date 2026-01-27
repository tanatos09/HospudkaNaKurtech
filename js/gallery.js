//zde bude galerie fotografií - lightbox, prepinani obrazku apod.
// Fotogalerie s lightbox modalem

document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.querySelector('#gallery-container');
    
    if (!galleryContainer) {
        console.warn('Galerie kontejner nenalezen');
        return;
    }

    const galleryItems = galleryContainer.querySelectorAll('.gallery-item');
    let currentImageIndex = 0;

    // Vytvoř modal prvek s lepší strukturou
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal__content">
            <button class="modal__close" aria-label="Zavřít galerii" type="button">×</button>
            <img src="" alt="" class="modal__image" loading="lazy">
            <button class="modal__nav modal__nav--prev" aria-label="Předchozí fotka" type="button">❮</button>
            <button class="modal__nav modal__nav--next" aria-label="Další fotka" type="button">❯</button>
        </div>
    `;
    document.body.appendChild(modal);

    const modalImage = modal.querySelector('.modal__image');
    const closeBtn = modal.querySelector('.modal__close');
    const prevBtn = modal.querySelector('.modal__nav--prev');
    const nextBtn = modal.querySelector('.modal__nav--next');
    const modalContent = modal.querySelector('.modal__content');

    // Otevři modal s konkrétní fotkou
    function openModal(index) {
        currentImageIndex = (index + galleryItems.length) % galleryItems.length;
        const item = galleryItems[currentImageIndex];
        const img = item.querySelector('.gallery-item__image');
        const caption = item.querySelector('.gallery-item__caption');


        modalImage.src = img.src;
        modalImage.alt = img.alt || 'Fotografie z galerie';
        modalImage.title = caption ? caption.textContent : '';
        
        modal.classList.add('modal--open');
        document.body.style.overflow = 'hidden';
    }

    // Zavři modal
    function closeModal() {
        modal.classList.remove('modal--open');
        document.body.style.overflow = '';
    }

    // Klik na fotky v galerii
    galleryItems.forEach((item, index) => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            openModal(index);
        });
        // Přidej ARIA pro lepší přístupnost
        item.setAttribute('role', 'button');
        item.setAttribute('tabindex', '0');
        item.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(index);
            }
        });
    });

    // Zavírací tlačítko
    closeBtn.addEventListener('click', closeModal);

    // Navigace
    prevBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        openModal(currentImageIndex - 1);
    });

    nextBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        openModal(currentImageIndex + 1);
    });

    // Zavření kliknutím na pozadí
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Klávesové zkratky
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('modal--open')) return;

        switch(e.key) {
            case 'Escape':
                closeModal();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                openModal(currentImageIndex - 1);
                break;
            case 'ArrowRight':
                e.preventDefault();
                openModal(currentImageIndex + 1);
                break;
        }
    });

    // Swipe na mobilech - vylepšené
    let touchStartX = 0;
    let touchStartY = 0;
    
    modal.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
    }, { passive: true });

    modal.addEventListener('touchend', function(e) {
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        
        // Kontroluj, aby swipe byl spíš horizontální než vertikální
        if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > 50) {
                // Swipe vlevo -> další fotka
                openModal(currentImageIndex + 1);
            } else if (diffX < -50) {
                // Swipe vpravo -> předchozí fotka
                openModal(currentImageIndex - 1);
            }
        }
    }, { passive: true });
});