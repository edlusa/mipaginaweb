// ============================
// PANEL DE CONTROL - FUNCIONALIDADES
// ============================

document.addEventListener('DOMContentLoaded', function() {
    inicializarPanelControl();
    inicializarNavegacionPanel();
    inicializarComponentesPanel();
});

function inicializarPanelControl() {
    console.log('Panel de Control Edlusa - Inicializado');
    
    // Cargar datos iniciales del dashboard
    cargarDatosDashboard();
    
    // Inicializar tooltips
    inicializarTooltips();
    
    // Inicializar notificaciones
    inicializarNotificacionesPanel();
}

function inicializarNavegacionPanel() {
    // Navegación entre secciones
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remover clase active de todos los items
            navItems.forEach(nav => nav.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Agregar clase active al item clickeado
            this.classList.add('active');
            
            // Mostrar sección correspondiente
            const targetSection = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            mostrarSeccion(targetSection);
        });
    });
}

function mostrarSeccion(seccionId) {
    const targetElement = document.getElementById(`seccion-${seccionId}`);
    const allSections = document.querySelectorAll('.content-section');
    
    // Ocultar todas las secciones
    allSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar sección objetivo
    if (targetElement) {
        targetElement.classList.add('active');
        
        // Cargar datos específicos de la sección
        cargarDatosSeccion(seccionId);
    }
}

function cargarDatosSeccion(seccionId) {
    switch(seccionId) {
        case 'dashboard':
            actualizarEstadisticasDashboard();
            break;
        case 'estadisticas':
            cargarGraficosEstadisticas();
            break;
        case 'perfil':
            inicializarFormularioPerfil();
            break;
        case 'servicios':
            cargarListadoServicios();
            break;
        default:
            console.log(`Sección ${seccionId} cargada`);
    }
}

function inicializarComponentesPanel() {
    // Inicializar dropdown de usuario
    const userDropdown = document.querySelector('.user-dropdown');
    if (userDropdown) {
        userDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
    
    // Cerrar dropdowns al hacer clic fuera
    document.addEventListener('click', function() {
        cerrarTodosLosDropdowns();
    });
    
    // Notificaciones
    const notificationBtn = document.getElementById('panelNotification');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', mostrarPanelNotificaciones);
    }
}

function cerrarTodosLosDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown-content');
    dropdowns.forEach(dropdown => {
        dropdown.style.opacity = '0';
        dropdown.style.visibility = 'hidden';
        dropdown.style.transform = 'translateY(-10px)';
    });
}

// ============================
// DASHBOARD Y ESTADÍSTICAS
// ============================

function cargarDatosDashboard() {
    // Simular carga de datos del dashboard
    setTimeout(() => {
        actualizarEstadisticasDashboard();
    }, 1000);
}

function actualizarEstadisticasDashboard() {
    // Aquí iría la lógica para actualizar las estadísticas
    // con datos reales del servidor
    
    console.log('Estadísticas del dashboard actualizadas');
}

function cargarGraficosEstadisticas() {
    // Simular carga de gráficos
    setTimeout(() => {
        // Aquí se inicializarían librerías de gráficos como Chart.js
        console.log('Gráficos de estadísticas cargados');
    }, 1500);
}

// ============================
// GESTIÓN DE PERFIL
// ============================

function inicializarFormularioPerfil() {
    const profileForm = document.querySelector('.profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar formulario
            if (validarFormularioPerfil()) {
                enviarFormularioPerfil(this);
            }
        });
        
        // Validación en tiempo real
        const inputs = profileForm.querySelectorAll('input[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', validarCampoPerfil);
            input.addEventListener('input', limpiarValidacionCampo);
        });
    }
}

function validarFormularioPerfil() {
    let esValido = true;
    const form = document.querySelector('.profile-form');
    const camposRequeridos = form.querySelectorAll('input[required]');
    
    camposRequeridos.forEach(campo => {
        if (!campo.value.trim()) {
            marcarCampoInvalido(campo, 'Este campo es obligatorio');
            esValido = false;
        }
    });
    
    // Validar email
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && emailInput.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            marcarCampoInvalido(emailInput, 'Por favor ingresa un email válido');
            esValido = false;
        }
    }
    
    return esValido;
}

