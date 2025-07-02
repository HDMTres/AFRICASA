"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaUser, FaSignOutAlt, FaTachometerAlt, FaSearch, FaBars, FaTimes, FaHome, FaBuilding, FaUsers, FaEnvelope, FaPlus } from 'react-icons/fa';

import './nav.css';

const Nav = () => {
    const [scroll, setScroll] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
                    // Simuler un utilisateur connecté pour les tests
                    setIsLoggedIn(true);
                    setUser({
                        name: 'Amadou Diallo',
                        email: 'amadou.diallo@africasa.com'
                    });
                }
            }
        };

        checkAuthStatus();
        
        window.addEventListener('storage', checkAuthStatus);
        return () => window.removeEventListener('storage', checkAuthStatus);
    }, []);

    // Gérer le scroll
    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.pageYOffset;
            setScroll(currentScroll);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Fermer les menus en cliquant ailleurs
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.user-dropdown') && !event.target.closest('.user-avatar')) {
                setShowUserDropdown(false);
            }
            if (!event.target.closest('.mobile-menu') && !event.target.closest('.mobile-menu-btn')) {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setUser(null);
        setShowUserDropdown(false);
    };

    const navLinks = [
        { name: 'Accueil', path: '/', icon: FaHome },
        { name: 'Propriétés', path: '/properties', icon: FaBuilding },
        { name: 'Agents', path: '/agents', icon: FaUsers },
        { name: 'À propos', path: '/about', icon: FaUser },
        { name: 'Contact', path: '/contact', icon: FaEnvelope }
    ];

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scroll > 20 
                    ? 'bg-white/95 backdrop-blur-lg py-2 shadow-lg border-b border-gray-100' 
                    : 'bg-transparent py-4'
            }`}>
                <nav className="container-fluid px-4">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2 z-50">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                                <FaHome className="text-white text-lg" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                                AFRICASA
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <ul className="hidden lg:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <li key={link.name} className="relative group">
                                    <Link 
                                        href={link.path} 
                                        className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200 py-2 font-medium relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
                                    >
                                        <link.icon className="text-sm" />
                                        <span>{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* Desktop Actions */}
                        <div className="hidden lg:flex items-center space-x-4">
                            {/* Search Button */}
                            <button
                                onClick={handleOpenSearchForm}
                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                            >
                                <FaSearch className="text-lg" />
                            </button>

                            {/* User Section */}
                            {isLoggedIn ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setShowUserDropdown(!showUserDropdown)}
                                        className="user-avatar flex items-center space-x-2 p-2 hover:bg-gray-50 rounded-lg transition-all duration-200"
                                    >
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </div>
                                        <span className="text-gray-700 font-medium hidden xl:block">
                                            {user?.name || 'Utilisateur'}
                                        </span>
                                    </button>

                                    {/* User Dropdown */}
                                    {showUserDropdown && (
                                        <div className="user-dropdown absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <p className="text-sm font-medium text-gray-900">{user?.name || 'Utilisateur'}</p>
                                                <p className="text-sm text-gray-500">{user?.email || 'email@exemple.com'}</p>
                                            </div>
                                            <div className="py-2">
                                                <Link 
                                                    href="/dashboard" 
                                                    className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                                    onClick={() => setShowUserDropdown(false)}
                                                >
                                                    <FaTachometerAlt className="text-lg" />
                                                    <span>Dashboard</span>
                                                </Link>
                                                <Link 
                                                    href="/profil" 
                                                    className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                                    onClick={() => setShowUserDropdown(false)}
                                                >
                                                    <FaUser className="text-lg" />
                                                    <span>Mon Profil</span>
                                                </Link>
                                                <Link 
                                                    href="/add-property" 
                                                    className="flex items-center space-x-3 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                                    onClick={() => setShowUserDropdown(false)}
                                                >
                                                    <FaPlus className="text-lg" />
                                                    <span>Ajouter Propriété</span>
                                                </Link>
                                                <hr className="my-2" />
                                                <button 
                                                    onClick={handleLogout}
                                                    className="flex items-center space-x-3 px-4 py-2 w-full text-left text-red-600 hover:bg-red-50 transition-colors duration-200"
                                                >
                                                    <FaSignOutAlt className="text-lg" />
                                                    <span>Déconnexion</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center space-x-3">
                                    <Link 
                                        href="/login" 
                                        className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                                    >
                                        Se connecter
                                    </Link>
                                    <Link 
                                        href="/signup" 
                                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                                    >
                                        S'inscrire
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden flex items-center space-x-2">
                            {/* Mobile Search */}
                            <button
                                onClick={handleOpenSearchForm}
                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                            >
                                <FaSearch className="text-lg" />
                            </button>
                            
                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="mobile-menu-btn p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                            >
                                {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}>
                {/* Overlay */}
                <div 
                    className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                    onClick={() => setMobileMenuOpen(false)}
                ></div>
                
                {/* Mobile Menu Panel */}
                <div className={`mobile-menu absolute inset-y-0 right-0 w-80 max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
                    mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
                }`}>
                    <div className="flex flex-col h-full">
                        {/* Mobile Header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                                    <FaHome className="text-white text-sm" />
                                </div>
                                <span className="text-lg font-bold text-gray-900">AFRICASA</span>
                            </div>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        {/* Mobile Navigation */}
                        <div className="flex-1 overflow-y-auto py-6">
                            <nav className="px-6">
                                <ul className="space-y-2">
                                    {navLinks.map((link) => (
                                        <li key={link.name}>
                                            <Link 
                                                href={link.path}
                                                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200 font-medium"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <link.icon className="text-lg" />
                                                <span>{link.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>

                                {/* Mobile User Section */}
                                {isLoggedIn ? (
                                    <div className="mt-8 pt-6 border-t border-gray-100">
                                        <div className="flex items-center space-x-3 px-4 py-3 mb-4">
                                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{user?.name || 'Utilisateur'}</p>
                                                <p className="text-xs text-gray-500">{user?.email || 'email@exemple.com'}</p>
                                            </div>
                                        </div>
                                        
                                        <ul className="space-y-2">
                                            <li>
                                                <Link 
                                                    href="/dashboard"
                                                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    <FaTachometerAlt className="text-lg" />
                                                    <span>Dashboard</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link 
                                                    href="/profil"
                                                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    <FaUser className="text-lg" />
                                                    <span>Mon Profil</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link 
                                                    href="/add-property"
                                                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    <FaPlus className="text-lg" />
                                                    <span>Ajouter Propriété</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <button 
                                                    onClick={handleLogout}
                                                    className="flex items-center space-x-3 px-4 py-3 w-full text-left text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                                                >
                                                    <FaSignOutAlt className="text-lg" />
                                                    <span>Déconnexion</span>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                ) : (
                                    <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
                                        <Link 
                                            href="/login"
                                            className="block w-full px-4 py-3 text-center text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            Se connecter
                                        </Link>
                                        <Link 
                                            href="/signup"
                                            className="block w-full px-4 py-3 text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            S'inscrire
                                        </Link>
                                    </div>
                                )}
                            </nav>
                        </div>
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
                    <form className="form-a" onSubmit={(e) => {
                        e.preventDefault();
                        // Logique de recherche ici
                    }}>
                        <div className="row">
                            <div className="col-md-12 mb-2">
                                <div className="form-group">
                                    <label htmlFor="search-input">Rechercher une propriété</label>
                                    <input type="text" className="form-control form-control-lg" id="search-input" placeholder="Tapez votre recherche..." />
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

export default Nav;
