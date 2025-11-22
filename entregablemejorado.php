<?php
// Iniciar sesión
session_start();

// Configuración de usuarios
$usuarios = array(
    'admin' => array(
        'password' => '123456',
        'nombre' => 'Administrador',
        'email' => 'admin@edlusa.com',
        'rol' => 'administrador',
        'avatar' => 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
    ),
    'user1' => array(
        'password' => '1',
        'nombre' => 'Juan Pérez',
        'email' => 'user1@edlusa.com',
        'rol' => 'usuario',
        'avatar' => 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
    ),
    'user2' => array(
        'password' => '2',
        'nombre' => 'María García',
        'email' => 'user2@edlusa.com',
        'rol' => 'usuario',
        'avatar' => 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
    ),
    'user3' => array(
        'password' => '3',
        'nombre' => 'Carlos López',
        'email' => 'user3@edlusa.com',
        'rol' => 'editor',
        'avatar' => 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
    )
);

// Procesar login
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['login'])) {
    $username = trim($_POST['username'] ?? '');
    $password = $_POST['password'] ?? '';
    
    if (isset($usuarios[$username]) && $usuarios[$username]['password'] === $password) {
        $_SESSION['usuario_logueado'] = true;
        $_SESSION['nombre_usuario'] = $usuarios[$username]['nombre'];
        $_SESSION['username'] = $username;
        $_SESSION['email'] = $usuarios[$username]['email'];
        $_SESSION['rol'] = $usuarios[$username]['rol'];
        $_SESSION['avatar'] = $usuarios[$username]['avatar'];
        $_SESSION['ultimo_acceso'] = time();
        
        header('Location: ' . $_SERVER['PHP_SELF'] . '?login=success');
        exit;
    } else {
        $error_login = "Credenciales incorrectas. Por favor, verifique sus datos.";
        sleep(1);
    }
}

// Procesar actualización de perfil
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['actualizar_perfil'])) {
    if (isset($_SESSION['usuario_logueado'])) {
        $_SESSION['nombre_usuario'] = $_POST['nombre_completo'] ?? $_SESSION['nombre_usuario'];
        $_SESSION['email'] = $_POST['email'] ?? $_SESSION['email'];
        $mensaje_exito = "Perfil actualizado correctamente";
    }
}

// Procesar logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: ' . $_SERVER['PHP_SELF']);
    exit;
}

// Verificar estado de sesión
$usuario_logueado = isset($_SESSION['usuario_logueado']) && $_SESSION['usuario_logueado'];
$nombre_usuario = $_SESSION['nombre_usuario'] ?? 'Invitado';
$username = $_SESSION['username'] ?? '';
$email = $_SESSION['email'] ?? '';
$rol_usuario = $_SESSION['rol'] ?? 'invitado';
$avatar_usuario = $_SESSION['avatar'] ?? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

// Variables configurables
$empresa_nombre = "Edlusa";
$empresa_eslogan = "Ciberseguridad Profesional";
$titulo_principal = "Servicios Profesionales Edlusa";
$descripcion_principal = "Soluciones innovadoras y de alta calidad para impulsar tu negocio al siguiente nivel";

// Información de contacto
$contacto_direccion = "Av. la Cultura, Cusco, Peru";
$contacto_telefono = "+51 954281939";
$contacto_email = "anayaedyomar39@gmail.com";

// REDES SOCIALES
$redes_sociales = array(
    'facebook' => array(
        'url' => 'https://www.facebook.com/edy.anayazavaleta?locale=es_LA',
        'icono' => 'fab fa-facebook-f',
        'nombre' => 'Facebook'
    ),
    'instagram' => array(
        'url' => 'https://www.instagram.com/edyoaz_09/',
        'icono' => 'fab fa-instagram',
        'nombre' => 'Instagram'
    ),
    'whatsapp' => array(
        'url' => 'https://wa.me/51954281939',
        'icono' => 'fab fa-whatsapp',
        'nombre' => 'WhatsApp'
    ),
    'linkedin' => array(
        'url' => 'https://www.linkedin.com/in/edy-omar-anaya-zavaleta-2a31a32b9/',
        'icono' => 'fab fa-linkedin-in',
        'nombre' => 'LinkedIn'
    ),
    'github' => array(
        'url' => 'https://github.com/EdyOmarAnayaZavaleta',
        'icono' => 'fab fa-github',
        'nombre' => 'GitHub'
    )
);

