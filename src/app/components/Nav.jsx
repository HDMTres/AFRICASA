"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaUser, FaSignOutAlt, FaTachometerAlt, FaSearch } from 'react-icons/fa';

import nav from '../data/nav';

import './nav.css';

const Nav = () => {
    const [scroll, setScroll] = useState(0);
    const [navList, setNavList] = useState(nav);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const handleOpenSearchForm = () => {
        document.body.classList.remove("box-collapse-closed");
        document.body.classList.add("box-collapse-open");
    };

    // Vérifier l'état de connexion
    useEffect(() => {
        const checkAuthStatus = () => {
            if (typeof window !== 'undefined') {
                const token = localStorage.getItem('token');
                const userData = localStorage.getItem('user');
                
                if (token && userData) {
                    setIsLoggedIn(true);
                    setUser(JSON.parse(userData));
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            }
        };

        checkAuthStatus();
        
        // Écouter les changements dans le localStorage
        window.addEventListener('storage', checkAuthStatus);
        
        return () => {
            window.removeEventListener('storage', checkAuthStatus);
        };
    }, []);

    // Fermer le dropdown en cliquant ailleurs
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showUserDropdown && !event.target.closest('.user-dropdown')) {
                setShowUserDropdown(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [showUserDropdown]);

    // Gérer la déconnexion
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isAuth');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('remember_me');
        localStorage.removeItem('justLoggedIn');
        
        setIsLoggedIn(false);
        setUser(null);
        setShowUserDropdown(false);
        
        // Redirection vers l'accueil
        window.location.href = '/';
    };

    // Filtrer la navigation selon l'état de connexion
    const getFilteredNavList = () => {
        if (isLoggedIn) {
            // Retirer "Se Connecter" si l'utilisateur est connecté
            return navList.filter(item => item.id !== 6);
        }
        return navList;
    };

    useEffect(() => {
        window.addEventListener('scroll', () => {
            setScroll(window.scrollY);
        });

        return () => {
            window.removeEventListener('scroll', () => {
                setScroll(window.scrollY);
            });
        };
    }, [scroll]);

    const handleNavOnClick = (id) => {
        const newNavList = navList.map(nav => {
            nav.active = false;

            if (nav.id === id) nav.active = true;

            return nav;
        });

        setNavList(newNavList);
    };

    // Gérer la recherche
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Rediriger vers la page de recherche avec la query
            window.location.href = `/properties?search=${encodeURIComponent(searchQuery.trim())}`;
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <nav className={`navbar navbar-default navbar-expand-lg fixed-top 
            ${scroll > 100 ? 'navbar-reduce' : 'navbar-trans'}`}>
            <div className="container">
                {/* Bouton hamburger pour mobile */}
                <button
                    className='navbar-toggler collapsed'
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarDefault"
                    aria-controls="navbarDefault"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                {/* Logo */}
                <a href="/" className='navbar-brand text-brand'>
                    AFRI<span className='color-b'>CASA</span>
                </a>

                {/* Contenu principal de la navbar */}
                <div className='navbar-collapse collapse justify-content-center' id="navbarDefault">
                    <ul className="navbar-nav">
                        {getFilteredNavList().map(item => (
                            <li className='nav-item' key={item.id}>
                                <Link
                                    className={`nav-link ${item.active ? 'active' : undefined} ${item.id === 6 ? 'login-btn' : ''}`}
                                    href={item.link}
                                    onClick={() => handleNavOnClick(item.id)}
                                >
                                    {item.name === 'Accueil' ? (
                                        <i className='bi bi-house-door-fill'></i>
                                    ) : (
                                        item.name
                                    )}
                                </Link>
                            </li>
                        ))}
                        
                        {/* Menu utilisateur connecté */}
                        {isLoggedIn && user && (
                            <li className="nav-item dropdown user-dropdown">
                                <button
                                    className="nav-link dropdown-toggle user-menu-btn"
                                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                                    aria-expanded={showUserDropdown}
                                >
                                    <FaUser className="user-icon" />
                                    <span className="user-name">
                                        {user.firstName || user.fullName || user.name || 'User'}
                                    </span>
                                </button>
                                
                                {showUserDropdown && (
                                    <div className="dropdown-menu user-dropdown-menu show">
                                        <div className="dropdown-header">
                                            <strong>{user.firstName} {user.lastName}</strong>
                                            <small className="text-muted">{user.role}</small>
                                        </div>
                                        <div className="dropdown-divider"></div>
                                        <Link href="/dashboard" className="dropdown-item">
                                            <FaTachometerAlt className="me-2" />
                                            Dashboard
                                        </Link>
                                        <Link href="/profil" className="dropdown-item">
                                            <FaUser className="me-2" />
                                            Mon Profil
                                        </Link>
                                        <div className="dropdown-divider"></div>
                                        <button onClick={handleLogout} className="dropdown-item logout-btn">
                                            <FaSignOutAlt className="me-2" />
                                            Déconnexion
                                        </button>
                                    </div>
                                )}
                            </li>
                        )}
                    </ul>
                </div>

                {/* Barre de recherche moderne */}
                <div className="d-none d-lg-flex">
                    <form onSubmit={handleSearch} className="search-container">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Rechercher un bien..."
                            value={searchQuery}
                            onChange={handleSearchInputChange}
                        />
                        <button type="submit" className="search-btn">
                            <FaSearch />
                        </button>
                    </form>
                </div>

                {/* Version mobile de la recherche */}
                <div className="d-lg-none">
                    <button
                        type='button'
                        className='btn btn-b-n navbar-toggle-box navbar-toggle-box-collapse'
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo01"
                        onClick={handleOpenSearchForm}
                    >
                        <i className='bi bi-search'></i>
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
