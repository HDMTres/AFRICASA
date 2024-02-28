"use client";
import React, { useState, useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import AgentCard from '../components/AgentCard';
import Pagination from '../components/Pagination';

function AgentsList() {
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
        <main id="main">
            <Breadcrumb
                title="Our Amazing Agents"
                subtitle="Agents List"
                page="Agents List"
            />

            <section className='agents-grid grid'>
                <div className='container'>
                    <div className='row'>
                        {agents && agents.length > 0 && agents.map((agent => (
                            <div className='col-md-4' key={agent.id}>
                                <AgentCard agent={agent} />
                            </div>
                        )))}
                    </div>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <Pagination />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default AgentsList;
