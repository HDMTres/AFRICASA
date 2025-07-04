"use client";
import React from 'react';

import './footer.css';
import Link from 'next/link';

function Footer() {
    return (
        <>
            <section className="section-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-4">
                            <div className="widget-a">
                                <div className="w-header-a">
                                    <h3 className='w-title-a text-brand'>AFRICASA</h3>
                                </div>
                                <div className="w-body-a">
                                    <p className="w-text-a color-text-a">
                                    AFRICA est un portail immobilier pionnier dédié exclusivement au marché africain, 
                                    offrant une plateforme exhaustive où les utilisateurs peuvent acheter, vendre, et louer 
                                    des appartements à travers tout le continent africain.
                                    </p>
                                </div>
                                <div className="w-footer-a">
                                    <ul className="list-unstyled">
                                        <li className="color-a">
                                            <span className='color-text-a'>Numéro:</span>{' '}
                                            +01 23 45 67 89
                                        </li>
                                        <li className="color-a">
                                            <span className='color-text-a'>Email:</span>{' '}
                                            africasa@gmail.com
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-4 section-md-t3">
                            <div className="widget-a">
                                <div className="w-header-a">
                                    <h3 className='w-title-a text-brand'>Notre Entreprise</h3>
                                </div>
                                <div className="w-body-a">
                                    <div className="w-body-a">
                                        <ul className="list-unstyled">
                                            <li className="item-list-a">
                                                <i className="bi bi-chevron-right"></i>{' '}
                                                <a href="#">Site Map</a>
                                            </li>
                                            <li className="item-list-a">
                                                <i className="bi bi-chevron-right"></i>{' '}
                                                <a href="#">Qui sommes nous ?</a>
                                            </li>
                                            <li className="item-list-a">
                                                <i className="bi bi-chevron-right"></i>{' '}
                                                <a href="#">Fondateurs</a>
                                            </li>
                                            <li className="item-list-a">
                                                <i className="bi bi-chevron-right"></i>{' '}
                                                <a href="#">Notre objectif</a>
                                            </li>
                                            <li className="item-list-a">
                                                <i className="bi bi-chevron-right"></i>{' '}
                                                <a href="#">Nos partenaires</a>
                                            </li>
                                            <li className="item-list-a">
                                                <i className="bi bi-chevron-right"></i>{' '}
                                                <a href="#">Politique de Confidentialité</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-4 section-md-t3">
                            <div className="widget-a">
                                <div className="w-header-a">
                                    <h3 className="w-title-a text-brand">Nos différents sites</h3>
                                </div>
                                <div className="w-body-a">
                                    <ul className="list-unstyled">
                                        <li className="item-list-a">
                                            <i className="bi bi-chevron-right"></i>{" "}
                                            <a href="#">Cameroun</a>
                                        </li>
                                        <li className="item-list-a">
                                            <i className="bi bi-chevron-right"></i>{" "}
                                            <a href="#">Côte D'Ivoire</a>
                                        </li>
                                        <li className="item-list-a">
                                            <i className="bi bi-chevron-right"></i>{" "}
                                            <a href="#">Mali</a>
                                        </li>
                                        <li className="item-list-a">
                                            <i className="bi bi-chevron-right"></i>{" "}
                                            <a href="#">Autre</a>
                                        </li>
                                        <li className="item-list-a">
                                            <i className="bi bi-chevron-right"></i>{" "}
                                            <a href="#">Autre</a>
                                        </li>
                                        <li className="item-list-a">
                                            <i className="bi bi-chevron-right"></i>{" "}
                                            <a href="#">Autre</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <nav className="nav-footer">
                                <ul className="list-inline">
                                    <li className="list-inline-item">
                                        <Link href="/">Accueil</Link>
                                    </li>
                                    <li className="list-inline-item">
                                        <Link href="/about">A Propos</Link>
                                    </li>
                                    <li className="list-inline-item">
                                        <Link href="/properties">Propriété</Link>
                                    </li>
                                    <li className="list-inline-item">
                                        <Link href="/agent">Equipe</Link>
                                    </li>
                                    <li className="list-inline-item">
                                        <Link href="/contact">Contacte</Link>
                                    </li>
                                </ul>
                            </nav>

                            <div className="socials-a">
                                <ul className="list-inline">
                                    <li className="list-inline-item">
                                        <a href="#">
                                            <i className='bi bi-facebook' aria-hidden="true"></i>
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#">
                                            <i className='bi bi-twitter' aria-hidden="true"></i>
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#">
                                            <i className='bi bi-instagram' aria-hidden="true"></i>
                                        </a>
                                    </li>
                                    <li className="list-inline-item">
                                        <a href="#">
                                            <i className='bi bi-linkedin' aria-hidden="true"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>

                            <div className="copyright-footer">
                                <p className="copyright color-text-a">
                                    &copy; Copyright {" "}
                                    <span className='color-a'>AFRICASA</span> All Rights Reserved.
                                </p>
                            </div>
                            <div className="credits">
                                Designed by <a href="#">Loic&Hadama</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
