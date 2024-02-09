"use client";
import React, { useState, useEffect } from 'react';



import './styles.css';
import Link from 'next/link';

function AgentSingle({ params }) {
    const id = params.id;
    const [agent, setAgent] = useState({});

    const fetchData = () => {
        fetch(`http://localhost:4000/agents/${id}`)
            .then(res => res.json())
            .then(data => setAgent(data))
            .catch(err => console.log(err.message));
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <main id="main">
            <section className='intro-single'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12 col-lg-8'>
                            <div className='title-single-box'>
                                <h1 className='title-single'>{agent.name}</h1>
                                <span className='color-text-a'>Real Estate Agent</span>
                            </div>
                        </div>
                        <div className='col-md-12 col-lg-4'>
                            <nav className='breadcrumb-box d-flex justify-content-lg-end'>
                                <ol className='breadcrumb'>
                                    <li className='breadcrumb-item'>
                                        <Link href="/">
                                            <i className='bi bi-house-door-fill'></i>
                                        </Link>
                                    </li>
                                    <li className='breadcrumb-item'>
                                        <Link href="/agents">Agents</Link>
                                    </li>
                                    <li className='breadcrumb-item active' aria-current="page">
                                        {agent.name}
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            <section className='agent-single'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='agent-avatar-box'>
                                        <img src={agent.profileImg} alt="agent" className='agent-avatar img-fluid' />
                                    </div>
                                </div>
                                <div className='col-md-5 section-md-t3'>
                                    <div className='agent-info-box'>
                                        <div className='agent-title'>
                                            <div className='title-box-d'>
                                                <h3 className='title-d'>{agent.name}</h3>
                                            </div>
                                        </div>
                                        <div className='agent-content mb-3'>
                                            <p className='content-d color-text-a'>
                                                {agent.description}
                                                <br />
                                                {agent.description}
                                            </p>
                                            <div className='info-agents color-a'>
                                                <p>
                                                    <strong>Phone: </strong>
                                                    <span className='color-text-a'> {agent.phone}</span>
                                                </p>
                                                <p>
                                                    <strong>Mobile: </strong>
                                                    <span className='color-text-a'> {agent.mobile}</span>
                                                </p>
                                                <p>
                                                    <strong>Email: </strong>
                                                    <span className='color-text-a'> {agent.email}</span>
                                                </p>
                                                <p>
                                                    <strong>Skype: </strong>
                                                    <span className='color-text-a'> {agent.skype}</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className='socials-footer'>
                                            <ul className='list-inline'>
                                                <li className='list-inline-item'>
                                                    <a href={agent.facebook} className='link-one'>
                                                        <i className='bi bi-facebook' aria-hidden="true"></i>
                                                    </a>
                                                </li>
                                                <li className='list-inline-item'>
                                                    <a href={agent.twitter} className='link-one'>
                                                        <i className='bi bi-twitter' aria-hidden="true"></i>
                                                    </a>
                                                </li>
                                                <li className='list-inline-item'>
                                                    <a href={agent.instagram} className='link-one'>
                                                        <i className='bi bi-instagram' aria-hidden="true"></i>
                                                    </a>
                                                </li>
                                                <li className='list-inline-item'>
                                                    <a href={agent.linkedin} className='link-one'>
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

            </section>
        </main>
    );
}

export default AgentSingle;
