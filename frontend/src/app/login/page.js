"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaHome, FaExclamationTriangle, FaGoogle, FaFacebookF, FaCheck } from 'react-icons/fa';
import { MdSecurity, MdDashboard, MdLocationSearching } from 'react-icons/md';

const Login = () => {
    const [email, setEmail] = useState(''); // Changé de username à email
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();

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
            console.log('🔄 Tentative de connexion vers: http://localhost:5000/api/users/login');
            
            // URL CORRIGÉE
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    email: email,  // Changé de username à email
                    password: password 
                })
            });
            
            console.log('📡 Réponse reçue:', response.status);
            
            if (response.ok) {
                const data = await response.json();
                console.log('✅ Connexion réussie:', data.message);
                
                // Stocker les données
                localStorage.setItem('token', data.token);
                localStorage.setItem('isAuth', 'true');
                localStorage.setItem('userEmail', email);
                
                if (data.user) {
                    localStorage.setItem('user', JSON.stringify(data.user));
                }
                
                if (rememberMe) {
                    localStorage.setItem('remember_me', 'true');
                }
                
                // ✅ MARQUER QUE L'UTILISATEUR VIENT DE SE CONNECTER
                localStorage.setItem('justLoggedIn', 'true');
                
                // Redirection intelligente selon le rôle
                if (data.user && data.user.role === 'agent') {
                    window.location.href = '/dashboard';
                } else {
                    window.location.href = '/';
                }
                
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erreur de connexion');
            }
            
        } catch (error) {
            console.error('❌ Erreur lors de la connexion :', error);
            setErrorMessage(error.message || 'Erreur de connexion. Vérifiez vos identifiants.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <section className="auth-container-simple">
                {/* Contenu principal du formulaire - centré */}
                <div className="auth-main-centered">
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
                                    <label htmlFor="email">Email</label> {/* Changé le label */}
                                    <div className="input-box">
                                        <FaUser className="input-icon" />
                                        <input 
                                            id="email"
                                            type="email" // Changé le type
                                            placeholder="Votre adresse email" // Changé le placeholder
                                            value={email} 
                                            onChange={(e) => setEmail(e.target.value)} 
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
    );
};

export default Login;
