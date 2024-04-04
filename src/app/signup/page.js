"use client"
import React, { useState } from "react"
import Link from 'next/link';
import { FaUser, FaLock, FaEnvelope, FaUserAlt, FaAddressCard } from 'react-icons/fa';
import NoNavLayout from '../components/NoNavLayout';
import './styles.css'; // Utilisez le même fichier CSS ou un fichier spécifique à signup
import { useRouter } from "next/navigation";

const Signup = () => {
    const [firstname, setFirstname] = useState("")
    const [name, setName] = useState("")
    const [email, setemail] = useState("")
    const [address, setaddress] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const router = useRouter();

    const handlesingnup = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://127.0.0.1:8080/users/signup', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                 body: JSON.stringify({ firstname, name, email, address, password, username })
            })
            if (response.ok) {
                router.push("/login")
                localStorage.setItem("username", username)
                localStorage.setItem("isAuth", true)
            } else {
                setErrorMessage("veuillez remplire tous les champs ou saisr des informatios corrects")
                localStorage.setItem("isAuth", false)
            }
        } catch (error) {
            setErrorMessage("Erreur lors de l'inscription")
        }
    }

    return (
        <>
        <NoNavLayout>
            <section className="login-container">
                <section className="wrapper">
                    <div className="signup-form">
                        <h1>Inscription à AFRICASA</h1>
                        <form onSubmit={handlesingnup}>
                            <div className="input-box">
                                <FaUserAlt className="icon" />
                                <input type="text" placeholder="Prénom" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
                            </div>
                            <div className="input-box">
                                <FaUserAlt className="icon" />
                                <input type="text" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className="input-box">
                                <FaEnvelope className="icon" />
                                <input type="email" placeholder="Email" value={email} onChange={(e) => setemail(e.target.value)} required />
                            </div>
                            <div className="input-box">
                                <FaAddressCard className="icon" />
                                <input type="text" placeholder="Adresse" value={address} onChange={(e) => setaddress(e.target.value)} required />
                            </div>
                            <div className="input-box">
                                <FaAddressCard className="icon" />
                                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            </div>
                            <div className="input-box">
                                <FaLock className="icon" />
                                <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
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
        </>
    );
};

export default Signup;
