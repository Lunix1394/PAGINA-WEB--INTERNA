// Sistema de Autenticación
const ACCESS_CODE = "SSP2026"; // Cambia este código por el que desees

document.addEventListener('DOMContentLoaded', function() {
    // Verificar si ya está autenticado
    if (sessionStorage.getItem('authenticated') === 'true') {
        showMainContent();
    }

    // Manejar el formulario de login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const enteredCode = document.getElementById('access-code').value;
            const errorMessage = document.getElementById('error-message');
            
            if (enteredCode === ACCESS_CODE) {
                sessionStorage.setItem('authenticated', 'true');
                showMainContent();
            } else {
                errorMessage.style.display = 'block';
                document.getElementById('access-code').value = '';
                document.getElementById('access-code').focus();
            }
        });
    }

    function showMainContent() {
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
        initializeMainApp();
    }

    // Función principal de la aplicación
    function initializeMainApp() {
    // Event listeners para las tarjetas
    const cards = document.querySelectorAll('.card');
    const gridMenu = document.getElementById('grid-menu');
    const contentSections = document.querySelectorAll('.content-section');
    const volverButtons = document.querySelectorAll('.btn-volver');

    // Click en tarjetas
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-id');
            mostrarSeccion(sectionId);
        });
    });

    // Click en botones "Volver"
    volverButtons.forEach(btn => {
        btn.addEventListener('click', volverAlMenu);
    });

    // Función para mostrar una sección
    function mostrarSeccion(sectionId) {
        gridMenu.style.display = 'none';
        
        contentSections.forEach(section => {
            section.style.display = 'none';
        });
        
        const section = document.getElementById(sectionId + '-section');
        if (section) {
            section.style.display = 'block';
            section.style.animation = 'fadeIn 0.5s ease-in';
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Función para volver al menú
    function volverAlMenu() {
        contentSections.forEach(section => {
            section.style.display = 'none';
        });
        gridMenu.style.display = 'grid';
        gridMenu.style.animation = 'fadeIn 0.5s ease-in';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Inyectar animación fadeIn si no existe en CSS
    if (!document.getElementById('fadeInStyle')) {
        const style = document.createElement('style');
        style.id = 'fadeInStyle';
        style.innerHTML = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
    } // Fin initializeMainApp
});