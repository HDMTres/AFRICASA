import React from 'react';
import Link from 'next/link';
import { FaUser, FaLock, FaEnvelope, FaUserAlt, FaAddressCard } from 'react-icons/fa';
import NoNavLayout from '../components/NoNavLayout';
import './styles.css'; // Utilisez le même fichier CSS ou un fichier spécifique à signup

const Signup = () => {
    return (
        <>
        <NoNavLayout>
        <section className="login-container"> {/* Vous pouvez utiliser la même classe ou en créer une spécifique */}
            <section className="wrapper">
                <div className="signup-form">
                    <h1>Inscription à AFRICASA</h1>
                    <div className="input-box">
                        <FaUserAlt className="icon" />
                        <input type="text" placeholder="Prénom" required />
                    </div>
                    <div className="input-box">
                        <FaUserAlt className="icon" />
                        <input type="text" placeholder="Nom" required />
                    </div>
                    <div className="input-box">
                        <FaEnvelope className="icon" />
                        <input type="email" placeholder="Email" required />
                    </div>
                    <div className="input-box">
                        <FaAddressCard className="icon" />
                        <input type="text" placeholder="Adresse" required />
                    </div>
                    <div className="input-box">
                        <FaLock className="icon" />
                        <input type="password" placeholder="Mot de passe" required />
                    </div>
                    <button type="submit" className="login-button">S'inscrire</button>
                    <div className="register-link">
                        <p>Déjà un compte ? <Link href="/login">Connectez-vous</Link></p>
                    </div>
                </div>
            </section>
        </section>
        </NoNavLayout>
        </>
    );
};

export default Signup;
