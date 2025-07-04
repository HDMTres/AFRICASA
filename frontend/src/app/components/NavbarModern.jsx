"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaSearch, FaBars, FaTimes, FaHome, FaBuilding, FaUsers, FaEnvelope, FaUser, FaTachometerAlt, FaSignOutAlt } from 'react-icons/fa';

import '../styles/africasa-design-system.css';

const NavbarModern = () => {
    const [scroll, setScroll] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isAuthLoading, setIsAuthLoading] = useState(true); // Nouvel état pour le chargement

    // Navigation links
    const navLinks = [
        { name: 'Accueil', path: '/', icon: FaHome },
        { name: 'Propriétés', path: '/properties', icon: FaBuilding },
        { name: 'Agents', path: '/agents', icon: FaUsers },
        { name: 'À propos', path: '/about', icon: FaUser },
        { name: 'Contact', path: '/contact', icon: FaEnvelope }
    ];

    // Vérifier l'état de connexion et ajouter la classe body
    useEffect(() => {
        // Ajouter la classe with-navbar au body pour le padding-top
        if (typeof window !== 'undefined') {
            document.body.classList.add('with-navbar');
        }

        const checkAuthStatus = () => {
            if (typeof window !== 'undefined') {
                setIsAuthLoading(true); // Commencer le chargement
                
                const token = localStorage.getItem('token');
                const userData = localStorage.getItem('user');
                
                console.log('Token trouvé:', !!token); // Debug
                console.log('User data trouvé:', !!userData); // Debug
                
                if (token && userData) {
                    try {
                        const parsedUser = JSON.parse(userData);
                        console.log('Utilisateur parsé:', parsedUser); // Debug
                        setIsLoggedIn(true);
                        setUser(parsedUser);
                    } catch (error) {
                        console.log('Erreur parsing user data:', error); // Debug
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                        setIsLoggedIn(false);
                        setUser(null);
                    }
                } else {
                    console.log('Pas de token ou user data'); // Debug
                    setIsLoggedIn(false);
                    setUser(null);
                }
                
                setIsAuthLoading(false); // Fin du chargement
            }
        };

        // Vérifier immédiatement
        checkAuthStatus();
        
        // Écouter les changements du localStorage
        window.addEventListener('storage', checkAuthStatus);
        
        return () => {
            window.removeEventListener('storage', checkAuthStatus);
            if (typeof window !== 'undefined') {
                document.body.classList.remove('with-navbar');
            }
        };
    }, []);

    // Gérer le scroll
    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.pageYOffset);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fermer les menus en cliquant ailleurs
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.user-dropdown') && !event.target.closest('.user-avatar-btn')) {
                setShowUserDropdown(false);
            }
            if (!event.target.closest('.mobile-menu-panel') && !event.target.closest('.mobile-menu-btn')) {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    // Gérer l'ouverture de la recherche
    const handleOpenSearch = () => {
        document.body.classList.remove("box-collapse-closed");
        document.body.classList.add("box-collapse-open");
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
        setShowUserDropdown(false);
        window.location.href = '/';
    };

    // Fonction pour forcer la vérification de l'authentification
    const forceAuthCheck = () => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('token');
            const userData = localStorage.getItem('user');
            
            console.log('Force check - Token:', !!token, 'UserData:', !!userData);
            
            if (token && userData) {
                try {
                    const parsedUser = JSON.parse(userData);
                    console.log('Force check - Utilisateur:', parsedUser);
                    setIsLoggedIn(true);
                    setUser(parsedUser);
                } catch (error) {
                    console.log('Force check - Erreur:', error);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    setIsLoggedIn(false);
                    setUser(null);
                }
            } else {
                setIsLoggedIn(false);
                setUser(null);
            }
        }
    };

    // Vérification périodique pour s'assurer de la cohérence
    useEffect(() => {
        const interval = setInterval(forceAuthCheck, 2000); // Vérifier toutes les 2 secondes
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <nav className={`africasa-navbar ${scroll > 20 ? 'scrolled' : 'transparent'}`}>
                <div className="navbar-container">
                    {/* Logo AFRICASA */}
                    <Link href="/" className="africasa-logo">
                        <div className="logo-icon">
                            <FaHome />
                        </div>
                        <span className="logo-text">AFRICASA</span>
                    </Link>

                    {/* Navigation Desktop */}
                    <ul className="nav-links">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link href={link.path} className="nav-link">
                                    <link.icon size={16} />
                                    <span>{link.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Actions Desktop */}
                    <div className="navbar-actions">
                        {/* Bouton recherche */}
                        <button className="search-btn" onClick={handleOpenSearch}>
                            <FaSearch size={18} />
                            <span className="sr-only">Rechercher</span>
                        </button>

                        {/* Section utilisateur */}
                        {isAuthLoading ? (
                            <div className="auth-loading">
                                <div style={{ 
                                    padding: '0.5rem', 
                                    fontSize: '0.875rem',
                                    color: 'var(--primary-color)',
                                    opacity: 0.7
                                }}>
                                    Chargement...
                                </div>
                            </div>
                        ) : isLoggedIn ? (
                            <div className="user-dropdown">
                                <button
                                    className="user-avatar-btn"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        console.log('🔥 BOUTON CLIQUE !');
                                        console.log('État actuel:', showUserDropdown);
                                        setShowUserDropdown(!showUserDropdown);
                                        console.log('Nouvel état:', !showUserDropdown);
                                    }}
                                    style={{ cursor: 'pointer', position: 'relative', zIndex: 999 }}
                                >
                                    <div className="user-avatar">
                                        {(user?.fullName || user?.firstName || user?.name)?.charAt(0)?.toUpperCase() || 'U'}
                                    </div>
                                    <span className="user-name">
                                        {user?.fullName || user?.firstName || user?.name || 'Utilisateur'}
                                    </span>
                                </button>

                                <div 
                                    className={`dropdown-menu ${showUserDropdown ? 'open' : ''}`}
                                    style={{ 
                                        position: 'absolute',
                                        top: '100%',
                                        right: '0',
                                        zIndex: 1000,
                                        backgroundColor: 'white',
                                        border: '1px solid #ccc',
                                        borderRadius: '8px',
                                        minWidth: '200px',
                                        display: showUserDropdown ? 'block' : 'none'
                                    }}
                                >
                                    <div className="dropdown-header">
                                        <div className="dropdown-user-name">
                                            {user?.fullName || user?.firstName || user?.name || 'Utilisateur'}
                                        </div>
                                        <div className="dropdown-user-email">
                                            {user?.email || 'email@exemple.com'}
                                        </div>
                                    </div>
                                    <div className="dropdown-content">
                                        <Link
                                            href="/profil"
                                            className="dropdown-item"
                                            onClick={() => setShowUserDropdown(false)}
                                        >
                                            <FaUser size={16} />
                                            <span>Mon Profil</span>
                                        </Link>
                                        <Link
                                            href="/dashboard"
                                            className="dropdown-item"
                                            onClick={() => setShowUserDropdown(false)}
                                        >
                                            <FaTachometerAlt size={16} />
                                            <span>Dashboard</span>
                                        </Link>
                                        <div className="dropdown-divider"></div>
                                        <button
                                            onClick={handleLogout}
                                            className="dropdown-item danger"
                                        >
                                            <FaSignOutAlt size={16} />
                                            <span>Déconnexion</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="auth-buttons">
                                <Link href="/login" className="btn-auth login">
                                    Se connecter
                                </Link>
                                <Link href="/signup" className="btn-auth signup">
                                    S'inscrire
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Actions Mobile */}
                    <div className="mobile-actions">
                        <button className="search-btn" onClick={handleOpenSearch}>
                            <FaSearch size={18} />
                        </button>
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
                <div className={`mobile-menu-panel ${mobileMenuOpen ? 'open' : ''}`}>
                    {/* Header Mobile */}
                    <div className="mobile-menu-header">
                        <div className="mobile-menu-logo">
                            <div className="logo-icon">
                                <FaHome />
                            </div>
                            <span className="logo-text">AFRICASA</span>
                        </div>
                        <button
                            className="mobile-close-btn"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>

                    {/* Contenu Mobile */}
                    <div className="mobile-menu-content">
                        {/* Navigation Links */}
                        <ul className="mobile-nav-links">
                            {navLinks.map((link) => (
                                <li key={link.name} className="mobile-nav-item">
                                    <Link
                                        href={link.path}
                                        className="mobile-nav-link"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <link.icon size={18} />
                                        <span>{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Section Utilisateur Mobile */}
                        {isLoggedIn ? (
                            <div className="mobile-user-section">
                                <div className="mobile-user-info">
                                    <div className="mobile-user-avatar">
                                        {(user?.fullName || user?.firstName || user?.name)?.charAt(0)?.toUpperCase() || 'U'}
                                    </div>
                                    <div className="mobile-user-details">
                                        <div className="mobile-user-name">
                                            {user?.fullName || user?.firstName || user?.name || 'Utilisateur'}
                                        </div>
                                        <div className="mobile-user-email">
                                            {user?.email || 'email@exemple.com'}
                                        </div>
                                    </div>
                                </div>

                                <ul className="mobile-user-actions">
                                    <li className="mobile-nav-item">
                                        <Link
                                            href="/profil"
                                            className="mobile-nav-link"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <FaUser size={18} />
                                            <span>Mon Profil</span>
                                        </Link>
                                    </li>
                                    <li className="mobile-nav-item">
                                        <Link
                                            href="/dashboard"
                                            className="mobile-nav-link"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <FaTachometerAlt size={18} />
                                            <span>Dashboard</span>
                                        </Link>
                                    </li>
                                    <li className="mobile-nav-item">
                                        <button
                                            onClick={handleLogout}
                                            className="mobile-nav-link danger"
                                            style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left' }}
                                        >
                                            <FaSignOutAlt size={18} />
                                            <span>Déconnexion</span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="mobile-user-section">
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                    <Link
                                        href="/login"
                                        className="btn-auth login"
                                        style={{ textAlign: 'center', padding: '0.75rem' }}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        Se connecter
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="btn-auth signup"
                                        style={{ textAlign: 'center', padding: '0.75rem' }}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        S'inscrire
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Search Overlay (conserver la fonctionnalité existante) */}
            <div className="box-collapse" id="searchbox">
                <div className="title-box">
                    <div className="title-a">Recherche</div>
                    <div className="btn-box-collapse-closed" onClick={() => {
                        document.body.classList.add("box-collapse-closed");
                        document.body.classList.remove("box-collapse-open");
                    }}>
                        <i className="bi bi-x"></i>
                    </div>
                </div>
                <div className="box-collapse-wrap">
                    <form className="form-a">
                        <div className="row">
                            <div className="col-md-12 mb-2">
                                <div className="form-group">
                                    <label htmlFor="search-input">Rechercher une propriété</label>
                                    <input 
                                        type="text" 
                                        className="form-control form-control-lg" 
                                        id="search-input" 
                                        placeholder="Tapez votre recherche..." 
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group">
                                    <label htmlFor="Type">Type</label>
                                    <select className="form-control form-select form-control-a" id="Type">
                                        <option>Tous les types</option>
                                        <option>Vente</option>
                                        <option>Location</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group">
                                    <label htmlFor="city">Ville</label>
                                    <select className="form-control form-select form-control-a" id="city">
                                        <option>Toutes les villes</option>
                                        <option>Dakar</option>
                                        <option>Abidjan</option>
                                        <option>Lagos</option>
                                        <option>Casablanca</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <button type="submit" className="btn btn-b">Rechercher</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default NavbarModern;
