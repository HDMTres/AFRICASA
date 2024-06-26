"use client";
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination } from 'swiper/modules';

import './properties.css';
import Link from 'next/link';
import PropertyCard from './PropertyCard';

function PropertiesSection() {
    const [properties, setProperties] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8080/properties');
            if (!response.ok) {
                throw new Error('Failed to fetch properties');
            }
            const data = await response.json();
            setProperties(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <section className='section-property section-t8'>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title-wrap d-flex justify-content-between">
                            <div className="title-box">
                                <h2 className='title-a'>Dernier Ajout en Tendance</h2>
                            </div>
                            <div className="title-link">
                                <Link href="/properties">
                                    Tous les ajouts
                                    <span className='bi bi-chevron-right'></span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <Swiper
                    slidesPerView={'auto'}
                    speed={600}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false
                    }}
                    pagination={{
                        el: '.property-carousel-pagination',
                        type: 'bullets',
                        clickable: true
                    }}
                    modules={[Autoplay, Pagination]}
                    loop={true}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 20
                        },
                        1200: {
                            slidesPerView: 3,
                            spaceBetween: 20
                        },
                    }}
                    className='swiper'
                >
                    {properties && properties.length > 0 &&
                        properties.slice(0, 4).map(property => (
                            <SwiperSlide key={property._id}>
                                <PropertyCard property={property} />
                            </SwiperSlide>
                        ))}
                    <div className="property-carousel-pagination carousel-pagination"></div>
                </Swiper>
            </div>
        </section>
    );
}

export default PropertiesSection;
