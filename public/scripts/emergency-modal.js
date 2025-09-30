// Notificaciones
function showNotification(message, type = 'info', duration = 3000) {
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

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('emergency-modal');
    if (!modal) return;

    // Elementos del modal
    const closeBtn = modal.querySelector('.close-modal');
    const modalBackdrop = modal.querySelector('.modal-backdrop');

    // Triggers para abrir el modal
    const openTriggers = Array.from(document.querySelectorAll('.emergency-button, [data-open-emergency]'));

    function lockBody() {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    }

    function unlockBody() {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }

    function showModal() {
        modal.classList.add('active');
        lockBody();
    }

    function hideModal() {
        modal.classList.remove('active');
        unlockBody();
    }

    // Eventos para abrir el modal
    openTriggers.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            showModal();
        });
    });

    // Cerrar con el botón X
    if (closeBtn) {
        closeBtn.addEventListener('click', () => hideModal());
    }

    // Cerrar haciendo clic fuera del modal
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', () => hideModal());
    }

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            hideModal();
        }
    });

    // Nota: la inserción de campos específicos la gestiona ahora el wizard (emergency-wizard.ts)
    // para evitar duplicidades y condiciones de carrera entre listeners.

    // Exponer funciones para debug
    window.__SESEC_EMERGENCY = { showModal, hideModal };
});