function validarCampoPerfil(e) {
    const campo = e.target;
    limpiarValidacionCampo(e);
    
    if (campo.hasAttribute('required') && !campo.value.trim()) {
        marcarCampoInvalido(campo, 'Este campo es obligatorio');
    }
    
    if (campo.type === 'email' && campo.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(campo.value)) {
            marcarCampoInvalido(campo, 'Por favor ingresa un email válido');
        }
    }
}

function marcarCampoInvalido(campo, mensaje) {
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

function limpiarValidacionCampo(e) {
    const campo = e.target;
    campo.classList.remove('error');
    
    const errorElement = campo.parentNode.querySelector('.error-text');
    if (errorElement) {
        errorElement.remove();
    }
}

function enviarFormularioPerfil(form) {
    const formData = new FormData(form);
    const boton = form.querySelector('button[type="submit"]');
    const textoOriginal = boton.innerHTML;
    
    // Mostrar estado de carga
    boton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';
    boton.disabled = true;
    
    // Simular envío al servidor
    setTimeout(() => {
        // Aquí iría la llamada AJAX real al servidor
        
        // Simular respuesta exitosa
        mostrarNotificacionPanel('Perfil actualizado correctamente', 'success');
        
        // Restaurar botón
        boton.innerHTML = textoOriginal;
        boton.disabled = false;
        
        // Recargar datos del perfil (simulado)
        setTimeout(() => {
            window.location.reload();
        }, 1000);
        
    }, 2000);
}

// ============================
// NOTIFICACIONES DEL PANEL
// ============================

function inicializarNotificacionesPanel() {
    // Cargar notificaciones no leídas
    cargarNotificaciones();
}

function cargarNotificaciones() {
    // Simular carga de notificaciones
    setTimeout(() => {
        console.log('Notificaciones cargadas');
    }, 1000);
}

function mostrarPanelNotificaciones() {
    // Aquí se implementaría un panel modal de notificaciones
    mostrarNotificacionPanel('Funcionalidad en desarrollo', 'info');
}

function mostrarNotificacionPanel(mensaje, tipo = 'info') {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = `panel-notification-toast ${tipo}`;
    
    const iconos = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    notificacion.innerHTML = `
        <div class="notification-icon">
            <i class="fas ${iconos[tipo] || 'fa-info-circle'}"></i>
        </div>
        <div class="notification-message">
            ${mensaje}
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Estilos básicos
    notificacion.style.cssText = `
        position: fixed;
        top: 100px;
        right: 25px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        padding: 1rem 1.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 1000;
        border-left: 4px solid #3b82f6;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    // Color según tipo
    const colores = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    
    notificacion.style.borderLeftColor = colores[tipo] || colores.info;
    
    document.body.appendChild(notificacion);
    
    // Animación de entrada
    setTimeout(() => {
        notificacion.style.transform = 'translateX(0)';
    }, 100);
    
    // Botón de cerrar
    const closeBtn = notificacion.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notificacion.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notificacion.parentNode) {
                notificacion.parentNode.removeChild(notificacion);
            }
        }, 300);
    });
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        if (notificacion.parentNode) {
            notificacion.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notificacion.parentNode) {
                    notificacion.parentNode.removeChild(notificacion);
                }
            }, 300);
        }
    }, 5000);
}

// ============================
// SERVICIOS Y PROYECTOS
// ============================

function cargarListadoServicios() {
    // Simular carga de servicios activos
    setTimeout(() => {
        console.log('Listado de servicios cargado');
    }, 1000);
}

// ============================
// HERRAMIENTAS Y UTILIDADES
// ============================

function inicializarTooltips() {
    // Inicializar tooltips para elementos que los necesiten
    const elementsWithTooltip = document.querySelectorAll('[data-tooltip]');
    
    elementsWithTooltip.forEach(element => {
        element.addEventListener('mouseenter', mostrarTooltip);
        element.addEventListener('mouseleave', ocultarTooltip);
    });
}

function mostrarTooltip(e) {
    const tooltipText = this.getAttribute('data-tooltip');
    if (!tooltipText) return;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = tooltipText;
    
    document.body.appendChild(tooltip);
    
    // Posicionar tooltip
    const rect = this.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 5 + 'px';
}

function ocultarTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// ============================
// EXPORTAR FUNCIONES GLOBALES
// ============================
window.mostrarSeccion = mostrarSeccion;
window.mostrarNotificacionPanel = mostrarNotificacionPanel;