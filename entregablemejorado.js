// ===== JAVASCRIPT COMPLETO MEJORADO - PÁGINA PRINCIPAL EDLUSA =====

// Sistema principal de inicialización
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Inicializando Edlusa - Página Principal');
    
    // Inicializar todos los componentes
    initModal();
    initTabs();
    initForms();
    initAnimations();
    initNotifications();
    initContactForm();
    initSocialButtons();
    initWhatsAppFloat();
    initSmoothScroll();
    initPerformanceMonitoring();
});

// ===== SISTEMA DE MODAL MEJORADO =====
function initModal() {
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = document.getElementById('loginModal');
    const modalClose = document.querySelector('.modal-close');
    const passwordToggle = document.getElementById('passwordToggle');

    // Mostrar modal de login
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showModal(loginModal);
        });
    }

    // Cerrar modal
    if (modalClose && loginModal) {
        modalClose.addEventListener('click', function() {
            hideModal(loginModal);
        });
    }

    // Cerrar modal al hacer click fuera
    if (loginModal) {
        loginModal.addEventListener('click', function(e) {
            if (e.target === loginModal) {
                hideModal(loginModal);
            }
        });
    }

    // Cerrar modal con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[style="display: block;"]');
            if (openModal) {
                hideModal(openModal);
            }
        }
    });

    // Toggle visibilidad de contraseña
    if (passwordToggle) {
        passwordToggle.addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.className = 'fas fa-eye-slash';
                this.setAttribute('aria-label', 'Ocultar contraseña');
            } else {
                passwordInput.type = 'password';
                icon.className = 'fas fa-eye';
                this.setAttribute('aria-label', 'Mostrar contraseña');
            }
        });
    }
}

// ===== SISTEMA DE PESTAÑAS MEJORADO =====
function initTabs() {
    // Pestañas de servicios
    const serviceTabs = document.querySelectorAll('.tab-nav');
    
    serviceTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchServiceTab(tabId);
        });
        
        // Navegación por teclado
        tab.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const tabId = this.getAttribute('data-tab');
                switchServiceTab(tabId);
            }
        });
    });
}

// ===== SISTEMA DE FORMULARIOS MEJORADO =====
function initForms() {
    // Validación de formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('#loginSubmit');
            if (submitBtn) {
                submitBtn.classList.add('loading');
                
                // Simular validación
                setTimeout(() => {
                    submitBtn.classList.remove('loading');
                }, 1500);
            }
        });
    }

    // Mejorar experiencia de formularios
    const formInputs = document.querySelectorAll('.form-control, .form-input, .form-select, .form-textarea');
    formInputs.forEach(input => {
        // Efecto focus mejorado
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Validación en tiempo real
        input.addEventListener('input', function() {
            validateField(this);
        });
        
        // Limpiar errores al escribir
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

// ===== FORMULARIO DE CONTACTO MEJORADO =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    // Inicializar labels para inputs con valor
    const inputs = contactForm.querySelectorAll('.form-input, .form-select, .form-textarea');
    inputs.forEach(input => {
        if (input.value || input.tagName === 'SELECT') {
            const label = input.parentElement.querySelector('.input-label');
            if (label) {
                label.classList.add('floating');
            }
        }
        
        // Efectos de focus
        input.addEventListener('focus', function() {
            const label = this.parentElement.querySelector('.input-label');
            if (label) {
                label.classList.add('floating', 'focused');
            }
        });
        
        input.addEventListener('blur', function() {
            const label = this.parentElement.querySelector('.input-label');
            if (label) {
                label.classList.remove('focused');
                if (!this.value && this.tagName !== 'SELECT') {
                    label.classList.remove('floating');
                }
            }
        });
        
        // Validación en tiempo real
        input.addEventListener('blur', function() {
            validateContactField(this);
        });
    });

    // Manejar envío del formulario
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleContactFormSubmit(this);
    });

    // Manejar cambios en selects
    const selects = contactForm.querySelectorAll('.form-select');
    selects.forEach(select => {
        select.addEventListener('change', function() {
            validateContactField(this);
            const label = this.parentElement.querySelector('.input-label');
            if (label && this.value) {
                label.classList.add('floating');
            }
        });
    });
}

