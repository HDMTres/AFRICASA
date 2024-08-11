"use client";
import React, { useState } from "react";
import Link from 'next/link';
import { FaUser, FaLock, FaEnvelope, FaUserAlt, FaAddressCard } from 'react-icons/fa';
import NoNavLayout from '../components/NoNavLayout';
import './styles.css';
import { useRouter } from "next/navigation";

const Signup = () => {
    const [firstname, setFirstname] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [countryCode, setCountryCode] = useState("+1"); // Exemple d'indicatif par défaut
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhoneNumber = (phoneNumber) => {
        const re = /^\d+$/;
        return re.test(String(phoneNumber));
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            setErrorMessage("Veuillez entrer un email valide.");
            return;
        }
        if (!validatePhoneNumber(phoneNumber)) {
            setErrorMessage("Veuillez entrer un numéro de téléphone valide.");
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8080/users/signup', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ firstname, name, email, address, password, username, phoneNumber })
            });
            if (response.ok) {
                router.push("/login");
                localStorage.setItem("username", username);
                localStorage.setItem("isAuth", true);
            } else {
                setErrorMessage("Veuillez remplir tous les champs correctement.");
                localStorage.setItem("isAuth", false);
            }
        } catch (error) {
            setErrorMessage("Erreur lors de l'inscription");
        }
    };

    return (
        <NoNavLayout>
            <section className="login-container">
                <section className="wrapper">
                    <div className="signup-form">
                        <h1>Inscription à AFRICASA</h1>
                        <form onSubmit={handleSignup}>
                            <div className="form-columns">
                                <div className="form-column">
                                    <label>Prénom</label>
                                    <div className="input-box">
                                        <FaUserAlt className="icon" />
                                        <input type="text" placeholder="Prénom" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
                                    </div>
                                    <label>Nom</label>
                                    <div className="input-box">
                                        <FaUserAlt className="icon" />
                                        <input type="text" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} required />
                                    </div>
                                    <label>Email</label>
                                    <div className="input-box">
                                        <FaEnvelope className="icon" />
                                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                    <label>Adresse</label>
                                    <div className="input-box">
                                        <FaAddressCard className="icon" />
                                        <input type="text" placeholder="Adresse" value={address} onChange={(e) => setAddress(e.target.value)} required />
                                    </div>
                                </div>

                                <div className="form-column">
                                    <label>Nom d'utilisateur</label>
                                    <div className="input-box">
                                        <FaUser className="icon" />
                                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                    </div>
                                    <label>Mot de passe</label>
                                    <div className="input-box">
                                        <FaLock className="icon" />
                                        <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    </div>
                                    <label>Confirmer le mot de passe</label>
                                    <div className="input-box">
                                        <FaLock className="icon" />
                                        <input type="password" placeholder="Confirmer le mot de passe" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                    </div>
                                    <label>Numéro de téléphone</label>
                                    <div className="input-box">
                                        <FaUser className="icon" />
                                        <input type="text" placeholder="Numéro de téléphone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                                        <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
                                            <option value="+1">+1 (USA)</option>
                                            <option value="+33">+33 (France)</option>
                                            {/* Ajoutez d'autres options selon vos besoins */}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="login-button">S'inscrire</button>
                            {errorMessage && <div className="text-red-500 text-center mt-2">{errorMessage}</div>}
                        </form>
                        <div className="register-link">
                            <p>Déjà un compte ? <Link href="/login">Connectez-vous</Link></p>
                        </div>
                    </div>
                </section>
            </section>
        </NoNavLayout>
    );
};

export default Signup;
