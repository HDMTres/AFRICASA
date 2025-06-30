"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaHome, FaExclamationTriangle, FaGoogle, FaFacebookF, FaCheck } from 'react-icons/fa';
import { MdSecurity, MdDashboard, MdLocationSearching } from 'react-icons/md';
import NoNavLayout from '../components/NoNavLayout';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const searchParams = useSearchParams();

    // Vérifier si l'utilisateur vient de s'inscrire avec succès
    useEffect(() => {
        const message = searchParams.get('message');
        if (message === 'inscription-reussie') {
            setSuccessMessage('Inscription réussie ! Vous pouvez maintenant vous connecter.');
        }
    }, [searchParams]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');
        setSuccessMessage('');
        
        try {
            const response = await fetch('http://127.0.0.1:8080/users/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                // Stocker le token JWT
                localStorage.setItem('token', data.token);
                localStorage.setItem('isAuth', 'true');
                localStorage.setItem('username', username);
                
                // Stocker davantage d'informations si "Se souvenir de moi" est coché
                if (rememberMe) {
                    localStorage.setItem('remember_me', 'true');
                }
                
                // Rediriger vers le dashboard
                window.location.href = '/dashboard';
            } else {
                setErrorMessage(data.message || 'Nom d\'utilisateur ou mot de passe incorrect');
            }
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            setErrorMessage('Erreur de connexion. Vérifiez votre connexion internet.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <NoNavLayout>
            <section className="auth-container">
                {/* Sidebar informatif (visible sur desktop uniquement) */}
                <div className="auth-sidebar">
                    <div className="auth-sidebar-pattern"></div>
                    <div className="auth-sidebar-overlay"></div>
                    <div className="auth-sidebar-content">
                        <div className="auth-sidebar-logo">AFRICASA</div>
                        <div className="auth-sidebar-text">
                            <h2>Bienvenue sur la plateforme immobilière de référence en Afrique</h2>
                            <p>Connectez-vous pour découvrir des propriétés exclusives et gérer vos annonces immobilières.</p>
                        </div>
                        <ul className="auth-feature-list">
                            <li><MdSecurity size={20} /> Transactions sécurisées et fiables</li>
                            <li><MdDashboard size={20} /> Tableau de bord personnalisé</li>
                            <li><MdLocationSearching size={20} /> Recherche avancée de biens immobiliers</li>
                        </ul>
                    </div>
                </div>
                
                {/* Contenu principal du formulaire */}
                <div className="auth-main">
                    <div className="auth-card">
                        <div className="auth-header">
                            <div className="brand-logo">
                                <h2>AFRICASA</h2>
                                <span>Votre maison, notre passion</span>
                            </div>
                        </div>
                        
                        <div className="auth-form">
                            <h1>Connexion</h1>
                            <p className="auth-subtitle">Entrez vos identifiants pour accéder à votre espace personnel</p>
                            
                            {successMessage && (
                                <div className="success-message">
                                    <FaCheck /> {successMessage}
                                </div>
                            )}
                            
                            <form onSubmit={handleLogin}>
                                <div className="input-group">
                                    <label htmlFor="username">Nom d'utilisateur</label>
                                    <div className="input-box">
                                        <FaUser className="input-icon" />
                                        <input 
                                            id="username"
                                            type="text" 
                                            placeholder="Votre nom d'utilisateur" 
                                            value={username} 
                                            onChange={(e) => setUsername(e.target.value)} 
                                            required 
                                        />
                                    </div>
                                </div>
                                
                                <div className="input-group">
                                    <label htmlFor="password">Mot de passe</label>
                                    <div className="input-box">
                                        <FaLock className="input-icon" />
                                        <input 
                                            id="password"
                                            type={showPassword ? "text" : "password"} 
                                            placeholder="Votre mot de passe" 
                                            value={password} 
                                            onChange={(e) => setPassword(e.target.value)} 
                                            required 
                                        />
                                        <button
                                            type="button"
                                            className="password-toggle"
                                            aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </button>
                                    </div>
                                </div>

                                <div className="form-options">
                                    <div className="checkbox-group">
                                        <input 
                                            type="checkbox" 
                                            id="remember-me" 
                                            checked={rememberMe}
                                            onChange={() => setRememberMe(!rememberMe)}
                                        />
                                        <label htmlFor="remember-me">Se souvenir de moi</label>
                                    </div>
                                    <Link href="/forgot-password" className="forgot-link">
                                        Mot de passe oublié?
                                    </Link>
                                </div>

                                <button 
                                    type="submit" 
                                    className={`auth-button ${isLoading ? 'loading' : ''}`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Connexion en cours...' : 'Se connecter'}
                                </button>
                                
                                {errorMessage && (
                                    <div className="error-message">
                                        <FaExclamationTriangle /> {errorMessage}
                                    </div>
                                )}
                            </form>
                            
                            <div className="auth-divider">
                                <span>ou connectez-vous avec</span>
                            </div>
                            
                            <div className="social-buttons">
                                <a href="#" className="social-button">
                                    <FaGoogle /> Google
                                </a>
                                <a href="#" className="social-button">
                                    <FaFacebookF /> Facebook
                                </a>
                            </div>
                            
                            <div className="auth-footer">
                                <p>Vous n'avez pas de compte ? 
                                    <Link href="/signup" className="auth-link"> Inscrivez-vous</Link>
                                </p>
                                <Link href="/" className="back-link">
                                    <FaHome /> Retour à l'accueil
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </NoNavLayout>
    );
};

export default Login;
