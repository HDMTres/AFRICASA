"use client";
import React from 'react';

import Breadcrumb from '../components/Breadcrumb';
import ContactForm from '../components/ContactForm';

import './styles.css';

function Contact() {
    return (
        <main id="main">
            <Breadcrumb
    title="Contactez-nous"
    subtitle="N'hésitez pas à nous contacter pour toute demande d'informations supplémentaires sur nos services, pour échanger au sujet d'un bien spécifique ou pour nous faire part de vos suggestions. Chez AFRICASA, nous sommes à votre écoute et prêts à répondre à toutes vos questions. Utilisez simplement le formulaire ci-dessous pour nous envoyer un message, et notre équipe se fera un plaisir de vous assister. Nous sommes impatients de vous accompagner dans votre projet immobilier!"
    page="Contact"
/>

            <section className='contact'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <div className='contact-map box'>
                                <div className='contact-map' id="map">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2620.9060745159004!2d2.1607298769495715!3d48.93623077134293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e663d971e192db%3A0xdc780b94e6cafa44!2s80%20Rue%20Louise%20Michel%2C%2078500%20Sartrouville!5e0!3m2!1sfr!2sfr!4v1709502768561!5m2!1sfr!2sfr"
                                        width="100%"
                                        height="450"
                                        allowFullScreen
                                        loading="lazy"></iframe>
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-12 section-t8'>
                            <div className='row'>
                                <div className='col-md-7'>
                                    <ContactForm />
                                </div>
                                <div className='col-md-5 section-md-t-3'>
                                    <div className='icon-box section-b2'>
                                        <div className='icon-box-icon'>
                                            <span className='bi bi-envelope'></span>
                                        </div>
                                        <div className='icon-box-content table-cell'>
                                            <div className='icon-box-title'>
                                                <h4 className='icon-title'>Besoin d'infos ?</h4>
                                            </div>
                                            <div className='icon-box-content'>
                                                <p className='mb-1'>
                                                    Email:{" "}
                                                    <span className='color-a'>africasa@gmail.com</span>
                                                </p>
                                                <p className='mb-1'>
                                                    Loic Steve :{" "}
                                                    <span className='color-a'>+33 7 53 71 92 37</span>
                                                </p>
                                                <p className='mb-1'>
                                                    Hadama TOURE:{" "}
                                                    <span className='color-a'>+33 7 66 23 74 54</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='icon-box section-b2'>
                                        <div className='icon-box-icon'>
                                            <span className='bi bi-geo-alt'></span>
                                        </div>
                                        <div className='icon-box-content table-cell'>
                                            <div className='icon-box-title'>
                                                <h4 className='icon-title'>Trouvez nous dans</h4>
                                            </div>
                                            <div className='icon-box-content'>
                                                <p className='mb-1'>
                                                    Siège Social: 80 rue Louise Miche
                                                    <br />  78500 Sartrouville, FRANCE
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='icon-box'>
                                        <div className='icon-box-icon'>
                                            <span className='bi bi-share'></span>
                                        </div>
                                        <div className='icon-box-content table-cell'>
                                            <div className='icon-box-title'>
                                                <h4 className='icon-title'>Réseaux Sociaux</h4>
                                            </div>
                                            <div className='icon-box-content'>
                                                <div className='socials-footer'>
                                                    <ul className='list-inline'>
                                                        <li className='list-inline-item'>
                                                            <a href="#" className='link-one'>
                                                                <i className='bi bi-facebook' aria-hidden="true"></i>
                                                            </a>
                                                        </li>
                                                        <li className='list-inline-item'>
                                                            <a href="#" className='link-one'>
                                                                <i className='bi bi-twitter' aria-hidden="true"></i>
                                                            </a>
                                                        </li>
                                                        <li className='list-inline-item'>
                                                            <a href="#" className='link-one'>
                                                                <i className='bi bi-instagram' aria-hidden="true"></i>
                                                            </a>
                                                        </li>
                                                        <li className='list-inline-item'>
                                                            <a href="#" className='link-one'>
                                                                <i className='bi bi-linkedin' aria-hidden="true"></i>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Contact;
