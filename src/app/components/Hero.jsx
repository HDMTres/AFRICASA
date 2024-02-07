"use client";
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';


import './hero.css';
import HeroSlide from './HeroSlide';

function Hero() {
    const [slides, setSlides] = useState([]);

    const fetchData = () => {
        fetch('http://localhost:4000/slides')
            .then(res => res.json())
            .then(data => setSlides(data))
            .catch(err => console.log(err.message));
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Swiper
            spaceBetween={0}
            autoPlay={{
                delay: 5000,
                disableOnInteraction: false
            }}
            pagination={{
                type: 'bullets',
                clickable: true
            }}
            modules={[Autoplay, Pagination]}
            loop={true}
            className='intro intro-carousel swiper position-relative'
        >
            {slides.length > 0 && slides.map(slide => (
                <SwiperSlide key={slide.id}>
                    <HeroSlide slide={slide} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default Hero;
