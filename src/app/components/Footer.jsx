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
                                    <h3 className='w-title-a text-brand'>EstateAgency</h3>
                                </div>
                                <div className="w-body-a">
                                    <p className="w-text-a color-text-a">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Deserunt quaerat excepturi, sunt laborum quod mollitia velit
                                        reiciendis pariatur.
                                    </p>
                                </div>
                                <div className="w-footer-a">
                                    <ul className="list-unstyled">
                                        <li className="color-a">
                                            <span className='color-text-a'>Phone ,</span>{' '}
                                            +12 345 67890
                                        </li>
                                        <li className="color-a">
                                            <span className='color-text-a'>Email ,</span>{' '}
                                            email@email.com
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-4 section-md-t3">
                            <div className="widget-a">
                                <div className="w-header-a">
                                    <h3 className='w-title-a text-brand'>The Company</h3>
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
                                                <a href="#">Legal</a>
                                            </li>
                                            <li className="item-list-a">
                                                <i className="bi bi-chevron-right"></i>{' '}
                                                <a href="#">Agent Admin</a>
                                            </li>
                                            <li className="item-list-a">
                                                <i className="bi bi-chevron-right"></i>{' '}
                                                <a href="#">Careers</a>
                                            </li>
                                            <li className="item-list-a">
                                                <i className="bi bi-chevron-right"></i>{' '}
                                                <a href="#">Affiliate</a>
                                            </li>
                                            <li className="item-list-a">
                                                <i className="bi bi-chevron-right"></i>{' '}
                                                <a href="#">Privacy Policy</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-4 section-md-t3">
                            <div className="widget-a">
                                <div className="w-header-a">
                                    <h3 className="w-title-a text-brand">International sites</h3>
                                </div>
                                <div className="w-body-a">
                                    <ul className="list-unstyled">
                                        <li className="item-list-a">
                                            <i className="bi bi-chevron-right"></i>{" "}
                                            <a href="#">Vietnam</a>
                                        </li>
                                        <li className="item-list-a">
                                            <i className="bi bi-chevron-right"></i>{" "}
                                            <a href="#">India</a>
                                        </li>
                                        <li className="item-list-a">
                                            <i className="bi bi-chevron-right"></i>{" "}
                                            <a href="#">Hong Kong</a>
                                        </li>
                                        <li className="item-list-a">
                                            <i className="bi bi-chevron-right"></i>{" "}
                                            <a href="#">Argentina</a>
                                        </li>
                                        <li className="item-list-a">
                                            <i className="bi bi-chevron-right"></i>{" "}
                                            <a href="#">Singapore</a>
                                        </li>
                                        <li className="item-list-a">
                                            <i className="bi bi-chevron-right"></i>{" "}
                                            <a href="#">Philippines</a>
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
                                        <Link href="/">Home</Link>
                                    </li>
                                    <li className="list-inline-item">
                                        <Link href="/about">About</Link>
                                    </li>
                                    <li className="list-inline-item">
                                        <Link href="/properties">Property</Link>
                                    </li>
                                    <li className="list-inline-item">
                                        <Link href="/agent">Agent</Link>
                                    </li>
                                    <li className="list-inline-item">
                                        <Link href="/contact">Contact</Link>
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
                                    <span className='color-a'>EstateAgency</span> All Rights Reserved.
                                </p>
                            </div>
                            <div className="credits">
                                Designed by <a href="#">Freetime Tech.</a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
