// ============================
// FUNCIONALIDADES PRINCIPALES
// ============================

document.addEventListener('DOMContentLoaded', function() {
    inicializarAplicacion();
    inicializarEventListeners();
    inicializarAnimaciones();
});

function inicializarAplicacion() {
    // Mostrar notificación de éxito si existe
    const successNotification = document.getElementById('successNotification');
    if (successNotification) {
        setTimeout(() => {
            successNotification.classList.add('show');
            setTimeout(() => {
                successNotification.classList.remove('show');
            }, 5000);
        }, 1000);
    }
    
    // Inicializar tabs de servicios
    inicializarTabsServicios();
    
    // Inicializar formulario de contacto
    inicializarFormularioContacto();
    
    // Inicializar funcionalidades del modal
    inicializarModal();
}

function inicializarEventListeners() {
    // Botón de login
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', mostrarModalLogin);
    }
    
    // Scroll suave para enlaces internos
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
    
    // Efecto de scroll en header
    window.addEventListener('scroll', manejarScrollHeader);
}

function inicializarAnimaciones() {
    // Animación de aparición de elementos al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    document.querySelectorAll('.service-hero, .feature-card, .stat-card, .contact-card').forEach(el => {
        observer.observe(el);
    });
}

// ============================
// TABS DE SERVICIOS
// ============================

function inicializarTabsServicios() {
    const tabNavs = document.querySelectorAll('.tab-nav');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabNavs.forEach(tabNav => {
        tabNav.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remover clase active de todos los tabs
            tabNavs.forEach(nav => nav.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Agregar clase active al tab seleccionado
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Animación adicional
            animarCambioTab(targetTab);
        });
    });
}

function animarCambioTab(tabId) {
    const activePane = document.getElementById(tabId);
    if (activePane) {
        activePane.style.opacity = '0';
        activePane.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            activePane.style.opacity = '1';
            activePane.style.transform = 'translateY(0)';
        }, 50);
    }
}

// ============================
// FORMULARIO DE CONTACTO
// ============================

function inicializarFormularioContacto() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', manejarEnvioFormulario);
        
        // Validación en tiempo real
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validarCampo);
            input.addEventListener('input', limpiarError);
        });
    }
}

function validarCampo(e) {
    const campo = e.target;
    const valor = campo.value.trim();
    
    // Remover errores previos
    limpiarError(e);
    
    // Validaciones específicas por tipo de campo
    if (campo.type === 'email' && valor) {
        if (!esEmailValido(valor)) {
            mostrarError(campo, 'Por favor ingresa un email válido');
        }
    }
    
    if (campo.hasAttribute('required') && !valor) {
        mostrarError(campo, 'Este campo es obligatorio');
    }
}

function esEmailValido(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function mostrarError(campo, mensaje) {
    campo.classList.add('error');
    
    let errorElement = campo.parentNode.querySelector('.error-text');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-text';
        campo.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = mensaje;
    errorElement.style.color = '#ef4444';
    errorElement.style.fontSize = '0.875rem';
    errorElement.style.marginTop = '0.5rem';
}

function limpiarError(e) {
    const campo = e.target;
    campo.classList.remove('error');
    
    const errorElement = campo.parentNode.querySelector('.error-text');
    if (errorElement) {
        errorElement.remove();
    }
}

function manejarEnvioFormulario(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const datos = Object.fromEntries(formData);
    
    // Validar todos los campos antes de enviar
    let formularioValido = true;
    const camposRequeridos = form.querySelectorAll('[required]');
    
    camposRequeridos.forEach(campo => {
        if (!campo.value.trim()) {
            mostrarError(campo, 'Este campo es obligatorio');
            formularioValido = false;
        }
    });
    
    if (!formularioValido) {
        mostrarNotificacion('Por favor completa todos los campos obligatorios', 'error');
        return;
    }
    
    // Simular envío del formulario
    const boton = form.querySelector('button[type="submit"]');
    const textoOriginal = boton.innerHTML;
    
    boton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    boton.disabled = true;
    
    setTimeout(() => {
        // Simular respuesta del servidor
        mostrarNotificacion('¡Mensaje enviado con éxito! Te contactaremos pronto.', 'success');
        form.reset();
        boton.innerHTML = textoOriginal;
        boton.disabled = false;
    }, 2000);
}

// ============================
// MODAL DE LOGIN
// ============================

function inicializarModal() {
    const modal = document.getElementById('loginModal');
    const closeBtn = modal.querySelector('.modal-close');
    
    // Cerrar modal al hacer clic en la X
    closeBtn.addEventListener('click', ocultarModalLogin);
    
    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            ocultarModalLogin();
        }
    });
    
    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            ocultarModalLogin();
        }
    });
}

function mostrarModalLogin() {
    const modal = document.getElementById('loginModal');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    
    // Enfocar el primer campo del formulario
    setTimeout(() => {
        const usernameInput = modal.querySelector('#username');
        if (usernameInput) usernameInput.focus();
    }, 300);
}

function ocultarModalLogin() {
    const modal = document.getElementById('loginModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// ============================
// MANEJO DEL SCROLL
// ============================

function manejarScrollHeader() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = 'none';
        }
    }
}

// ============================
// NOTIFICACIONES
// ============================

function mostrarNotificacion(mensaje, tipo = 'info') {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = `notification ${tipo}`;
    
    const iconos = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    notificacion.innerHTML = `
        <div class="notification-content">
            <i class="fas ${iconos[tipo] || 'fa-info-circle'}"></i>
            <span>${mensaje}</span>
        </div>
    `;
    
    // Estilos según el tipo
    const colores = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    
    notificacion.style.borderLeftColor = colores[tipo] || colores.info;
    
    document.body.appendChild(notificacion);
    
    // Posicionar y mostrar
    notificacion.style.position = 'fixed';
    notificacion.style.top = '100px';
    notificacion.style.right = '25px';
    notificacion.style.zIndex = '1001';
    
    setTimeout(() => {
        notificacion.classList.add('show');
    }, 100);
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        notificacion.classList.remove('show');
        setTimeout(() => {
            if (notificacion.parentNode) {
                notificacion.parentNode.removeChild(notificacion);
            }
        }, 500);
    }, 5000);
}

// ============================
// FUNCIONES UTILITARIAS
// ============================

// Formatear números
function formatearNumero(numero) {
    return new Intl.NumberFormat('es-ES').format(numero);
}

// Debounce para optimizar eventos
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

// Throttle para optimizar eventos
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ============================
// EXPORTAR FUNCIONES GLOBALES
// ============================
window.mostrarModalLogin = mostrarModalLogin;
window.ocultarModalLogin = ocultarModalLogin;
window.mostrarNotificacion = mostrarNotificacion;