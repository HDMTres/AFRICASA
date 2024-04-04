"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { FaUser, FaLock } from 'react-icons/fa';
import NoNavLayout from '../components/NoNavLayout';
import './styles.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:8080/users/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            if (response.ok) {
                // Rediriger l'utilisateur après la connexion réussie
                // Par exemple, vers la page d'accueil
                window.location.href = '/';
            } else {
                // Gérer le cas où l'authentification échoue
                setErrorMessage('Nom d\'utilisateur ou mot de passe incorrect');
            }
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            setErrorMessage('Erreur lors de la connexion');
        }
    };

    return (
        <NoNavLayout>
            <section className="login-container">
                <section className="wrapper">
                    <div className="login-form">
                        <h1>Connexion à votre espace AFRICASA</h1>
                        <form onSubmit={handleLogin}>
                            <div className="input-box">
                                <FaUser className="icon" />
                                <input type="text" placeholder="Nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            </div>
                            <div className="input-box">
                                <FaLock className="icon" />
                                <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <button type="submit" className="login-button">Se connecter</button>
                            {errorMessage && <div className="error-message">{errorMessage}</div>}
                        </form>
                        <div className="register-link">
                            <p>Vous n'avez pas de compte ? <Link href="/signup">Inscrivez-vous</Link></p>
                        </div>
                    </div>
                </section>
            </section>
        </NoNavLayout>
    );
};

export default Login;
