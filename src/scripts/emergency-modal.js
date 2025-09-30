// Notificaciones - exportada como módulo
export function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 1100;
        font-weight: 500;
        max-width: 300px;
        word-wrap: break-word;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        notification.style.transition = 'all 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// También exponemos la función globalmente para código no modular
if (typeof window !== 'undefined') {
    window.showEmergencyNotification = showNotification;
}

// Inicializar comportamiento del modal cuando el DOM esté listo
function lockBody() {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
}

function unlockBody() {
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
}

function setupModalBehavior() {
    const modal = document.getElementById('emergency-modal');
    if (!modal) return;

    // Ensure modal is at body level for proper stacking
    if (modal.parentElement !== document.body) {
        document.body.appendChild(modal);
    }

    const closeBtn = modal.querySelector('.close-modal');
    const modalBackdrop = modal.querySelector('.modal-backdrop');

    // Initialize modal state
    modal.style.display = 'none';
    modal.classList.remove('active');

    function showModal() {
        modal.style.display = 'block';
        // Use requestAnimationFrame to ensure display takes effect before adding active
        requestAnimationFrame(() => {
            modal.classList.add('active');
            lockBody();
        });
    }

    function hideModal() {
        modal.classList.remove('active');
        // Wait for transition before hiding
        setTimeout(() => {
            modal.style.display = 'none';
            unlockBody();
        }, 300);
    }

    // Abrir modal desde cualquier trigger
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest && e.target.closest('.emergency-button, [data-open-emergency]');
        if (trigger) {
            e.preventDefault();
            showModal();
        }
    });

    // Cerrar con click externo o botón
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.closest('.close-modal')) {
            hideModal();
        }
    });

    if (closeBtn) closeBtn.addEventListener('click', hideModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', hideModal);

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            hideModal();
        }
    });

    // No manejamos la inserción/limpieza de campos específicos aquí: lo gestiona el wizard.
    // Evitamos cualquier operación sobre #type-specific-fields para no interferir con el wizard.

    // Exponer para debug
    if (typeof window !== 'undefined') {
        window.__SESEC_EMERGENCY = {
            showModal: () => document.getElementById('emergency-modal')?.classList.add('active'),
            hideModal: () => document.getElementById('emergency-modal')?.classList.remove('active')
        };
    }
}

// If the modal isn't in the DOM yet (e.g. injected by client:load), wait for it with a MutationObserver
function ensureModalSetup() {
    const modal = document.getElementById('emergency-modal');
    if (modal) {
        setupModalBehavior();
        return;
    }

    // Wait for the modal to be added to the DOM
    const observer = new MutationObserver((mutations, obs) => {
        const m = document.getElementById('emergency-modal');
        if (m) {
            obs.disconnect();
            setupModalBehavior();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureModalSetup);
} else {
    ensureModalSetup();
}