// Servicios
$servicios = array(
    array(
        'id' => 'cisco',
        'icono' => 'fa-network-wired',
        'nombre' => 'Cisco',
        'titulo' => 'Configuración de Equipos Cisco',
        'imagen' => 'https://www.itdigitalsecurity.es/files/202403/cisco.jpeg',
        'descripcion' => 'Especialistas en configuración, implementación y mantenimiento de equipos Cisco para redes empresariales de alto rendimiento y seguridad.',
        'caracteristicas' => array(
            array('icono' => 'fa-router', 'titulo' => 'Routers & Switches', 'descripcion' => 'Configuración avanzada de routers y switches Cisco.'),
            array('icono' => 'fa-shield-alt', 'titulo' => 'Firewalls & Seguridad', 'descripcion' => 'Implementación de firewalls Cisco ASA.'),
            array('icono' => 'fa-wifi', 'titulo' => 'Redes Inalámbricas', 'descripcion' => 'Configuración de puntos de acceso wireless.'),
            array('icono' => 'fa-tools', 'titulo' => 'Soporte Técnico', 'descripcion' => 'Mantenimiento preventivo y correctivo.')
        )
    ),
    array(
        'id' => 'sistemas-operativos',
        'icono' => 'fa-desktop',
        'nombre' => 'Sistemas Operativos',
        'titulo' => 'Instalación de Sistemas Operativos',
        'imagen' => 'https://universodigital.org/wp-content/uploads/introduccion-sistemas-operativos.jpg',
        'descripcion' => 'Ofrecemos servicios profesionales de instalación y configuración de sistemas operativos seguros y optimizados.',
        'caracteristicas' => array(
            array('icono' => 'fa-search', 'titulo' => 'Kali Linux', 'descripcion' => 'Análisis de seguridad y pruebas de penetración.'),
            array('icono' => 'fa-shield-alt', 'titulo' => 'Parrot OS', 'descripcion' => 'Entorno seguro para pentesting.'),
            array('icono' => 'fa-windows', 'titulo' => 'Windows', 'descripcion' => 'Instalación optimizada de Windows.'),
            array('icono' => 'fa-server', 'titulo' => 'Ubuntu', 'descripcion' => 'Configuración de servidores Ubuntu.')
        )
    ),
    array(
        'id' => 'desarrollo-web',
        'icono' => 'fa-code',
        'nombre' => 'Desarrollo Web',
        'titulo' => 'Desarrollo Web Profesional',
        'imagen' => 'https://tse2.mm.bing.net/th/id/OIP.k_yjnZeNIpEnNxHSN-j0XwHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
        'descripcion' => 'Desarrollo de sitios web modernos, seguros y responsivos que reflejan la identidad de tu marca.',
        'caracteristicas' => array(
            array('icono' => 'fa-laptop-code', 'titulo' => 'Desarrollo Frontend', 'descripcion' => 'Creación de interfaces modernas y responsivas.'),
            array('icono' => 'fa-server', 'titulo' => 'Desarrollo Backend', 'descripcion' => 'Implementación de servidores y APIs seguras.'),
            array('icono' => 'fa-shopping-cart', 'titulo' => 'E-commerce', 'descripcion' => 'Desarrollo de tiendas online seguras.'),
            array('icono' => 'fa-mobile-alt', 'titulo' => 'Aplicaciones Web', 'descripcion' => 'Creación de aplicaciones web progresivas.')
        )
    ),
    array(
        'id' => 'pentesting',
        'icono' => 'fa-shield-alt',
        'nombre' => 'Pentesting',
        'titulo' => 'Pruebas de Penetración Profesionales',
        'imagen' => 'https://cdn.peritos-informaticos.com/wp-content/uploads/2024/06/pentesting-que-es-768x439.jpg',
        'descripcion' => 'Servicios profesionales de pruebas de penetración para identificar y corregir vulnerabilidades en sus sistemas.',
        'caracteristicas' => array(
            array('icono' => 'fa-search', 'titulo' => 'Auditorías de Seguridad', 'descripcion' => 'Evaluación completa de vulnerabilidades.'),
            array('icono' => 'fa-user-shield', 'titulo' => 'Pruebas de Penetración', 'descripcion' => 'Simulación de ataques reales controlados.'),
            array('icono' => 'fa-network-wired', 'titulo' => 'Análisis de Redes', 'descripcion' => 'Evaluación de seguridad en infraestructura.'),
            array('icono' => 'fa-file-alt', 'titulo' => 'Informes Detallados', 'descripcion' => 'Documentación técnica con hallazgos y soluciones.')
        )
    )
);

