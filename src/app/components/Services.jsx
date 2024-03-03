"use client";
import React from 'react';



import './services.css';

function Services() {
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
                                Explorez une vaste sélection de propriétés uniques à travers l'Afrique.
                                 Que vous cherchiez une résidence urbaine ou un refuge paisible dans la nature,
                                  trouvez votre coin de paradis sur notre plateforme
                                </p>
                            </div>
                            <div className="card-footer-c">
                                <a href="#" className='link-c link-icon'>
                                    Savoir Plus  <span className='bi bi-chevron-right'></span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card-box-c foo">
                            <div className="card-header-c d-flex">
                                <div className="card-box-ico">
                                    <span className='bi bi-calendar4-week'></span>
                                </div>
                                <div className='card-title-c align-self-center'>
                                    <h2 className='title-c'>Louer</h2>
                                </div>
                            </div>
                            <div className="card-body-c">
                                <p className="content-c">
                                Découvrez des locations adaptées à tous les besoins, 
                                des appartements modernes en ville aux maisons traditionnelles africaines.
                                 Vivez l'Afrique à votre rythme, avec flexibilité et confort.
                                </p>
                            </div>
                            <div className="card-footer-c">
                                <a href="#" className='link-c link-icon'>
                                    Savoir Plus <span className='bi bi-chevron-right'></span>
                                </a>
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
                                Valorisez et vendez votre propriété avec nous. 
                                Atteignez un large public d'acheteurs potentiels intéressés par 
                                le charme et la diversité du marché immobilier africain. Simplifiez votre vente, 
                                maximisez votre retour..
                                </p>
                            </div>
                            <div className="card-footer-c">
                                <a href="#" className='link-c link-icon'>
                                    Savoir Plus <span className='bi bi-chevron-right'></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Services;