// ===== BOTÓN FLOTANTE DE WHATSAPP MEJORADO =====
function initWhatsAppFloat() {
    const whatsappFloat = document.getElementById('whatsappFloat');
    const whatsappLink = document.querySelector('.whatsapp-link');
    
    if (whatsappFloat && whatsappLink) {
        // Efecto al hacer hover
        whatsappLink.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        whatsappLink.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Efecto al hacer click
        whatsappLink.addEventListener('click', function(e) {
            // Agregar efecto visual
            whatsappFloat.classList.add('clicked');
            setTimeout(() => {
                whatsappFloat.classList.remove('clicked');
            }, 600);
            
            // Tracking
            trackSocialClick('WhatsApp', 'floating');
            
            // Mostrar notificación de confirmación
            showWhatsAppConfirmation();
        });
        
        // Mostrar/ocultar en scroll
        let lastScrollTop = 0;
        let isScrolling;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Clear our timeout throughout the scroll
            window.clearTimeout(isScrolling);
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scroll hacia abajo - ocultar
                whatsappFloat.style.opacity = '0';
                whatsappFloat.style.transform = 'translateY(100px)';
            } else {
                // Scroll hacia arriba - mostrar
                whatsappFloat.style.opacity = '1';
                whatsappFloat.style.transform = 'translateY(0)';
            }
            
            // Set a timeout to run after scrolling ends
            isScrolling = setTimeout(function() {
                // Restaurar después de dejar de hacer scroll
                whatsappFloat.style.opacity = '1';
                whatsappFloat.style.transform = 'translateY(0)';
            }, 150);
            
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        }, false);
        
        // Efecto de aparición al cargar la página
        setTimeout(() => {
            whatsappFloat.style.opacity = '1';
            whatsappFloat.style.transform = 'translateY(0)';
        }, 1000);
        
        // Efecto de atención después de 5 segundos
        setTimeout(() => {
            if (!sessionStorage.getItem('whatsappNoticed')) {
                whatsappFloat.style.animation = 'pulse 1s ease-in-out 3';
                sessionStorage.setItem('whatsappNoticed', 'true');
                
                // Mostrar tooltip la primera vez
                setTimeout(() => {
                    showNotification('💬 ¿Necesitas ayuda? Chatea con nosotros por WhatsApp', 'info');
                }, 3000);
            }
        }, 5000);
    }
}

// ===== BOTONES DE REDES SOCIALES MEJORADOS =====
function initSocialButtons() {
    // Botones de redes sociales en la sección de contacto
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Agregar efecto de click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Tracking
            const socialName = this.querySelector('.social-name')?.textContent || 'Red Social';
            trackSocialClick(socialName, 'contact_card');
        });
        
        // Efectos de hover mejorados
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Botones de contacto rápido
    const quickContactBtns = document.querySelectorAll('.quick-contact-btn');
    quickContactBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#' || this.onclick) {
                e.preventDefault();
                handleQuickContact(this);
            }
            
            // Efecto de click
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
            
            // Tracking
            const btnType = this.classList.contains('whatsapp-btn') ? 'WhatsApp' :
                          this.classList.contains('facebook-btn') ? 'Facebook' : 'Other';
            trackSocialClick(btnType, 'quick_contact');
        });
        
        // Efectos de hover
        btn.addEventListener('mouseenter', function() {
            if (!this.classList.contains('whatsapp-btn') && !this.classList.contains('facebook-btn')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            if (!this.classList.contains('whatsapp-btn') && !this.classList.contains('facebook-btn')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Botones de redes sociales en el footer
    const footerSocialLinks = document.querySelectorAll('.social-link');
    footerSocialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Tracking para footer links
            const socialName = this.querySelector('span')?.textContent || 
                             this.getAttribute('title') || 
                             'Red Social';
            trackSocialClick(socialName, 'footer');
        });
        
        // Efectos de hover para footer links
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(-3px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
}

// ===== SISTEMA DE ANIMACIONES MEJORADO =====
function initAnimations() {
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animación al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Elementos a animar
    const animatedElements = document.querySelectorAll(
        '.service-hero, .features-grid, .stat-card, .project-card, .feature-card, .social-card, .quick-contact-btn, .contact-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Efectos de hover profesionales
    const interactiveElements = document.querySelectorAll('.btn, .card, .feature-card, .project-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        el.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ===== SISTEMA DE NOTIFICACIONES MEJORADO =====
function initNotifications() {
    // Mostrar notificación de éxito si existe
    const successNotification = document.getElementById('successNotification');
    if (successNotification) {
        showNotification(successNotification);
        
        // Auto-ocultar después de 5 segundos
        setTimeout(() => {
            hideNotification(successNotification);
        }, 5000);
    }
}

// ===== SMOOTH SCROLL MEJORADO =====
function initSmoothScroll() {
    // Navegación suave mejorada
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }
            
            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Actualizar URL sin recargar
                history.pushState(null, null, href);
            }
        });
    });
}

