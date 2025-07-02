"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination } from 'swiper/modules';

import './styles.css';

function PropertySingle({ params }) {
    const id = params.id;
    const [property, setProperty] = useState({});
    const [agent, setAgent] = useState({});

    const fetchAgent = () => {
        if (property.agent) {
            fetch(`https://christmas-04.onrender.com/estateAgency/`)
                .then(res => res.json())
                .then(data => setAgent(data[0]['agents'][property.agent - 1]))
                .catch(err => console.log(err.message));
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8080/properties/${id}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch property')
                }
                const data = await response.json()
                setProperty(data)
            } catch (error) {
                console.error(error)
            } 
        }
        fetchData()
    }, [id]);

    useEffect(() => {
        if (property.agent === null) return;
        fetchAgent();
    }, [property.agent]);

    return (
        <main id="main">
            <section className='intro-single'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 col-lg-8'>
                            <div className='title-single-box'>
                                <h1 className='title-single'>
                                    {property.title}
                                </h1>
                                <span className='color-text-a'>{property.location}</span>
                            </div>
                        </div>
                        <div className='col-md-12 col-lg-4'>
                            <nav
                                aria-label='breadcrumb'
                                className='breadcrumb-box d-flex justify-content-lg-end'
                            >
                                <ol className='breadcrumb'>
                                    <li className="breadcrumb-item">
                                        <Link href="/">
                                            <i className="bi bi-house-door-fill"></i>
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link href="/properties">
                                            Nos tendances
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item active" aria-current="page">
                                        {property.title}
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            <section className='property-single nav-arrow-b'>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-lg-8'>
                            <Swiper
                                speed={600}
                                autoplay={{
                                    delay: 5000,
                                    disableOnInteraction: false
                                }}
                                pagination={{
                                    el: '.property-single-carousel-pagination',
                                    type: 'bullets',
                                    clickable: true
                                }}
                                modules={[Autoplay, Pagination]}
                                loop={true}
                                className='swiper'
                            >
                                {property.photos && property.photos.length > 0 &&
                                    property.photos.map((photo, index) => (
                                        <SwiperSlide key={index} className='carousel-item-b'>
                                            <img src={photo} alt={`photo-${index}`} className='img-fluid' />
                                        </SwiperSlide>
                                    ))}
                                <div className="property-single-carousel-pagination carousel-pagination"></div>
                            </Swiper>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <div className='row justify-content-between'>
                                <div className='col-md-5 col-lg-4'>
                                    <div className='property-price d-flex justify-content-center foo'>
                                        <div className='card-header-c d-flex'>
                                            <div className='card-box-ico'>
                                                <span className='bi bi-cash'>$</span>
                                            </div>
                                            <div className='card-title-c align-self-center'>
                                                <h5 className='title-c'>{property.price}</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='property-summary'>
                                        <div className='row'>
                                            <div className='col-sm-12'>
                                                <div className='title-box-d section-t4'>
                                                    <h3 className='title-d'>Quick Summary</h3>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='summary-list'>
                                            <ul className='list'>
                                                <li className='d-flex justify-content-between'>
                                                    <strong>ID:</strong>
                                                    <span>{property.externalID}</span>
                                                </li>
                                                <li className='d-flex justify-content-between'>
                                                    <strong>Lieu:</strong>
                                                    <span>{property.location}</span>
                                                </li>
                                                <li className='d-flex justify-content-between'>
                                                    <strong>Type:</strong>
                                                    <span>{property.propertyType}</span>
                                                </li>
                                                <li className='d-flex justify-content-between'>
                                                    <strong>Statut:</strong>
                                                    <span>{property.purpose}</span>
                                                </li>
                                                <li className='d-flex justify-content-between'>
                                                    <strong>Espace:</strong>
                                                    <span>
                                                        {property.sqSize}m<sup>2</sup>
                                                    </span>
                                                </li>
                                                <li className='d-flex justify-content-between'>
                                                    <strong>Chambre:</strong>
                                                    <span>{property.rooms}</span>
                                                </li>
                                                <li className='d-flex justify-content-between'>
                                                    <strong>Salle de bain:</strong>
                                                    <span>{property.baths}</span>
                                                </li>
                                                <li className='d-flex justify-content-between'>
                                                    <strong>Garages:</strong>
                                                    <span>{property.garages}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className='col-md-7 col-lg-7 section-md-t3'>
                                    <div className='row'>
                                        <div className='col-sm-12'>
                                            <div className='title-box-d'>
                                                <h3 className='title-d'>Description</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='property-description'>
                                        <p className='description color-text-a'>
                                            {property.description}
                                        </p>
                                        <p className='description color-text-a no-margin'>
                                            {property.details}
                                        </p>
                                    </div>
                                    <div className='row section-t3'>
                                        <div className='col-sm-12'>
                                            <div className='title-box-d'>
                                                <h3 className='title-d'>Équipements en plus</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='amenities-list color-text-a'>
                                        <ul className='list-a no-margin'>
                                            {property.amenities && property.amenities.length > 0 &&
                                                property.amenities.map((item, index) => (
                                                    <li key={index}>{item}</li>
                                                ))}
                                        </ul>
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

export default PropertySingle;
