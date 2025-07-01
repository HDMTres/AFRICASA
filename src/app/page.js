"use client";
import { useEffect, useState } from 'react';
import Hero from "./components/Hero";
import Services from "./components/Services";
import PropertiesSection from "./components/PropertiesSection";
import AgentsSection from "./components/AgentsSection";

export default function Home() {
  const [user, setUser] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Éviter les erreurs d'hydratation
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        
        // Afficher le message de bienvenue seulement si on vient de se connecter
        const justLoggedIn = localStorage.getItem('justLoggedIn');
        if (justLoggedIn) {
          setShowWelcome(true);
          localStorage.removeItem('justLoggedIn'); // Supprimer après utilisation
          
          // Masquer le message après 5 secondes
          setTimeout(() => {
            setShowWelcome(false);
          }, 5000);
        }
      } catch (error) {
        console.error('Erreur parsing user data:', error);
      }
    }
  }, [isClient]);

  // Éviter le rendu côté serveur pour éviter les erreurs d'hydratation
  if (!isClient) {
    return (
      <>
        <Hero />
        <main id="main">
          <Services />
          <PropertiesSection />
          <AgentsSection />
        </main>
      </>
    );
  }

  return (
    <>
      {/* Message de bienvenue - rendu seulement côté client */}
      {user && showWelcome && (
        <div className="welcome-notification">
          <strong>🎉 Bienvenue {user.fullName} !</strong>
          <br />
          <small>Vous êtes maintenant connecté à AFRICASA</small>
          <button 
            onClick={() => setShowWelcome(false)}
            className="close-welcome"
          >
            ×
          </button>
        </div>
      )}

      <Hero />

      <main id="main">
        <Services />
        <PropertiesSection />
        <AgentsSection />
      </main>
    </>
  );
}
