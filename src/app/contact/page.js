"use client";
import React from 'react';

import Breadcrumb from '../components/Breadcrumb';
import ContactForm from '../components/ContactForm';

import './styles.css';

function Contact() {
    return (
        <main id="main">
            <Breadcrumb
                title="Contact US"
                subtitle="Lorem ipsum dgfd reelghf erterl oyutro dfgldf
                ipsum dgfd reelghf erterl oyutro dfgld fipsum dgfd reelghf erterl oyutro dfgldf
                ipsum dgfd reelghf erterl oyutro dfgldf ipsum dgfd reelghf erterl oyutro dfgldf
                ipsum dgfd reelghf erterl oyutro dfgldf ipsum dgfd reelghf erterl oyutro dfgldf"
                page="Contact"
            />

            <section className='contact'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <div className='contact-map box'>
                                <div className='contact-map' id="map">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d21407.513632171675!2d35.050459700000005!3d47.879504299999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sua!4v1707502284390!5m2!1sru!2sua"
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
                                                <h4 className='icon-title'>Say Hello</h4>
                                            </div>
                                            <div className='icon-box-content'>
                                                <p className='mb-1'>
                                                    Email:{" "}
                                                    <span className='color-a'>email@email.com</span>
                                                </p>
                                                <p className='mb-1'>
                                                    Phone:{" "}
                                                    <span className='color-a'>+12 345 67890</span>
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
                                                <h4 className='icon-title'>Find Us In</h4>
                                            </div>
                                            <div className='icon-box-content'>
                                                <p className='mb-1'>
                                                    Address: 69000 Kyiv
                                                    <br /> Ukraine
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
                                                <h4 className='icon-title'>Social Networks</h4>
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
