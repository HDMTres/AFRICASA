"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import aboutBannerImage from '../images/slide-about-1.jpg';
import aboutProfileImage from '../images/about-2.jpg';

import Breadcrumb from '../components/Breadcrumb';
import AgentCard from '../components/AgentCard';

import './styles.css';

function About() {
    const [agents, setAgents] = useState([])

    const fetchData = () => {
        fetch('http://localhost:4000/agents')
            .then(res => res.json())
            .then(data => setAgents(data))
            .catch(err => console.log(err.message));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <main id="main">
            <Breadcrumb
                title="Unlocking Dreams, Opening New Doors"
                subtitle=""
                page="About"
            />

            <section className='section-about'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-12 position-relative'>
                            <div className='about-img-box'>
                                <Image src={aboutBannerImage} alt="about" className='img-fluid' />
                            </div>
                            <div className='sinse-box'>
                                <h3 className='sinse-title'>
                                    EstateAgency
                                    <span></span>
                                    <br /> Sinse 2017
                                </h3>
                                <p>Art & Creative</p>
                            </div>
                        </div>
                        <div className='col-md-12 section-t8 position-relative'>
                            <div className='row'>
                                <div className='col-md-6 col-lg-5'>
                                    <Image src={aboutProfileImage} alt="about" className='img-fluid' />
                                </div>
                                <div className='col-lg-2 d-none d-lg-block position-relative'>
                                    <div className='title-vertical d-flex justify-content-start'>
                                        <span>EstateAgency Exclusive Property</span>
                                    </div>
                                </div>
                                <div className='col-md-6 col-lg-5 section-md-t3'>
                                    <div className='title-box-d'>
                                        <h3 className='title-d'>
                                            Sed
                                            <span className='color-d'>porttitor</span> lectus
                                            <br /> nibh.
                                        </h3>
                                    </div>
                                    <p className='color-text-a'>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting
                                        industry. Lorem Ipsum has been the industry's standard dummy text
                                        ever since the 1500s, when an unknown printer took a galley of type
                                        and scrambled it to make a type specimen book. It has survived
                                        not only five centuries, but also the leap into electronic typesetting.
                                    </p>
                                    <p className='color-text-a'>
                                        Lorem Ipsum is simply dummy text of the printing and typesetting
                                        industry. Lorem Ipsum has been the industry's standard dummy text
                                        not only five centuries, but also the leap into electronic.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='section-agents section-t8'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='title-wrap d-flex justify-content-between'>
                                <div className='title-box'>
                                    <h2 className='title-a'>Meet Our Team</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        {agents && agents.length > 0 && agents.slice(0, 3).map(agent => (
                            <div key={agent.id} className='col-md-4'>
                                <AgentCard agent={agent} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default About;
