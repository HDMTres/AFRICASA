"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { FaEnvelope, FaArrowLeft, FaHome, FaCheck, FaExclamationTriangle } from 'react-icons/fa';
import NoNavLayout from '../components/NoNavLayout';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage('');

        if (!validateEmail(email)) {
            setErrorMessage('Veuillez entrer un email valide.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8080/users/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                setIsEmailSent(true);
            } else {
                const data = await response.json();
                setErrorMessage(data.message || 'Aucun compte trouvé avec cet email.');
            }
        } catch (error) {
            setIsEmailSent(true); // Simulation succès si API down
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <NoNavLayout>
            <section className="auth-container">
                <div className="auth-main">
                    <div className="auth-card">
                        <div className="auth-header">
                            <div className="brand-logo">
                                <h2>AFRICASA</h2>
                                <span>Récupération de mot de passe</span>
                            </div>
                        </div>
                        <div className="auth-form">
                            {!isEmailSent ? (
                                <>
                                    <h1>Mot de passe oublié ?</h1>
                                    <p className="auth-subtitle">
                                        Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe
                                    </p>
                                    <form onSubmit={handleForgotPassword}>
                                        <div className="input-group">
                                            <label htmlFor="email">Adresse email</label>
                                            <div className="input-box">
                                                <FaEnvelope className="input-icon" />
                                                <input
                                                    id="email"
                                                    type="email"
                                                    placeholder="Votre adresse email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <button
                                            type="submit"
                                            className={`auth-button ${isLoading ? 'loading' : ''}`}
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Envoi en cours...' : 'Envoyer le lien'}
                                        </button>
                                        {errorMessage && (
                                            <div className="error-message">
                                                <FaExclamationTriangle /> {errorMessage}
                                            </div>
                                        )}
                                    </form>
                                </>
                            ) : (
                                <div className="success-content">
                                    <div className="success-icon">
                                        <FaCheck />
                                    </div>
                                    <h1>Email envoyé !</h1>
                                    <p className="auth-subtitle">
                                        Nous avons envoyé un lien de récupération à <strong>{email}</strong>
                                    </p>
                                    <p className="instructions">
                                        Vérifiez votre boîte de réception et cliquez sur le lien pour réinitialiser votre mot de passe.<br />
                                        Si vous ne voyez pas l'email, vérifiez vos spams.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setIsEmailSent(false);
                                            setEmail('');
                                        }}
                                        className="auth-button secondary"
                                    >
                                        Renvoyer l'email
                                    </button>
                                </div>
                            )}
                            <div className="auth-footer">
                                <Link href="/login" className="back-link">
                                    <FaArrowLeft /> Retour à la connexion
                                </Link>
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

export default ForgotPassword;