// Mensaje de éxito después del login
$mostrar_mensaje_exito = isset($_GET['login']) && $_GET['login'] === 'success';
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edlusa - Servicios Profesionales en Ciberseguridad</title>
    
    <!-- CSS PRINCIPAL -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="mejorado.css">
    
    <?php if ($usuario_logueado): ?>
    <!-- CSS DEL PANEL DE CONTROL -->
    <link rel="stylesheet" href="control.css">
    <?php endif; ?>
</head>
<body>
    <?php if ($usuario_logueado): ?>
        <!-- ============================ -->
        <!-- PANEL DE CONTROL PARA USUARIOS LOGUEADOS -->
        <!-- ============================ -->
        <div class="panel-container">
            <!-- Header del Panel -->
            <div class="panel-header">
                <div class="container">
                    <div class="panel-nav">
                        <div class="panel-brand">
                            <div class="brand-logo">
                                <i class="fas fa-shield-alt"></i>
                            </div>
                            <div class="brand-text">
                                <h2>Panel de Control</h2>
                                <span>Edlusa Security</span>
                            </div>
                        </div>
                        
                        <div class="panel-user-menu">
                            <div class="user-welcome">
                                <span>Bienvenido, <strong><?php echo $nombre_usuario; ?></strong></span>
                                <div class="user-role-badge"><?php echo ucfirst($rol_usuario); ?></div>
                            </div>
                            <div class="user-actions">
                                <button class="panel-notification" id="panelNotification">
                                    <i class="fas fa-bell"></i>
                                    <span class="notification-badge">3</span>
                                </button>
                                <div class="user-dropdown">
                                    <div class="user-avatar">
                                        <img src="<?php echo $avatar_usuario; ?>" alt="<?php echo $nombre_usuario; ?>">
                                    </div>
                                    <div class="dropdown-content">
                                        <a href="#" class="dropdown-item" onclick="mostrarSeccion('perfil')">
                                            <i class="fas fa-user-cog"></i> Mi Perfil
                                        </a>
                                        <a href="#" class="dropdown-item" onclick="mostrarSeccion('configuracion')">
                                            <i class="fas fa-cogs"></i> Configuración
                                        </a>
                                        <div class="dropdown-divider"></div>
                                        <a href="?logout=true" class="dropdown-item logout">
                                            <i class="fas fa-sign-out-alt"></i> Cerrar Sesión
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Contenido Principal del Panel -->
            <div class="panel-main">
                <div class="container">
                    <div class="panel-layout">
                        <!-- Sidebar -->
                        <div class="panel-sidebar">
                            <nav class="sidebar-nav">
                                <div class="nav-section">
                                    <h3>Principal</h3>
                                    <a href="#" class="nav-item active" onclick="mostrarSeccion('dashboard')">
                                        <i class="fas fa-tachometer-alt"></i>
                                        <span>Dashboard</span>
                                    </a>
                                    <a href="#" class="nav-item" onclick="mostrarSeccion('estadisticas')">
                                        <i class="fas fa-chart-bar"></i>
                                        <span>Estadísticas</span>
                                    </a>
                                    <a href="#" class="nav-item" onclick="mostrarSeccion('proyectos')">
                                        <i class="fas fa-project-diagram"></i>
                                        <span>Mis Proyectos</span>
                                        <span class="nav-badge">5</span>
                                    </a>
                                </div>

                                <div class="nav-section">
                                    <h3>Servicios</h3>
                                    <a href="#" class="nav-item" onclick="mostrarSeccion('servicios')">
                                        <i class="fas fa-shield-alt"></i>
                                        <span>Servicios Activos</span>
                                    </a>
                                    <a href="#" class="nav-item" onclick="mostrarSeccion('seguridad')">
                                        <i class="fas fa-lock"></i>
                                        <span>Seguridad</span>
                                    </a>
                                </div>

                                <?php if ($rol_usuario === 'administrador' || $rol_usuario === 'editor'): ?>
                                <div class="nav-section">
                                    <h3>Administración</h3>
                                    <a href="#" class="nav-item" onclick="mostrarSeccion('usuarios')">
                                        <i class="fas fa-users"></i>
                                        <span>Gestión de Usuarios</span>
                                    </a>
                                </div>
                                <?php endif; ?>

                                <div class="nav-section">
                                    <h3>Soporte</h3>
                                    <a href="#" class="nav-item" onclick="mostrarSeccion('soporte')">
                                        <i class="fas fa-headset"></i>
                                        <span>Soporte Técnico</span>
                                    </a>
                                </div>
                            </nav>
                        </div>

                        <!-- Contenido Dinámico -->
                        <div class="panel-content">
                            <!-- Dashboard -->
                            <div id="seccion-dashboard" class="content-section active">
                                <div class="section-header">
                                    <h1>Dashboard Principal</h1>
                                    <p>Resumen general de tu actividad y servicios</p>
                                </div>

                                <div class="stats-grid">
                                    <div class="stat-card primary">
                                        <div class="stat-icon">
                                            <i class="fas fa-shield-check"></i>
                                        </div>
                                        <div class="stat-info">
                                            <h3>8</h3>
                                            <span>Servicios Activos</span>
                                        </div>
                                    </div>

                                    <div class="stat-card success">
                                        <div class="stat-icon">
                                            <i class="fas fa-check-circle"></i>
                                        </div>
                                        <div class="stat-info">
                                            <h3>24</h3>
                                            <span>Proyectos Completados</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Perfil de Usuario -->
                            <div id="seccion-perfil" class="content-section">
                                <div class="section-header">
                                    <h1>Mi Perfil</h1>
                                    <p>Gestiona tu información personal y preferencias</p>
                                </div>

                                <?php if (isset($mensaje_exito)): ?>
                                    <div class="alert alert-success">
                                        <i class="fas fa-check-circle"></i>
                                        <?php echo $mensaje_exito; ?>
                                    </div>
                                <?php endif; ?>

                                <div class="profile-content">
                                    <form method="POST" class="profile-form">
                                        <input type="hidden" name="actualizar_perfil" value="true">
                                        
                                        <div class="form-section">
                                            <h4>Información Personal</h4>
                                            <div class="form-row">
                                                <div class="form-group">
                                                    <label>Nombre Completo</label>
                                                    <input type="text" name="nombre_completo" value="<?php echo $nombre_usuario; ?>" required>
                                                </div>
                                                <div class="form-group">
                                                    <label>Correo Electrónico</label>
                                                    <input type="email" name="email" value="<?php echo $email; ?>" required>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="form-actions">
                                            <button type="submit" class="btn btn-primary">
                                                <i class="fas fa-save"></i> Guardar Cambios
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    <?php else: ?>
        <!-- ============================ -->
        <!-- PÁGINA PRINCIPAL PARA USUARIOS NO LOGUEADOS -->
        <!-- ============================ -->
        
        <!-- Botón Flotante de WhatsApp -->
        <div class="whatsapp-float" id="whatsappFloat">
            <a href="https://wa.me/51954281939" target="_blank" class="whatsapp-link">
                <div class="whatsapp-icon">
                    <i class="fab fa-whatsapp"></i>
                </div>
                <div class="whatsapp-tooltip">
                    <span>¿Necesitas ayuda? Chatea con nosotros</span>
                    <div class="tooltip-arrow"></div>
                </div>
            </a>
        </div>

        <!-- Notificación de éxito -->
        <?php if ($mostrar_mensaje_exito): ?>
            <div class="notification success" id="successNotification">
                <div class="notification-content">
                    <i class="fas fa-check-circle"></i>
                    <span>¡Bienvenido <?php echo $nombre_usuario; ?>!</span>
                </div>
            </div>
        <?php endif; ?>

        <!-- Header -->
        <header class="header">
            <div class="container">
                <div class="header-top">
                    <div class="logo-container">
                        <div class="logo">
                            <img src="https://sempreupdate.com.br/wp-content/uploads/2022/02/Captura-de-tela-2022-02-15-072332-150x150.png" alt="Logo <?php echo $empresa_nombre; ?>">
                        </div>
                        <div class="company-name">
                            <h1><?php echo $empresa_nombre; ?></h1>
                            <p><?php echo $empresa_eslogan; ?></p>
                        </div>
                    </div>
                    
                    <div class="auth-buttons">
                        <?php if (!$usuario_logueado): ?>
                            <button class="btn btn-outline" id="loginBtn">
                                <i class="fas fa-sign-in-alt"></i> 
                                <span class="btn-text">Acceso Clientes</span>
                            </button>
                        <?php else: ?>
                            <div class="user-profile" id="userProfile">
                                <div class="profile-pic">
                                    <img src="<?php echo $avatar_usuario; ?>" alt="Foto de perfil">
                                </div>
                                <div class="profile-info">
                                    <span class="user-name"><?php echo $nombre_usuario; ?></span>
                                    <span class="user-badge badge-<?php echo $rol_usuario; ?>"><?php echo $rol_usuario; ?></span>
                                </div>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            </div>
        </header>

        <!-- Hero Section -->
        <section class="hero">
            <div class="container">
                <div class="hero-content">
                    <div class="hero-badge">Servicios Profesionales</div>
                    <h1 class="hero-title">Protección Digital <span class="highlight">Avanzada</span> para tu Empresa</h1>
                    <p class="hero-subtitle">Soluciones integrales en ciberseguridad que garantizan la protección de tus sistemas y datos empresariales</p>
                    
                    <div class="hero-actions">
                        <a href="#servicios" class="btn btn-primary">
                            <i class="fas fa-shield-alt"></i> Nuestros Servicios
                        </a>
                        <a href="#contacto" class="btn btn-secondary">
                            <i class="fas fa-phone"></i> Consulta Gratuita
                        </a>
                    </div>
                    
                    <div class="hero-stats">
                        <div class="stat">
                            <div class="stat-number">+50</div>
                            <div class="stat-label">Proyectos Completados</div>
                        </div>
                        <div class="stat">
                            <div class="stat-number">100%</div>
                            <div class="stat-label">Clientes Satisfechos</div>
                        </div>
                        <div class="stat">
                            <div class="stat-number">24/7</div>
                            <div class="stat-label">Soporte Técnico</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Sección de Servicios -->
        <section class="services-section" id="servicios">
            <div class="container">
                <div class="section-header">
                    <h2>Nuestros Servicios Especializados</h2>
                    <p>Soluciones completas en ciberseguridad adaptadas a tus necesidades</p>
                </div>
                
                <div class="services-tabs">
                    <div class="tabs-nav">
                        <?php foreach ($servicios as $index => $servicio): ?>
                            <button class="tab-nav <?php echo $index === 0 ? 'active' : ''; ?>" data-tab="<?php echo $servicio['id']; ?>">
                                <i class="fas <?php echo $servicio['icono']; ?>"></i>
                                <span><?php echo $servicio['nombre']; ?></span>
                            </button>
                        <?php endforeach; ?>
                    </div>
                    
                    <div class="tabs-content">
                        <?php foreach ($servicios as $index => $servicio): ?>
                            <div class="tab-pane <?php echo $index === 0 ? 'active' : ''; ?>" id="<?php echo $servicio['id']; ?>">
                                <div class="service-hero">
                                    <div class="service-image">
                                        <img src="<?php echo $servicio['imagen']; ?>" alt="<?php echo $servicio['titulo']; ?>">
                                    </div>
                                    <div class="service-info">
                                        <h3 class="service-title"><?php echo $servicio['titulo']; ?></h3>
                                        <p class="service-description"><?php echo $servicio['descripcion']; ?></p>
                                        
                                        <div class="service-features">
                                            <h4>Características Principales</h4>
                                            <div class="features-grid">
                                                <?php foreach ($servicio['caracteristicas'] as $caracteristica): ?>
                                                    <div class="feature-card">
                                                        <div class="feature-icon">
                                                            <i class="fas <?php echo $caracteristica['icono']; ?>"></i>
                                                        </div>
                                                        <div class="feature-content">
                                                            <h5><?php echo $caracteristica['titulo']; ?></h5>
                                                            <p><?php echo $caracteristica['descripcion']; ?></p>
                                                        </div>
                                                    </div>
                                                <?php endforeach; ?>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </section>

        <!-- Sección de Contacto -->
        <section class="contact-section" id="contacto">
            <div class="container">
                <div class="section-header">
                    <h2>Contacto</h2>
                    <p>Hablemos sobre cómo podemos proteger tu negocio</p>
                </div>
                
                <div class="contact-grid">
                    <div class="contact-info">
                        <div class="contact-card">
                            <h3>Información de Contacto</h3>
                            <div class="contact-items">
                                <div class="contact-item">
                                    <div class="contact-icon">
                                        <i class="fas fa-map-marker-alt"></i>
                                    </div>
                                    <div class="contact-details">
                                        <h4>Ubicación</h4>
                                        <p><?php echo $contacto_direccion; ?></p>
                                    </div>
                                </div>
                                <div class="contact-item">
                                    <div class="contact-icon">
                                        <i class="fas fa-phone"></i>
                                    </div>
                                    <div class="contact-details">
                                        <h4>Teléfono</h4>
                                        <p><?php echo $contacto_telefono; ?></p>
                                    </div>
                                </div>
                                <div class="contact-item">
                                    <div class="contact-icon">
                                        <i class="fas fa-envelope"></i>
                                    </div>
                                    <div class="contact-details">
                                        <h4>Email</h4>
                                        <p><?php echo $contacto_email; ?></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="contact-form-container">
                        <div class="contact-form-card">
                            <div class="form-header">
                                <h3>Solicitar Información</h3>
                                <p>Completa el formulario y nos pondremos en contacto contigo</p>
                            </div>
                            
                            <form id="contactForm" class="contact-form">
                                <div class="form-row">
                                    <div class="form-group">
                                        <input type="text" id="name" name="nombre" class="form-input" placeholder="Nombre completo *" required>
                                    </div>
                                    <div class="form-group">
                                        <input type="email" id="email" name="email" class="form-input" placeholder="Correo electrónico *" required>
                                    </div>
                                </div>
                                
                                <div class="form-group">
                                    <select id="service" name="servicio" class="form-select" required>
                                        <option value="">Selecciona un servicio</option>
                                        <?php foreach ($servicios as $servicio): ?>
                                            <option value="<?php echo $servicio['id']; ?>"><?php echo $servicio['nombre']; ?></option>
                                        <?php endforeach; ?>
                                    </select>
                                </div>
                                
                                <div class="form-group">
                                    <textarea id="message" name="mensaje" class="form-textarea" placeholder="Mensaje *" rows="4" required></textarea>
                                </div>
                                
                                <div class="form-actions">
                                    <button type="submit" class="btn btn-primary btn-block">
                                        <i class="fas fa-paper-plane"></i> Enviar Mensaje
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Footer -->
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-main">
                        <div class="footer-info">
                            <div class="footer-logo">
                                <h3><?php echo $empresa_nombre; ?></h3>
                                <p><?php echo $empresa_eslogan; ?></p>
                            </div>
                        </div>
                        
                        <div class="footer-social">
                            <h4>Síguenos en</h4>
                            <div class="social-links">
                                <?php foreach ($redes_sociales as $red): ?>
                                    <a href="<?php echo $red['url']; ?>" target="_blank" rel="noopener noreferrer" class="social-link" title="<?php echo $red['nombre']; ?>">
                                        <i class="<?php echo $red['icono']; ?>"></i>
                                    </a>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    <?php endif; ?>

    <!-- Modal de Login -->
    <div class="modal" id="loginModal">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Acceso al Sistema</h2>
                <p>Ingresa tus credenciales para acceder a la plataforma</p>
                <button class="modal-close">&times;</button>
            </div>
            
            <?php if (isset($error_login)): ?>
                <div class="error-message">
                    <i class="fas fa-exclamation-triangle"></i>
                    <div>
                        <strong>Error de autenticación</strong>
                        <p><?php echo $error_login; ?></p>
                    </div>
                </div>
            <?php endif; ?>
            
            <form id="loginForm" method="POST">
                <input type="hidden" name="login" value="true">
                
                <div class="form-group">
                    <label for="username">Usuario *</label>
                    <input type="text" id="username" name="username" required placeholder="Ingresa tu usuario">
                </div>
                
                <div class="form-group">
                    <label for="password">Contraseña *</label>
                    <input type="password" id="password" name="password" required placeholder="Ingresa tu contraseña">
                </div>
                
                <button type="submit" class="btn btn-primary btn-block">
                    <span class="btn-text">Iniciar Sesión</span>
                </button>
            </form>
        </div>
    </div>

    <!-- JAVASCRIPT -->
    <script src="entregablemejorado.js"></script>
    
    <?php if ($usuario_logueado): ?>
    <!-- JAVASCRIPT DEL PANEL DE CONTROL -->
    <script src="control.js"></script>
    <?php endif; ?>
</body>
</html>