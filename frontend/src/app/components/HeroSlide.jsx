// Utilisation du mode client pour Next.js et importation des dépendances nécessaires.
"use client";
import Link from 'next/link'; // Permet de créer des liens navigables entre les pages sans recharger la page.
import React from 'react'; // Importation de React pour créer des composants.

// Définition du composant fonctionnel HeroSlide qui prend en entrée une propriété 'slide'.
function HeroSlide({ slide }) {
    return (
        // Création d'un élément de diaporama avec une image de fond.
        <div className='carousel-item-a intro-item bg-image'
            style={{ backgroundImage: `url(${slide.bgImg})` }}>
            <div className="intro-content display-table">
                <div className="table-cell">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="intro-body">
                                    {/* Affichage du sous-titre et du code du slide. */}
                                    <p className="intro-title-top">
                                        {slide.subtitle} <br /> {slide.code}
                                    </p>
                                    {/* Affichage du titre principal du slide. */}
                                    <h1 className="intro-title mb-4">
                                        <span className='color-b'>{slide.number} </span>{' '}
                                        {slide.lineOne} <br /> {slide.lineTwo}
                                    </h1>
                                    {/* Lien vers une page de propriété avec affichage du type et du prix. */}
                                    <p className="intro-subtitle intro-price">
                                        <Link href={`/properties/${slide.id}`}>
                                            <span className='price-a'>
                                                {slide.type} | ${slide.price.toLocaleString('fr-FR')}
                                            </span>
                                        </Link>
                                    </p>
                                    
                                    {/* Boutons d'action pour navigation */}
                                    <div className="intro-actions mt-4">
                                        <Link href="/dashboard" className="btn btn-primary me-3">
                                            <i className="fas fa-tachometer-alt me-2"></i>
                                            Accéder au Dashboard
                                        </Link>
                                        <Link href="/properties" className="btn btn-outline-light">
                                            <i className="fas fa-search me-2"></i>
                                            Voir les Propriétés
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeroSlide; // Exportation du composant pour permettre son utilisation ailleurs dans l'application.

