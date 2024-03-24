import React from 'react';
import Link from 'next/link';
import { FaUser, FaLock } from 'react-icons/fa'; // Assurez-vous d'avoir installé 'react-icons'
import NoNavLayout from '../components/NoNavLayout';
import './styles.css'; // Assurez-vous que le chemin vers votre fichier CSS est correct

const Login = () => {
    return (
        <>
        <NoNavLayout>
        <section className="login-container">
            <section className="wrapper">
                <div action="" className="login-form">
                    <h1>Connexion à votre espace AFRICASA</h1>
                    <div className="input-box">
                        <FaUser className="icon" />
                        <input type="text" placeholder="Nom d'utilisateur" required />
                    </div>
                    <div className="input-box">
                        <FaLock className="icon" />
                        <input type="password" placeholder="Mot de passe" required />
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox" /> Se souvenir de moi</label>
                        <Link href="/forgot-password">Mot de passe oublié ?</Link>
                    </div>
                    <button type="submit" className="login-button">Se connecter</button>
                    <div className="register-link">
                        <p>Vous n'avez pas de compte ? <Link href="/signup">Inscrivez-vous</Link></p>
                    </div>
                </div>
            </section>
            </section>
        </NoNavLayout>
        </>
    );

    
};

export default Login;
