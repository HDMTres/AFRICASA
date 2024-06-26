"use client";
import React, { useState, useEffect } from 'react';

import Breadcrumb from '../components/Breadcrumb';

import './styles.css';
import PropertyCard from '../components/PropertyCard';
import Pagination from '../components/Pagination';

function PropertyList() {
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
        <main id='main'>
            <Breadcrumb
                title="Our Amazing Properties"
                subtitle="Properties List"
                page="Properties List"
            />

            <section className='property-grid grid'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-12'>
                            <div className='grid-option'>
                                <form>
                                    <select className='custom-select'>
                                        <option defaultValue="All">All</option>
                                        <option value="1">New to Old</option>
                                        <option value="2">For Rent</option>
                                        <option value="3">For Sale</option>
                                    </select>
                                </form>
                            </div>
                        </div>
                        {properties && properties.length > 0 &&
                            properties.map(property => (
                                <div className='col-md-4' key={property.id}>
                                    <PropertyCard property={property} />
                                </div>
                            ))}
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

export default PropertyList;












