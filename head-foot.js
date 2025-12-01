// head-foot.js - Reusable header and footer component with fixed hamburger menu and layout

(function() {
    'use strict';
    
    // Create and inject the HTML structure
    document.addEventListener('DOMContentLoaded', function() {
        // Create header HTML
        const headerHTML = `
            <header class="header">
                <div class="container">
                    <div class="header-content">
                        <!-- Logo + Titre -->
                 <div class="logo-section"> 
                    <a href="index.html" class="logo-link">
                        <img src="images/header/ofppt-logo.svg" alt="OFPPT Logo" class="logo">  
                    </a>
                    <div class="site-text">
                        <h1 class="site-title">Office de la Formation Professionnelle <br>et de la Promotion du Travail</h1>
                    </div>
                </div>

                        <!-- Drapeau version desktop -->
                        <div class="logo-section flag-box desktop-flag">
                            <img src="images/header/Flag.png" alt="Drapeau Settat" class="LOGOP"> 
                            <h3 class="site-subtitle">PROVINCE DE SETTAT</h3>
                        </div>

                        <!-- Contrôles mobiles (hamburger + drapeau) -->
                        <div class="mobile-header-controls">
                            <!-- Drapeau version mobile -->
                            <div class="flag-box mobile-flag">
                                <img src="images/header/Flag.png" alt="Drapeau Settat" class="LOGOP"> 
                                <h3 class="site-subtitle">PROVINCE DE SETTAT</h3>
                            </div>

                            <!-- Hamburger Menu Button -->
                            <button class="menu-toggle" id="menu-toggle" aria-label="Toggle menu">
                                <span></span>
                                <span></span>
                                <span></span>
                            </button>
                        </div>

                        <!-- Menu de navigation -->
                        <nav class="main-nav" id="main-nav">
                            <div class="menu-item">
                                <a href="index.html" class="nav-link">Accueil</a>
                            </div>

                            <div class="menu-item has-submenu">
                                <a href="offre de formation.html" class="nav-link">Offre de formation</a>
                                <ul class="submenu">
                                    <li><a href="offre de formation.html#ofppt-parcours">Parcours de Formation</a></li>
                                    <li><a href="offre de formation.html#secteurs-settat">Secteurs Disponibles</a></li>
                                    <li><a href="offre de formation.html#formations">Filieres et Formations</a></li>
                                </ul>
                            </div>

                            <div class="menu-item">
                                <a href="Etablissement.html" class="nav-link">Établissements</a>
                                <ul class="submenu">
                                    <!-- Add submenu items here if needed -->
                                </ul>
                            </div>

                            <div class="menu-item">
                                <a href="Actualites.html" class="nav-link">Actualités & événements</a>
                                <!-- Add submenu items here if needed -->
                            </div>

                            <div class="menu-item">
                                <a href="EspaceStagiaire.html" class="nav-link">Espace stagiaires</a>
                                <!-- Add submenu items here if needed -->
                            </div>

                            <div class="menu-item">
                                <a href="contact.html" class="nav-link">Contact</a>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        `;

        // Create footer HTML
        const footerHTML = `
            <footer class="footer-ofppt">
                <div class="footer-overlay"></div>

                <div class="footer-container fade-in">
                    <!-- À propos -->
                    <div class="footer-column">
                        <h3>À propos</h3>
                        <p>
                            L'OFPPT est un établissement public dédié à la formation professionnelle au Maroc. 
                            La province de Settat compte 9 établissements offrant plus de 70 filières de formation.
                        </p>
                    </div>
                    <div class="footer-column">
                        <h3>Liens Rapides</h3>
                        <ul>
                            <li><a href="index.html">Accueil</a></li>
                            <li><a href="offre de formation.html">Formations</a></li>
                            <li><a href="Etablissement.html">Établissements</a></li>
                            <li><a href="Actualites.html">Actualités</a></li>
                            <li><a href="contact.html">Contact</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h3>Ressources</h3>
                        <ul>
                            <li><a href="stagiaires.html">Espace Stagiaire</a></li>
                            <li><a href="documents.html">Documents</a></li>
                            <li><a href="https://www.scholarvox.com" target="_blank">ScholarVox</a></li>
                            <li><a href="https://www.myway.ac.ma/fr" target="_blank">MyWay</a></li>
                            <li><a href="https://olms.ofppt.ma/" target="_blank">OFPPT Academy</a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h3>Mentions légales</h3>
                        <ul>
                            <li><a href="https://www.ofppt.ma/sites/default/files/documents/mentions-legales-ofppt.pdf" target="_blank">Mentions Légales</a></li>
                            <li><a href="https://www.ofppt.ma/sites/default/files/documents/politique-confidentialité-ofppt.pdf" target="_blank">Politique de confidentialité </a></li>
                            <li><a href="https://www.ofppt.ma/sites/default/files/documents/accessibilité-ofppt.pdf" target="_blank">Accessibilité </a></li>
                        </ul>
                    </div>
                    <div class="footer-column">
                        <h3>Contact</h3>
                        <p><i class="fas fa-map-marker-alt"></i> Province de Settat, Maroc</p>
                        <p><i class="fas fa-envelope"></i> contact.settat@ofppt.ma</p>
                        <p><i class="fas fa-phone"></i> 05 23 40 00 00</p>

                        <div class="social-icons">
                            <a href="https://www.facebook.com/ofppt.page.officielle/" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                            <a href="https://x.com/OFPPT_Officiel" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                            <a href="https://www.linkedin.com/company/ofpptpageofficielle/" aria-label="LinkedIn"><i class="fab fa-linkedin-in"></i></a>
                            <a href="https://www.instagram.com/ofppt.officiel/" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; 2025 OFPPT Settat. Tous droits réservés.</p>
                </div>
            </footer>
        `;

        // Create CSS styles with fixes
        const cssStyles = `
            :root {
                --primary-green: #2d9f4e;
                --primary-blue: #1976d2;
                --light-blue: #e3f2fd;
                --dark-blue: #0d47a1;
                --text-dark: #2c3e50;
                --text-light: #546e7a;
                --white: #ffffff;
                --gray-light: #f5f5f5;
                --gray-medium: #e0e0e0;
            }

            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: var(--text-dark);
                background-color: var(--white);
                padding-top: 80px; /* Added for fixed header */
            }

            .container {
                max-width: 100%;
                margin: 0 auto;
                padding: 0 10px;
            }

            .header {
                background: linear-gradient(90deg, #004a99, #0066cc);
                color: #fff;
                padding: 8px 0;
                font-family: "Segoe UI", Arial, sans-serif;
                position: fixed; /* Changed to fixed */
                z-index: 1000;
                top: 0;
                left: 0;
                width: 100%; /* Full width */
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); /* Added shadow */
            }

            .header-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                min-height: 60px;
            }

            .logo-section {
                display: flex;
                align-items: center;
                gap: 8px;
                flex-shrink: 1;
                min-width: 0;
            }

            .logo {
                width: 60px;
                height: auto;
                flex-shrink: 0;
            }

            .LOGOP {
                width: 60px;
                height: auto;
            }

            .site-text {
                display: flex;
                flex-direction: column;
                line-height: 1.2;
                min-width: 0;
            }

            .site-title {
                font-size: 1.1rem;
                margin: 0;
                font-weight: 700;
                line-height: 1.1;
            }

            .site-subtitle {
                font-size: 0.9rem;
                margin: 0;
                font-weight: 600;
                text-align: center;
            }

            /* Hamburger Menu Styles - FIXED */
            .menu-toggle {
                display: none;
                flex-direction: column;
                justify-content: space-between;
                width: 26px;
                height: 18px;
                background: transparent;
                border: none;
                cursor: pointer;
                padding: 0;
                z-index: 1001;
                flex-shrink: 0;
            }

            .menu-toggle span {
                display: block;
                height: 2px;
                width: 100%;
                background-color: white;
                border-radius: 2px;
                transition: all 0.3s ease;
            }

            /* FIXED: Proper X transformation */
            .menu-toggle.active span:nth-child(1) {
                transform: rotate(45deg) translate(6px, 6px);
            }

            .menu-toggle.active span:nth-child(2) {
                opacity: 0;
            }

            .menu-toggle.active span:nth-child(3) {
                transform: rotate(-45deg) translate(6px, -6px);
            }

            .main-nav {
                display: flex;
                align-items: center;
                gap: 5px;
                background: rgba(255, 255, 255, 0.12);
                backdrop-filter: blur(10px);
                padding: 6px 12px;
                border-radius: 50px;
                box-shadow: 0 3px 15px rgba(232, 233, 232, 0.949);
                transition: all 0.4s ease;
            }

            .nav-link {
                color: #f5f6f6;
                font-weight: 600;
                font-size: 14px;
                text-decoration: none;
                position: relative;
                padding: 4px 8px;
                border-radius: 30px;
                transition: all 0.3s ease;
                white-space: nowrap;
            }

            .nav-link::before {
                content: "";
                position: absolute;
                inset: 0;
                border-radius: 30px;
                background: transparent;
                background-size: 300% 100%;
                opacity: 0;
                z-index: -1;
                transition: all 0.4s ease;
                animation: gradientMove 8s linear infinite;
            }

            .nav-link:hover::before,
            .nav-link.active::before {
                opacity: 1;
                background-color: var(--primary-green);
            }

            .nav-link:hover {
                color: #f3f4f1;
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(2, 194, 73, 0.3);
            }

            .menu-item {
                position: relative;
            }

            .nav-link {
                text-decoration: none;
                color: #ffffff;
                font-weight: 600;
                padding: 8px 12px;
                display: inline-block;
                transition: color 0.3s ease;
            }

            .nav-link:hover {
                color: var(--white);
            }

            .submenu {
                position: absolute;
                top: 100%;
                left: 0;
                background: rgb(243, 239, 239);
                border-radius: 10px;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                display: flex;
                flex-direction: column;
                width: 240px;
                max-height: 300px;
                overflow-y: auto;
                opacity: 0;
                visibility: hidden;
                transform: translateY(10px);
                pointer-events: none;
                transition: all 0.25s ease;
                z-index: 999;
            }

            .submenu li {
                list-style: none;
            }

            .submenu a {
                display: block;
                padding: 10px 14px;
                color: #004a99;
                text-decoration: none;
                border-bottom: 1px solid #eee;
                font-weight: 500;
                font-size: 13px;
            }

            .submenu a:hover {
                background-color: #d9dadc;
                color: #00a676;
            }

            .submenu-title {
                font-weight: 700;
                padding: 8px 14px;
                color: #00a676;
                background: #f8f9fa;
                font-size: 13px;
            }

            .menu-item.has-submenu:hover > .submenu,
            .menu-item.has-submenu:focus-within > .submenu {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
                pointer-events: auto;
            }

            .submenu:hover {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
                pointer-events: auto;
            }

            .main-nav .submenu-title {
                font-weight: 700;
                font-size: 0.8rem;
                color: #1976d2;
                background: #f1f8ff;
                padding: 6px 16px;
                border-bottom: 1px solid #e0e0e0;
            }

            .flag-box {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 4px;
                text-align: center;
                flex-shrink: 0;
            }

            .flag-box .LOGOP {
                width: 50px;
                height: auto;
                border: 2px solid #fbfbfb;
                border-radius: 4px;
                box-shadow: 0 2px 8px rgba(0, 168, 107, 0.25);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }

            .flag-box .LOGOP:hover {
                transform: scale(1.08);
                box-shadow: 0 4px 12px rgba(0, 168, 107, 0.45);
            }

            .flag-box .site-subtitle {
                font-size: 0.95rem;
                font-weight: 700;
                color: #ffffff;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                line-height: 1.1;
                margin-top: 2px;
                order: 2; /* Ensure subtitle comes after flag */
            }

            .flag-box {
                animation: fadeZoom 0.8s ease forwards;
                opacity: 0;
                flex-direction: column; /* Ensure column layout */
            }

            @keyframes fadeZoom {
                from {
                    opacity: 0;
                    transform: scale(0.8);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }

            /* Mobile header controls */
            .mobile-header-controls {
                display: none;
                align-items: center;
                gap: 10px;
                flex-shrink: 0;
            }

            /* Responsive Styles */

            /* Samsung Galaxy S8 (360px) and similar */
            @media (max-width: 1024px) {
                .site-title {
                    font-size: 1rem;
                }
                
                .site-subtitle {
                    font-size: 0.8rem;
                }
                
                .nav-link {
                    font-size: 13px;
                    padding: 4px 6px;
                }
            }

            /* Mobile Styles - Hamburger Menu - Updated for tablets and foldables */
            @media (max-width: 1024px) {
                .mobile-header-controls {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .menu-toggle {
                    display: flex;
                }
                
                .flag-box.mobile-flag {
                    display: flex;
                    flex-direction: column; /* Changed from row to column */
                    align-items: center;
                    gap: 4px; /* Reduced gap for column layout */
                }

                .flag-box.mobile-flag .LOGOP {
                    width: 32px;
                    height: auto;
                    order: 1; /* Flag first */
                }

                .flag-box.mobile-flag .site-subtitle {
                    font-size: 0.75rem; /* Slightly smaller for mobile */
                    white-space: nowrap;
                    line-height: 1;
                    order: 2; /* Subtitle after flag */
                    margin-top: 2px;
                    text-align: center;
                }

                .flag-box.desktop-flag {
                    display: none;
                }
                
                /* Mobile Navigation - Fixed Position */
                .main-nav {
                    position: fixed;
                    top: 0;
                    right: -100%;
                    width: 85%;
                    max-width: 300px;
                    height: 100vh;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-start;
                    padding: 80px 20px 20px;
                    border-radius: 0;
                    background: linear-gradient(135deg, #004a99, #0066cc);
                    transition: right 0.4s ease;
                    z-index: 999;
                    overflow-y: auto;
                    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.3);
                }
                
                .main-nav.active {
                    right: 0;
                }
                
                .menu-item {
                    width: 100%;
                    margin-bottom: 10px;
                }
                
                .nav-link {
                    display: block;
                    width: 100%;
                    padding: 12px 15px;
                    border-radius: 6px;
                    font-size: 16px;
                    background: rgba(255, 255, 255, 0.1);
                }
                
                .submenu {
                    position: static;
                    width: 100%;
                    max-height: 0;
                    opacity: 0;
                    visibility: hidden;
                    transform: none;
                    pointer-events: none;
                    box-shadow: none;
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 6px;
                    transition: all 0.3s ease;
                    margin-top: 8px;
                    padding: 0;
                }
                
                .menu-item.has-submenu.active .submenu {
                    max-height: 350px;
                    opacity: 1;
                    visibility: visible;
                    overflow-y: auto;
                    pointer-events: auto;
                    padding: 8px 0;
                }
                
                .submenu a {
                    color: #ffffff;
                    padding: 10px 20px;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                    font-size: 14px;
                }
                
                .submenu a:hover {
                    background: rgba(0, 166, 118, 0.25);
                    color: #eaff00;
                }
                
                .submenu-title {
                    color: #eaff00;
                    background: transparent;
                    font-weight: 600;
                    padding: 8px 20px;
                    font-size: 14px;
                }
                
                .header-content {
                    position: relative;
                }
                
                .logo-section {
                    flex: 1;
                    min-width: 0;
                }
            }

            /* Additional optimization for foldable devices */
            @media (max-width: 1024px) and (min-width: 768px) {
                .main-nav {
                    width: 70%;
                    max-width: 350px;
                }
                
                .logo-section {
                    flex: 1;
                }
                
                .site-title {
                    font-size: 1rem;
                }

                .flag-box.mobile-flag .site-subtitle {
                    font-size: 0.8rem;
                }
            }

            /* Surface Pro 7 specific optimization */
            @media (width: 912px) and (height: 1368px) {
                .header-content {
                    min-height: 70px;
                }
                
                .logo {
                    width: 65px;
                }
                
                .site-title {
                    font-size: 1.05rem;
                }

                .flag-box.mobile-flag .site-subtitle {
                    font-size: 0.8rem;
                }
            }

            /* Samsung Galaxy S8 (360px) - FIXED LAYOUT */
            @media (max-width: 768px) {
                .header-content {
                    flex-wrap: wrap;
                    min-height: 55px;
                }
                
                /* FIXED: Remove problematic fixed percentages */
                .logo-section {
                    order: 1;
                    flex: 1;
                    min-width: 0;
                    gap: 6px;
                }
                
                .mobile-header-controls {
                    order: 2;
                    flex-shrink: 0;
                    justify-content: flex-end;
                    gap: 6px;
                }
                
                .site-title {
                    font-size: 0.85rem;
                    line-height: 1.1;
                }

                .logo {
                    width: 60px;
                }

                .flag-box.mobile-flag .site-subtitle {
                    font-size: 0.65rem; /* Smaller for mobile */
                }

                .flag-box.mobile-flag .LOGOP {
                    width: 28px;
                }

                .menu-toggle {
                    width: 24px;
                    height: 16px;
                }
            }

            /* iPhone SE (320px) and very small screens - FIXED LAYOUT */
            @media (max-width: 400px) {
                .container {
                    padding: 0 8px;
                }
                
                .header {
                    padding: 6px 0;
                }
                
                .header-content {
                    min-height: 50px;
                }
                
                /* FIXED: Remove problematic fixed percentages */
                .logo-section {
                    flex: 1;
                    min-width: 0;
                    gap: 4px;
                }
                
                .mobile-header-controls {
                    flex-shrink: 0;
                    gap: 4px;
                }
                
                .site-title {
                    font-size: 0.75rem;
                    line-height: 1;
                }

                .logo {
                    width: 60px;
                }

                .flag-box.mobile-flag .LOGOP {
                    width: 25px;
                }
                
                .flag-box.mobile-flag .site-subtitle {
                    font-size: 0.55rem; /* Even smaller for very small screens */
                    letter-spacing: 0.3px;
                }

                .flag-box.mobile-flag {
                    gap: 2px; /* Reduced gap for very small screens */
                }

                .menu-toggle {
                    width: 22px;
                    height: 15px;
                }

                .main-nav {
                    width: 90%;
                    max-width: 280px;
                    padding: 70px 15px 15px;
                }

                .nav-link {
                    padding: 10px 12px;
                    font-size: 14px;
                }
            }

            /* Extra small screens (below 320px) - FIXED LAYOUT */
            @media (max-width: 320px) {
                .logo-section {
                    flex: 1;
                    min-width: 0;
                }
                
                .mobile-header-controls {
                    flex-shrink: 0;
                }
                
                .site-title {
                    font-size: 0.7rem;
                }

                .logo {
                    width: 60px;
                }

                .flag-box.mobile-flag .LOGOP {
                    width: 22px;
                }
                
                .flag-box.mobile-flag .site-subtitle {
                    font-size: 0.45rem; /* Smallest size for tiny screens */
                }

                .menu-toggle {
                    width: 20px;
                    height: 14px;
                }
            }

            /* Desktop styles - Updated breakpoint */
            @media (min-width: 1025px) {
                .flag-box.mobile-flag {
                    display: none;
                }
                
                .flag-box.desktop-flag {
                    display: flex;
                    flex-direction: column; /* Ensure column layout on desktop */
                    align-items: center;
                    gap: 4px;
                }

                .flag-box.desktop-flag .LOGOP {
                    order: 1; /* Flag first */
                }

                .flag-box.desktop-flag .site-subtitle {
                    order: 2; /* Subtitle after flag */
                    margin-top: 2px;
                }
                
                .mobile-header-controls {
                    display: none;
                }
            }

            /* Prevent horizontal scrolling on very small screens */
            @media (max-width: 400px) {
                body {
                    overflow-x: hidden;
                }
                
                .container {
                    max-width: 100vw;
                }
            }

            .footer-ofppt {
                background: linear-gradient(180deg, #003b73 0%, #00214d 100%);
                color: #f1f5f9;
                padding: 20px 0 20px;
                font-family: "Poppins", sans-serif;
                position: relative;
                overflow: hidden;
                height: auto;
            }

            .footer-overlay {
                position: absolute;
                width: 200%;
                height: 200%;
                background: radial-gradient(circle at 20% 40%, rgba(0,114,188,0.35), transparent 60%),
                            radial-gradient(circle at 80% 60%, rgba(120,190,32,0.3), transparent 60%);
                top: -50%;
                left: -50%;
                z-index: 0;
                filter: blur(50px);
                transition: transform 0.3s ease-out;
            }

            .footer-container {
                position: relative;
                z-index: 2;
                display: grid;
                grid-template-columns: repeat(5, 1fr);
                gap: 40px;
                max-width: 96%;
                margin: 0 auto;
                padding: 0 20px;
                padding-bottom: 0px;
                padding-top: 0px;
            }

            .footer-ofppt h3 {
                color:  #248a42;
                font-size: 1.25rem;
                margin-bottom: 20px;
                font-weight: 600;
                position: relative;
            }

            .footer-ofppt h3::after {
                content: "";
                display: block;
                width: 45px;
                height: 3px;
                background: linear-gradient(90deg, #cbf31a, #04a229);
                margin-top: 6px;
                border-radius: 2px;
                transition: width 0.4s ease;
            }

            .footer-ofppt h3:hover::after { width: 70px; }

            .footer-ofppt p {
                color: #e2e8f0;
                font-size: 0.95rem;
                line-height: 1.7;
                margin-bottom: 10px;
            }

            .footer-ofppt ul { list-style: none; padding: 0; margin: 0; }
            .footer-ofppt ul li { margin-bottom: 10px; }

            .footer-ofppt a {
                color: #e2e8f0;
                text-decoration: none;
                transition: all 0.3s ease;
                position: relative;
            }

            .footer-ofppt a::after {
                content: "";
                position: absolute;
                bottom: -3px;
                left: 0;
                width: 0%;
                height: 2px;
                background: #248a42;
                transition: width 0.3s ease;
            }

            .footer-ofppt a:hover {
                color:  #03ae12;
                transform: translateX(4px);
            }

            .footer-ofppt a:hover::after {
                width: 100%;
            }

            .footer-ofppt i {
                color:  #248a42;
                margin-right: 8px;
            }

            .social-icons {
                margin-top: 20px;
                display: flex;
                justify-content: center;
                gap: 15px;
            }

            .social-icons a {
                width: 44px;
                height: 44px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: rgba(255, 255, 255, 0.08);
                color: #e2e8f0;
                transition: all 0.4s ease;
                font-size: 1.1rem;
                position: relative;
                overflow: hidden;
            }

            .social-icons a:hover {
                background-color:  #dfe2e0;
                color: #fff;
                transform: translateY(-5px);
                box-shadow: 0 0 15px rgba(120,190,32,0.4);
            }

            .footer-bottom {
                border-top: 1px solid rgba(255, 255, 255, 0.15);
                margin-top: 5px;
                text-align: center;
                padding-top: 5px;
                position: relative;
                z-index: 2;
            }

            .footer-bottom p {
                color: #cbd5e1;
                font-size: 0.9rem;
            }

            .fade-in {
                opacity: 0;
                transform: translateY(40px);
                animation: fadeSlideUp 1.2s ease forwards;
            }

            @keyframes fadeSlideUp {
                0% { opacity: 0; transform: translateY(40px); }
                100% { opacity: 1; transform: translateY(0); }
            }

            @media (max-width: 1200px) {
                .footer-container { grid-template-columns: repeat(3, 1fr); }
            }

            @media (max-width: 768px) {
                .footer-container { grid-template-columns: repeat(2, 1fr); text-align: center; }
                .social-icons { justify-content: center; }
                .footer-ofppt h3::after { margin: 6px auto; }
            }

            @media (max-width: 600px) {
                .footer-container { grid-template-columns: 1fr; }
            }
        `;

        // Inject CSS
        const styleElement = document.createElement('style');
        styleElement.textContent = cssStyles;
        document.head.appendChild(styleElement);

        // Inject HTML
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
        document.body.insertAdjacentHTML('beforeend', footerHTML);

        // Initialize functionality
        initializeHeaderFooter();
    });

    // Initialize all functionality
    function initializeHeaderFooter() {
        // Hamburger menu functionality
        const menuToggle = document.getElementById('menu-toggle');
        const mainNav = document.getElementById('main-nav');
        const menuItemsWithSubmenu = document.querySelectorAll('.menu-item.has-submenu');
        
        if (menuToggle && mainNav) {
            // Toggle menu visibility
            menuToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                this.classList.toggle('active');
                mainNav.classList.toggle('active');
                
                // Close all submenus when closing the main menu
                if (!mainNav.classList.contains('active')) {
                    menuItemsWithSubmenu.forEach(item => {
                        item.classList.remove('active');
                    });
                }
            });
            
            // Toggle submenus on mobile
            menuItemsWithSubmenu.forEach(item => {
                const navLink = item.querySelector('.nav-link');
                const submenu = item.querySelector('.submenu');
                
                navLink.addEventListener('click', function(e) {
                    if (window.innerWidth <= 1024) { // Updated breakpoint
                        // Only prevent default for parent menu items with submenus
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Close other submenus
                        menuItemsWithSubmenu.forEach(otherItem => {
                            if (otherItem !== item) {
                                otherItem.classList.remove('active');
                            }
                        });
                        
                        // Toggle current submenu
                        item.classList.toggle('active');
                    }
                });
                
                // Add click events to submenu items for navigation
                if (submenu) {
                    const submenuLinks = submenu.querySelectorAll('a');
                    submenuLinks.forEach(subLink => {
                        subLink.addEventListener('click', function(e) {
                            if (window.innerWidth <= 1024) { // Updated breakpoint
                                // Allow normal navigation for submenu items
                                // Close the mobile menu
                                menuToggle.classList.remove('active');
                                mainNav.classList.remove('active');
                                
                                // Close all submenus
                                menuItemsWithSubmenu.forEach(item => {
                                    item.classList.remove('active');
                                });
                                
                                // The click will naturally navigate to the href
                            }
                        });
                    });
                }
            });
            
            // Close menu when clicking outside on mobile
            document.addEventListener('click', function(e) {
                if (window.innerWidth <= 1024 && mainNav.classList.contains('active')) { // Updated breakpoint
                    if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
                        menuToggle.classList.remove('active');
                        mainNav.classList.remove('active');
                        
                        // Close all submenus
                        menuItemsWithSubmenu.forEach(item => {
                            item.classList.remove('active');
                        });
                    }
                }
            });
            
            // Close menu when clicking on a direct link (no submenu)
            const directNavLinks = document.querySelectorAll('.menu-item:not(.has-submenu) .nav-link');
            directNavLinks.forEach(link => {
                link.addEventListener('click', function() {
                    if (window.innerWidth <= 1024) { // Updated breakpoint
                        menuToggle.classList.remove('active');
                        mainNav.classList.remove('active');
                        
                        // Close all submenus
                        menuItemsWithSubmenu.forEach(item => {
                            item.classList.remove('active');
                        });
                    }
                });
            });
            
            // Handle window resize
            window.addEventListener('resize', function() {
                if (window.innerWidth > 1024) { // Updated breakpoint
                    // Reset menu state on desktop
                    menuToggle.classList.remove('active');
                    mainNav.classList.remove('active');
                    
                    // Close all submenus
                    menuItemsWithSubmenu.forEach(item => {
                        item.classList.remove('active');
                    });
                }
            });
        }

        // Footer animation
        const footerOverlay = document.querySelector('.footer-overlay');
        if (footerOverlay) {
            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY;
                const offset = scrollY * 0.05; 
                footerOverlay.style.transform = `translate(${offset}px, ${offset / 2}px)`;
            });
        }

        // Animation effects
        const fadeElements = document.querySelectorAll('.fade-in-up');
        if (fadeElements.length > 0) {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) entry.target.classList.add('visible');
                });
            }, { threshold: 0.2 });
            fadeElements.forEach(el => observer.observe(el));
        }

        // Counter animation (if stats section exists)
        const statsSection = document.querySelector('.apercu-rapide');
        if (statsSection) {
            const statCards = document.querySelectorAll('.stat-card');
            let animated = false;

            function animateCounter(counter, target, duration = 2500) {
                let start = 0;
                const startTime = performance.now();

                function update(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const value = Math.floor(start + (target - start) * easeOut);
                    counter.textContent = `+${value.toLocaleString()}`;
                    if (progress < 1) requestAnimationFrame(update);
                }
                requestAnimationFrame(update);
            }

            const statObserver = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting && !animated) {
                    statCards.forEach(card => {
                        const counter = card.querySelector('.stat-number');
                        if (counter) {
                            const target = +counter.getAttribute('data-target');
                            animateCounter(counter, target);
                            card.classList.add('visible');
                        }
                    });
                    animated = true;
                }
            }, { threshold: 0.4 });

            statObserver.observe(statsSection);
        }
    }
})();