// ===== MONITOREO DE PERFORMANCE =====
function initPerformanceMonitoring() {
    // Track page load time
    window.addEventListener('load', function() {
        const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
        console.log(`📊 Página cargada en ${loadTime}ms`);
        
        if (loadTime > 3000) {
            console.warn('⏱️ Tiempo de carga lento, considerar optimizaciones');
        }
    });
    
    // Error handling
    window.addEventListener('error', function(e) {
        console.error('❌ Error JavaScript:', e.error);
        trackEvent('Error', 'JavaScript', e.message);
    });
    
    // Offline/Online detection
    window.addEventListener('online', function() {
        showNotification('✅ Conexión restaurada', 'success');
    });
    
    window.addEventListener('offline', function() {
        showNotification('⚠️ Estás sin conexión a internet', 'error');
    });
}

// ===== FUNCIONES DE UTILIDAD MEJORADAS =====
function showModal(modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    
    // Focus management
    const focusElement = modal.querySelector('[autofocus]') || 
                       modal.querySelector('input, textarea, button') ||
                       modal.querySelector('.modal-close');
    
    if (focusElement) {
        setTimeout(() => focusElement.focus(), 100);
    }
}

function hideModal(modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.documentElement.style.overflow = 'auto';
}

function switchServiceTab(tabId) {
    // Remover clase active de todas las pestañas
    document.querySelectorAll('.tab-nav').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Agregar clase active a la pestaña clickeada
    const activeTab = document.querySelector(`.tab-nav[data-tab="${tabId}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
        activeTab.setAttribute('aria-selected', 'true');
    }
    
    // Ocultar todos los contenidos
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
        pane.setAttribute('aria-hidden', 'true');
    });
    
    // Mostrar el contenido correspondiente
    const pane = document.getElementById(tabId);
    if (pane) {
        pane.classList.add('active');
        pane.setAttribute('aria-hidden', 'false');
    }
}

function validateField(field) {
    const value = field.value.trim();
    
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'Este campo es requerido');
        return false;
    }
    
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Por favor, ingrese un email válido');
            return false;
        }
    }
    
    clearFieldError(field);
    return true;
}

function showFieldError(field, message) {
    clearFieldError(field);
    field.classList.add('error');
    
    let errorElement = field.parentElement.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        field.parentElement.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    field.setAttribute('aria-invalid', 'true');
    field.setAttribute('aria-describedby', errorElement.id || 'field-error');
}

function clearFieldError(field) {
    field.classList.remove('error');
    field.removeAttribute('aria-invalid');
    field.removeAttribute('aria-describedby');
    
    const errorElement = field.parentElement.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function showNotification(element, type) {
    if (typeof element === 'string') {
        // Crear notificación desde texto
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 
                              type === 'error' ? 'fa-exclamation-circle' : 
                              type === 'warning' ? 'fa-exclamation-triangle' : 
                              'fa-info-circle'}"></i>
                <span>${element}</span>
            </div>
        `;
        document.body.appendChild(notification);
        element = notification;
    }
    
    element.classList.add('show');
    
    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
        hideNotification(element);
    }, 5000);
}

function hideNotification(element) {
    element.classList.remove('show');
    setTimeout(() => {
        if (element.parentElement) {
            element.parentElement.removeChild(element);
        }
    }, 300);
}

function validateContactField(field) {
    const value = field.value.trim();
    const isRequired = field.hasAttribute('required');
    
    clearFieldError(field);

    if (isRequired && !value) {
        showFieldError(field, 'Este campo es requerido');
        return false;
    }

    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Por favor, ingrese un email válido');
            return false;
        }
    }

    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
        if (!phoneRegex.test(value)) {
            showFieldError(field, 'Por favor, ingrese un teléfono válido');
            return false;
        }
    }

    return true;
}

function handleContactFormSubmit(form) {
    const submitBtn = form.querySelector('.btn-submit');
    const inputs = form.querySelectorAll('[required]');
    let isValid = true;

    // Validar todos los campos requeridos
    inputs.forEach(input => {
        if (!validateContactField(input)) {
            isValid = false;
        }
    });

    if (!isValid) {
        showNotification('Por favor, corrige los errores en el formulario', 'error');
        return;
    }

    // Simular envío
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    // Simular tiempo de envío
    setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        showNotification('¡Mensaje enviado correctamente! Te contactaremos en menos de 24 horas.', 'success');
        form.reset();
        
        // Resetear labels
        const labels = form.querySelectorAll('.input-label');
        labels.forEach(label => {
            label.classList.remove('floating', 'focused');
        });
    }, 2000);
}

