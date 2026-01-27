// Modal okno - pro potvrzovací dialogy, video embedy, apod.

class Modal {
    constructor(options = {}) {
        this.title = options.title || '';
        this.content = options.content || '';
        this.onConfirm = options.onConfirm || null;
        this.onCancel = options.onCancel || null;
        this.type = options.type || 'info'; // 'info', 'confirm', 'error', 'success'
        this.modal = null;
        this.isOpen = false;
    }

    create() {
        const modal = document.createElement('div');
        modal.className = `modal modal--${this.type}`;
        modal.innerHTML = `
            <div class="modal__content">
                ${this.title ? `<h2 class="modal__title">${this.title}</h2>` : ''}
                <div class="modal__body">${this.content}</div>
                <div class="modal__actions">
                    <button class="btn btn--secondary modal__btn-cancel">Zrušit</button>
                    <button class="btn btn--primary modal__btn-confirm">OK</button>
                </div>
                <button class="modal__close" aria-label="Zavřít">×</button>
            </div>
        `;

        const confirmBtn = modal.querySelector('.modal__btn-confirm');
        const cancelBtn = modal.querySelector('.modal__btn-cancel');
        const closeBtn = modal.querySelector('.modal__close');

        confirmBtn.addEventListener('click', () => this.confirm());
        cancelBtn.addEventListener('click', () => this.cancel());
        closeBtn.addEventListener('click', () => this.cancel());

        // Zavření kliknutím mimo modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.cancel();
            }
        });

        // Klávesa ESC
        this.escListener = (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.cancel();
            }
        };

        this.modal = modal;
        return modal;
    }

    open() {
        if (!this.modal) {
            this.create();
        }

        if (!document.body.contains(this.modal)) {
            document.body.appendChild(this.modal);
        }

        setTimeout(() => {
            this.modal.classList.add('modal--open');
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', this.escListener);
            this.isOpen = true;
        }, 0);
    }

    close() {
        if (!this.modal) return;

        this.modal.classList.remove('modal--open');
        document.body.style.overflow = '';
        document.removeEventListener('keydown', this.escListener);
        this.isOpen = false;

        setTimeout(() => {
            if (document.body.contains(this.modal)) {
                document.body.removeChild(this.modal);
            }
        }, 300);
    }

    confirm() {
        if (this.onConfirm) {
            this.onConfirm();
        }
        this.close();
    }

    cancel() {
        if (this.onCancel) {
            this.onCancel();
        }
        this.close();
    }
}

// Export pro globální použití
window.Modal = Modal;