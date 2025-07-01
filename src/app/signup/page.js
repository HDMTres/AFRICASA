"use client";
import React, { useState } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { FaUser, FaLock, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEye, FaEyeSlash, FaHome, FaUserTie, FaExclamationTriangle } from 'react-icons/fa';
import { MdPublishedWithChanges, MdHouse, MdSearch } from 'react-icons/md';
import NoNavLayout from '../components/NoNavLayout';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        name: "",
        email: "",
        address: "",
        username: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        role: "user"
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const router = useRouter();

    const countryCodes = [
        { code: "+237", country: "Cameroun", flag: "🇨🇲" },
        { code: "+225", country: "Côte d'Ivoire", flag: "🇨🇮" },
        { code: "+221", country: "Sénégal", flag: "🇸🇳" },
        { code: "+233", country: "Ghana", flag: "🇬🇭" },
        { code: "+234", country: "Nigeria", flag: "🇳🇬" },
        { code: "+254", country: "Kenya", flag: "🇰🇪" },
        { code: "+27", country: "Afrique du Sud", flag: "🇿🇦" },
        { code: "+212", country: "Maroc", flag: "🇲🇦" },
        { code: "+213", country: "Algérie", flag: "🇩🇿" },
        { code: "+216", country: "Tunisie", flag: "🇹🇳" },
    ];
    const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[0].code);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        if (field === 'password') {
            checkPasswordStrength(value);
        }
    };

    const checkPasswordStrength = (password) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;
        setPasswordStrength(strength);
    };

    const getStrengthLabel = (strength) => {
        switch (strength) {
            case 0: case 1: return { label: 'Très faible', class: 'strength-weak' };
            case 2: return { label: 'Faible', class: 'strength-weak' };
            case 3: return { label: 'Moyen', class: 'strength-medium' };
            case 4: return { label: 'Fort', class: 'strength-strong' };
            case 5: return { label: 'Très fort', class: 'strength-strong' };
            default: return { label: '', class: '' };
        }
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhoneNumber = (phoneNumber) => {
        const re = /^\d{8,15}$/;
        return re.test(String(phoneNumber));
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setErrorMessage("");

        // Validation
        if (!validateEmail(formData.email)) {
            setErrorMessage("Veuillez entrer un email valide.");
            setIsLoading(false);
            return;
        }
        
        if (!validatePhoneNumber(formData.phoneNumber)) {
            setErrorMessage("Veuillez entrer un numéro de téléphone valide (8-15 chiffres).");
            setIsLoading(false);
            return;
        }
        
        if (!validatePassword(formData.password)) {
            setErrorMessage("Le mot de passe doit contenir au moins 6 caractères.");
            setIsLoading(false);
            return;
        }
        
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Les mots de passe ne correspondent pas.");
            setIsLoading(false);
            return;
        }

        try {
            console.log('🔄 Tentative d\'inscription vers: http://localhost:5000/api/users/register');
            
            // Format des données pour le backend AFRICASA
            const requestData = {
                fullName: `${formData.firstName} ${formData.name}`, // Combinaison prénom + nom
                email: formData.email,
                password: formData.password,
                phoneNumber: selectedCountryCode + formData.phoneNumber,
                role: formData.role
            };

            console.log('📋 Données envoyées:', requestData);

            // URL CORRIGÉE
            const response = await fetch('http://localhost:5000/api/users/register', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData)
            });
            
            console.log('📡 Réponse reçue:', response.status);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erreur lors de l\'inscription');
            }
            
            const data = await response.json();
            console.log('✅ Inscription réussie:', data.message);
            
            // Redirection vers la page de connexion avec message de succès
            router.push("/login?message=inscription-reussie");
            
        } catch (error) {
            console.error("❌ Erreur lors de l'inscription:", error);
            setErrorMessage(error.message || "Erreur de connexion. Vérifiez vos informations.");
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
                            <h2>Rejoignez la communauté immobilière africaine</h2>
                            <p>Créez votre compte pour accéder à des services immobiliers exclusifs et personnalisés.</p>
                        </div>
                        <ul className="auth-feature-list">
                            <li><MdPublishedWithChanges size={20} /> Publication d'annonces immobilières</li>
                            <li><MdHouse size={20} /> Accès à des propriétés exclusives</li>
                            <li><MdSearch size={20} /> Recherche immobilière avancée</li>
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
                            <h1>Inscription</h1>
                            <p className="auth-subtitle">Créez votre compte en quelques étapes simples</p>
                            
                            <form onSubmit={handleSignup}>
                                <div className="form-grid">
                                    <div className="input-group">
                                        <label htmlFor="firstName">Prénom</label>
                                        <div className="input-box">
                                            <FaUser className="input-icon" />
                                            <input 
                                                id="firstName"
                                                type="text" 
                                                placeholder="Votre prénom" 
                                                value={formData.firstName} 
                                                onChange={(e) => handleInputChange('firstName', e.target.value)} 
                                                required 
                                            />
                                        </div>
                                    </div>

                                    <div className="input-group">
                                        <label htmlFor="lastName">Nom de famille</label>
                                        <div className="input-box">
                                            <FaUser className="input-icon" />
                                            <input 
                                                id="lastName"
                                                type="text" 
                                                placeholder="Votre nom" 
                                                value={formData.name} 
                                                onChange={(e) => handleInputChange('name', e.target.value)} 
                                                required 
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label htmlFor="email">Email</label>
                                    <div className="input-box">
                                        <FaEnvelope className="input-icon" />
                                        <input 
                                            id="email"
                                            type="email" 
                                            placeholder="votre@email.com" 
                                            value={formData.email} 
                                            onChange={(e) => handleInputChange('email', e.target.value)} 
                                            required 
                                        />
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label htmlFor="username">Nom d'utilisateur</label>
                                    <div className="input-box">
                                        <FaUserTie className="input-icon" />
                                        <input 
                                            id="username"
                                            type="text" 
                                            placeholder="Nom d'utilisateur unique" 
                                            value={formData.username} 
                                            onChange={(e) => handleInputChange('username', e.target.value)} 
                                            required 
                                        />
                                    </div>
                                </div>

                                <div className="form-grid">
                                    <div className="input-group">
                                        <label htmlFor="phone">Numéro de téléphone</label>
                                        <div className="phone-input">
                                            <select 
                                                id="countryCode"
                                                value={selectedCountryCode} 
                                                onChange={(e) => setSelectedCountryCode(e.target.value)}
                                                className="country-select"
                                            >
                                                {countryCodes.map((country) => (
                                                    <option key={country.code} value={country.code}>
                                                        {country.flag} {country.code}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="input-box phone-number">
                                                <FaPhone className="input-icon" />
                                                <input 
                                                    id="phone"
                                                    type="tel" 
                                                    placeholder="Numéro de téléphone" 
                                                    value={formData.phoneNumber} 
                                                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)} 
                                                    required 
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="input-group">
                                        <label htmlFor="address">Adresse</label>
                                        <div className="input-box">
                                            <FaMapMarkerAlt className="input-icon" />
                                            <input 
                                                id="address"
                                                type="text" 
                                                placeholder="Votre adresse" 
                                                value={formData.address} 
                                                onChange={(e) => handleInputChange('address', e.target.value)} 
                                                required 
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="input-group">
                                    <label>Type de compte</label>
                                    <div className="role-selection">
                                        <div className="role-option">
                                            <input 
                                                type="radio" 
                                                id="user" 
                                                name="role" 
                                                value="user" 
                                                checked={formData.role === 'user'}
                                                onChange={(e) => handleInputChange('role', e.target.value)}
                                            />
                                            <label htmlFor="user">
                                                <span>👤</span>
                                                <strong>Particulier</strong>
                                                <p>Rechercher and acheter des biens</p>
                                            </label>
                                        </div>
                                        <div className="role-option">
                                            <input 
                                                type="radio" 
                                                id="agent" 
                                                name="role" 
                                                value="agent" 
                                                checked={formData.role === 'agent'}
                                                onChange={(e) => handleInputChange('role', e.target.value)}
                                            />
                                            <label htmlFor="agent">
                                                <span>🏢</span>
                                                <strong>Agent immobilier</strong>
                                                <p>Gérer et publier des propriétés</p>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-grid">
                                    <div className="input-group">
                                        <label htmlFor="password">Mot de passe</label>
                                        <div className="input-box">
                                            <FaLock className="input-icon" />
                                            <input 
                                                id="password"
                                                type={showPassword ? "text" : "password"} 
                                                placeholder="Mot de passe (6+ caractères)" 
                                                value={formData.password} 
                                                onChange={(e) => handleInputChange('password', e.target.value)} 
                                                required 
                                            />
                                            <button
                                                type="button"
                                                className="password-toggle"
                                                onClick={() => setShowPassword(!showPassword)}
                                                aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                        {formData.password && (
                                            <div className="password-strength">
                                                <div className="strength-bar">
                                                    <div 
                                                        className={`strength-fill strength-${passwordStrength}`}
                                                        style={{ width: `${(passwordStrength / 5) * 100}%` }}
                                                    ></div>
                                                </div>
                                                <div className="strength-text">
                                                    <span className="strength-label">Force:</span>
                                                    <span className={getStrengthLabel(passwordStrength).class}>
                                                        {getStrengthLabel(passwordStrength).label}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="input-group">
                                        <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                                        <div className="input-box">
                                            <FaLock className="input-icon" />
                                            <input 
                                                id="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"} 
                                                placeholder="Confirmez votre mot de passe" 
                                                value={formData.confirmPassword} 
                                                onChange={(e) => handleInputChange('confirmPassword', e.target.value)} 
                                                required 
                                            />
                                            <button
                                                type="button"
                                                className="password-toggle"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                aria-label={showConfirmPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                                            >
                                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    className={`auth-button ${isLoading ? 'loading' : ''}`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Inscription en cours...' : "Créer mon compte"}
                                </button>
                                
                                {errorMessage && (
                                    <div className="error-message">
                                        <FaExclamationTriangle /> {errorMessage}
                                    </div>
                                )}
                            </form>
                            
                            <div className="auth-footer">
                                <p>Déjà un compte ? 
                                    <Link href="/login" className="auth-link"> Connectez-vous</Link>
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

export default Signup;
