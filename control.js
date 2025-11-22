// ===== JAVASCRIPT EXCLUSIVO DEL PANEL DE CONTROL =====

// Funciones para navegación entre secciones
function mostrarSeccion(seccion) {
    // Ocultar todas las secciones
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    const seccionElement = document.getElementById(`seccion-${seccion}`);
    if (seccionElement) {
        seccionElement.classList.add('active');
    }
    
    // Actualizar navegación activa en sidebar
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Marcar como activo el item clickeado
    if (event && event.target.closest('.nav-item')) {
        event.target.closest('.nav-item').classList.add('active');
    }
    
    // Cerrar dropdown si está abierto
    cerrarDropdowns();
    
    // Scroll al inicio del contenido
    const panelContent = document.querySelector('.panel-content');
    if (panelContent) {
        panelContent.scrollTop = 0;
    }
}

// Gestión de dropdowns
function cerrarDropdowns() {
    document.querySelectorAll('.dropdown-content').forEach(dropdown => {
        dropdown.classList.remove('show');
    });
}

// Sistema de notificaciones
function mostrarNotificacion() {
    // Aquí puedes implementar un sistema de notificaciones más complejo
    const notificaciones = [
        'Nuevo mensaje de soporte',
        'Proyecto completado: Configuración Cisco',
        'Recordatorio: Reunión de seguridad mañana'
    ];
    
    alert('Tienes 3 notificaciones:\n\n• ' + notificaciones.join('\n• '));
}

// Inicialización del panel
function inicializarPanel() {
    console.log('🛡️ Panel de Control Edlusa - Inicializado');
    
    // Configurar notificaciones
    const notificationBtn = document.getElementById('panelNotification');
    if (notificationBtn) {
        notificationBtn.addEventListener('click', mostrarNotificacion);
    }
    
    // Configurar dropdown de usuario
    const userDropdown = document.querySelector('.user-dropdown');
    if (userDropdown) {
        userDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
            const dropdownContent = this.querySelector('.dropdown-content');
            dropdownContent.classList.toggle('show');
        });
    }
    
    // Cerrar dropdowns al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.user-dropdown')) {
            cerrarDropdowns();
        }
    });
    
    // Configurar enlaces del dropdown
    document.querySelectorAll('.dropdown-item[href="#"]').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            if (this.classList.contains('logout')) {
                confirmarLogout();
            } else {
                const accion = this.textContent.trim().toLowerCase();
                switch(accion) {
                    case 'mi perfil':
                        mostrarSeccion('perfil');
                        break;
                    case 'configuración':
                        mostrarSeccion('configuracion');
                        break;
                }
            }
            cerrarDropdowns();
        });
    });
    
    // Configurar formularios
    const profileForm = document.querySelector('.profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Mostrar loading
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Guardando...';
            submitBtn.disabled = true;
            
            // Simular envío (en un caso real sería AJAX)
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Mostrar mensaje de éxito
                mostrarMensaje('Perfil actualizado correctamente', 'success');
            }, 1500);
        });
    }
    
    // Efectos visuales para las tarjetas de estadísticas
    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Sistema de mensajes temporales
    window.mostrarMensaje = function(mensaje, tipo = 'info') {
        const mensajeDiv = document.createElement('div');
        mensajeDiv.className = `alert alert-${tipo} mensaje-temporal`;
        mensajeDiv.innerHTML = `
            <i class="fas fa-${tipo === 'success' ? 'check-circle' : 'info-circle'}"></i>
            ${mensaje}
        `;
        
        // Estilos para mensaje temporal
        mensajeDiv.style.position = 'fixed';
        mensajeDiv.style.top = '20px';
        mensajeDiv.style.right = '20px';
        mensajeDiv.style.zIndex = '10000';
        mensajeDiv.style.minWidth = '300px';
        mensajeDiv.style.animation = 'slideInRight 0.3s ease';
        
        document.body.appendChild(mensajeDiv);
        
        // Remover después de 5 segundos
        setTimeout(() => {
            mensajeDiv.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (mensajeDiv.parentNode) {
                    mensajeDiv.parentNode.removeChild(mensajeDiv);
                }
            }, 300);
        }, 5000);
    };
    
    // Animaciones CSS para mensajes
    if (!document.querySelector('#panel-animations')) {
        const style = document.createElement('style');
        style.id = 'panel-animations';
        style.textContent = `
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .mensaje-temporal {
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
        `;
        document.head.appendChild(style);
    }
}

// Confirmación de logout
function confirmarLogout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?\nSerás redirigido a la página principal.')) {
        // Agregar efecto de salida
        document.body.style.opacity = '0.7';
        document.body.style.transition = 'opacity 0.3s ease';
        
        setTimeout(() => {
            window.location.href = '?logout=true';
        }, 300);
    }
}

// Cargar datos del dashboard (simulado)
function cargarDatosDashboard() {
    // En una implementación real, aquí harías peticiones AJAX
    console.log('📊 Cargando datos del dashboard...');
    
    // Simular carga de datos
    setTimeout(() => {
        // Actualizar contadores, gráficos, etc.
        console.log('✅ Datos del dashboard cargados');
    }, 1000);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    inicializarPanel();
    cargarDatosDashboard();
    
    // Configurar teclas de acceso rápido
    document.addEventListener('keydown', function(e) {
        // Ctrl + D para ir al dashboard
        if (e.ctrlKey && e.key === 'd') {
            e.preventDefault();
            mostrarSeccion('dashboard');
        }
        
        // Ctrl + P para ir al perfil
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            mostrarSeccion('perfil');
        }
        
        // Escape para cerrar dropdowns
        if (e.key === 'Escape') {
            cerrarDropdowns();
        }
    });
});

// Funciones de utilidad para el panel
const PanelUtils = {
    // Formatear fechas
    formatearFecha: function(fecha) {
        return new Date(fecha).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },
    
    // Formatear números
    formatearNumero: function(numero) {
        return new Intl.NumberFormat('es-ES').format(numero);
    },
    
    // Validar email
    validarEmail: function(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    },
    
    // Generar ID único
    generarId: function() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
};

// Exportar funciones para uso global
window.mostrarSeccion = mostrarSeccion;
window.confirmarLogout = confirmarLogout;
window.PanelUtils = PanelUtils;

console.log('🚀 Panel de Control Edlusa - JavaScript cargado');