function trackSocialClick(socialName, location) {
    console.log(`📱 Social click: ${socialName} from ${location}`);
    
    // Integración con analytics (ejemplo)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'social_click', {
            event_category: 'Social',
            event_label: `${socialName} - ${location}`
        });
    }
}

function trackEvent(category, action, label) {
    console.log(`📊 Event: ${category} - ${action} - ${label}`);
    
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

function handleQuickContact(button) {
    const buttonType = button.classList.contains('whatsapp-btn') ? 'whatsapp' :
                      button.classList.contains('facebook-btn') ? 'facebook' : 'other';
    
    switch(buttonType) {
        case 'whatsapp':
            showWhatsAppModal();
            break;
        case 'facebook':
            // Redirigir directamente a Facebook
            const facebookUrl = document.querySelector('.facebook-btn')?.getAttribute('href');
            if (facebookUrl) {
                window.open(facebookUrl, '_blank');
            }
            break;
        default:
            // Para otros botones, redirigir normalmente
            const href = button.getAttribute('href');
            if (href && href !== '#') {
                window.open(href, '_blank');
            }
            break;
    }
}

function showWhatsAppConfirmation() {
    showNotification('💬 ¡Redirigiendo a WhatsApp! Estamos aquí para ayudarte.', 'success');
}

function showWhatsAppModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 400px;">
            <div class="modal-header">
                <h2><i class="fab fa-whatsapp" style="color: #25D366;"></i> Contactar por WhatsApp</h2>
                <p>Serás redirigido a WhatsApp para iniciar una conversación</p>
                <button class="modal-close">&times;</button>
            </div>
            <div style="padding: 2rem; text-align: center;">
                <div style="font-size: 3rem; color: #25D366; margin-bottom: 1rem;">
                    <i class="fab fa-whatsapp"></i>
                </div>
                <p style="margin-bottom: 1.5rem; color: var(--text-light);">
                    ¿Estás listo para chatear por WhatsApp? Te atenderemos lo antes posible.
                </p>
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button class="btn btn-outline" id="cancelWhatsApp">
                        <i class="fas fa-times"></i> Cancelar
                    </button>
                    <button class="btn btn-primary" id="confirmWhatsApp" style="background: linear-gradient(135deg, #25D366, #128C7E);">
                        <i class="fab fa-whatsapp"></i> Continuar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Event listeners para el modal
    modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
    });
    
    modal.querySelector('#cancelWhatsApp').addEventListener('click', () => {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
    });
    
    modal.querySelector('#confirmWhatsApp').addEventListener('click', () => {
        const whatsappUrl = document.querySelector('.whatsapp-btn')?.getAttribute('href') || 
                           document.querySelector('[href*="whatsapp"]')?.getAttribute('href');
        
        if (whatsappUrl) {
            window.open(whatsappUrl, '_blank');
        }
        
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
    });
    
    // Cerrar al hacer click fuera
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        }
    });
}

// ===== FUNCIONES GLOBALES PARA COMPATIBILIDAD =====
window.mostrarPanel = function(panelId) {
    // Función para compatibilidad con el panel de control
    console.log('🔧 Mostrar panel:', panelId);
};

window.compartirRedSocial = function(network, url = window.location.href, text = document.title) {
    const shareUrls = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`
    };
    
    if (shareUrls[network]) {
        window.open(shareUrls[network], '_blank', 'width=600,height=400');
    }
};

// ===== DETECCIÓN DE DISPOSITIVO =====
function detectDevice() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        document.body.classList.add('mobile-device');
        
        // Optimizaciones para móviles
        const whatsappFloat = document.getElementById('whatsappFloat');
        if (whatsappFloat) {
            whatsappFloat.style.transform = 'scale(1.1)';
        }
    } else {
        document.body.classList.add('desktop-device');
    }
}

// Inicializar detección de dispositivo
detectDevice();

// ===== INICIALIZACIÓN ADICIONAL =====
// Simulación de estadísticas del sistema (si existen)
setInterval(() => {
    const tempElement = document.querySelector('.temperature span');
    if (tempElement) {
        const baseTemp = 21;
        const variation = (Math.random() * 2 - 1).toFixed(1);
        const newTemp = (baseTemp + parseFloat(variation)).toFixed(1);
        tempElement.textContent = `${newTemp}°C`;
    }
}, 30000);

console.log('✅ JavaScript de la página principal cargado correctamente');