"use client";
import React from 'react';

import './propertyCard.css';
import Link from 'next/link';

function PropertyCard({ property }) {
    return (
        <div className='card-box-a card-shadow'>
            <div className="img-box-a">
                <img src={property.bgImg} alt="property" className='img-a img-fluid' />
            </div>
            <div className="card-overlay">
                <div className="card-overlay-a-content">
                    <div className="card-header-a">
                        <h2 className="card-title-a">
                            <Link href={`/properties/${property.id}`}>
                                {property.number} {property.addressOne}
                                <br /> {property.addressTwo}
                            </Link>
                        </h2>
                    </div>
                    <div className="card-body-a">
                        <div className="price-box d-flex">
                            <span className="price-a">
                                {property.status} | ${property.price.toFixed(2)}
                            </span>
                        </div>
                        <Link href={`/properties/${property.id}`} className='link-a'>
                            Click here to view
                            <span className='bi bi-chevron-right'></span>
                        </Link>
                    </div>
                    <div className="card-footer-a">
                        <ul className="card-info d-flex justify-content-around">
                            <li>
                                <h4 className='card-info-title'>Area</h4>
                                <span>
                                    {property.area}m<sup>2</sup>
                                </span>
                            </li>
                            <li>
                                <h4 className='card-info-title'>Beds</h4>
                                <span>{property.beds}</span>
                            </li>
                            <li>
                                <h4 className='card-info-title'>Baths</h4>
                                <span>{property.baths}</span>
                            </li>
                            <li>
                                <h4 className='card-info-title'>Garages</h4>
                                <span>{property.garages}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PropertyCard;
