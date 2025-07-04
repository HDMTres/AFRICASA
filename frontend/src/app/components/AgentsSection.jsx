"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import AgentCard from './AgentCard';

function AgentsSection() {
    const [agents, setAgents] = useState([]);

    const fetchData = () => {
        fetch('https://christmas-04.onrender.com/estateAgency/')
            .then(res => res.json())
            .then(data => setAgents(data[0]['agents']))
            .catch(err => console.log(err.message));
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <section className='section-agents section-t8'>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="title-wrap d-flex justify-content-between">
                            <div className="title-box">
                                <h2 className="title-a">Notre Equipe</h2>
                            </div>
                            <div className="title-link">
                                <Link href="/agents">
                                    Tous les membres
                                    <span className='bi bi-chevron-right'></span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {agents && agents.length > 0 && agents.slice(0, 3).map(agent => (
                        <div className='col-md-4' key={agent.id}>
                            <AgentCard agent={agent} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default AgentsSection;
