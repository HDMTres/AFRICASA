"use client";
import React, {useState} from 'react';
import './services.css';

function Services() {

    const [expanded, setExpanded] = useState({
        acheter: false,
        louer: false,
        vendre: false
    })

    const toggleExpanded = (service) => {
        setExpanded(preState => ({
            ...preState,
            [service]: !preState[service]
        }))
    }

    return (
        <section className='section-services section-t8'>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title-wrap d-flex justify-content-between">
                            <div className="title-box">
                                <h2 className='title-a'>Nos Services</h2>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card-box-c foo">
                            <div className="card-header-c d-flex">
                                <div className="card-box-ico">
                                    <span className='bi bi-cart'></span>
                                </div>
                                <div className='card-title-c align-self-center'>
                                    <h2 className='title-c'>Acheter</h2>
                                </div>
                            </div>
                            <div className="card-body-c">
                                <p className="content-c">
                                    Découvrez une multitude de propriétés exceptionnelles juste à côté ou de chez vous!
                                    Peu importe le bien que vous cherchez, trouvez le bien qui reflète parfaitement vos envie et votre personnalité,
                                    Parcourez notre sélection unique pour dénicher la perle rare qui vous correspond vraiment. 
                                </p>
                                {expanded.acheter && (
                                    <p className='expanded-content'>
                                        AFRICASA vous offre un service "Acheter" qui vise à facilter votre processus d'achat immobilier en vous mettant en relation directe avec les propriétaires des biens qui vous intéressent.
                                        Notre service va au-delà de la simple recherche en vous offrant une assistance personnalisée pour vous guider dans votre démarche d'acquisition.
                                        Nous vous accompagnons avec des conseils avisés tout au long du processus, afin de vous aider à trouver le bien immobilier parfaitement adapté à vos besoins et à votre style de vie.
                                    </p>
                                )}
                            </div>
                            <div className="card-body-c">
                                <button
                                    className='link-c link-icon'
                                    onClick={() => toggleExpanded('acheter')}
                                >
                                    {expanded.acheter ? 'Moins' : 'Savoir Plus'}
                                    <span className='bi bi-chevron-right'></span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card-box-c foo">
                            <div className="card-header-c d-flex">
                                <div className="card-box-ico">
                                    <span className='bi bi-cart'></span>
                                </div>
                                <div className='card-title-c align-self-center'>
                                    <h2 className='title-c'>Louer</h2>
                                </div>
                            </div>
                            <div className="card-body-c">
                                <p className="content-c"> 
                                    Nous vous proposons une plateforme où vous pouvez facilement louer ou mettre en location des biens immobiliers.
                                    Profitez d'une visibilité étendue pour votre bien grâce à notre plateforme.
                                    Que vous cherchiez à louer un bien pour répondre à vos besoins actuels ou à mettre en location votre propre propriété, nous vous offrons la flexibilité de choisir selon votre convenance, vos préférences et vos critères de recherche.
                                </p>
                                {expanded.louer && (
                                    <p className='expanded-content'>
                                        AFRICASA vous propose un service de location qui vous permet de louer ou de mettre en location vos biens immobiliers en toute simplicité.
                                        Nous vous accompagnons pour maximiser la visibilité de votre bien, en vous fournissant des conseils pratiques tels que la prise de photos de qualité pour mettre en valeur la beauté de votre propriété.
                                        De plus, notre plateforme vous offre la possibilité de sélectionner et de visiter rapidement et facilement les biens que vous souhaitez louer.
                                        Avec notre interface conviviale, vous pouvez parcourir les annonces, filtrer selon vos critères et planifier des visites en un rien de temps, vous permettant ainsi de trouver rapidement le bien qui correspond à vos besoins et à vos préférences.
                                    </p>
                                )}
                            </div>
                            <div className="card-body-c"> 
                                <button
                                    className='link-c link-icon'
                                    onClick={() => toggleExpanded('louer')}
                                >
                                    {expanded.louer ? 'Moins' : 'Savoir Plus'}
                                    <span className='bi bi-chevron-right'></span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card-box-c foo">
                            <div className="card-header-c d-flex">
                                <div className="card-box-ico">
                                    <span className='bi bi-card-checklist'></span>
                                </div>
                                <div className='card-title-c align-self-center'>
                                    <h2 className='title-c'>Vendre</h2>
                                </div>
                            </div>
                            <div className="card-body-c">
                                <p className="content-c">
                                    Optimisez la vente de votre propriété avec nous.
                                    Bénéficiez d'une visibilité accrue auprès d'un vaste public d'acheteurs potentiels, tous attirés par la richesse et la diversité du marché immobilier africain.
                                    Simplifiez le processus de vente et maximisez vos rendements. Confiez-nous votre bien et laissez-nous vous aider à concrétiser votre projet immobilier dans les meilleures conditions possibles.
                                </p>
                                {expanded.vendre && (
                                    <p className='expanded-content'>
                                        AFRICASA vous offre un service de vente immobilier sur mesure, conçu pour vous accompagner à chaque étape de la vente de votre bien.
                                        Nous commençons par une évaluation détaillée de votre propriété, garantissant ainsi une estimation précise de sa valeur sur le marché.
                                        Nous organisons des visites guidées pour présenter votre bien à des acheteurs potentiels, tout en vous fournissant des conseils avisés pour maximiser son attrait. De plus, nous mettons en œuvre des stratégies de marketing efficaces pour accroître la visibilité de votre propriété. Si nécessaire, nous vous mettons également en relation avec des experts pour vous guider dans les procédures et les démarches administratives.
                                    </p>
                                )}
                            </div>
                            <div className="card-body-c"> 
                                <button
                                    className='link-c link-icon'
                                    onClick={() => toggleExpanded('vendre')}
                                >
                                    {expanded.vendre ? 'Moins' : 'Savoir Plus'}
                                    <span className='bi bi-chevron-right'></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Services;
