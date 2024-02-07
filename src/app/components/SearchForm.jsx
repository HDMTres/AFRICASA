"use client";
import React from 'react';

import './searchForm.css';


function SearchForm() {


    const handleCloseSearchForm = () => {
        document.body.classList.remove('box-collapse-open');
        document.body.classList.add('box-collapse-closed');
    };

    return (
        <>
            <div className='click-closed'></div>
            <div className="box-collapse">
                <div className="title-box-d">
                    <h3 className='title-d'>Search Propery</h3>
                </div>
                <span
                    className='close-box-collapse right-boxed bi bi-x'
                    onClick={handleCloseSearchForm}
                ></span>
                <div className='box-collapse-wrap form'>
                    <form className="form-a">
                        <div className="row">
                            <div className="col-md-12 mb-2">
                                <div className="form-group">
                                    <label htmlFor="Type" className='pb-2'>Keyword</label>
                                    <input
                                        type="text"
                                        className='form-control form-control-lg form-control-a'
                                        placeholder="Keyword"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group mt-3">
                                    <label htmlFor="Type" className='pb-2'>Type</label>
                                    <select id="Type" className='form-control form-select form-control-a'>
                                        <option>All Type</option>
                                        <option>For Rent</option>
                                        <option>For Sale</option>
                                        <option>Open House</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group mt-3">
                                    <label htmlFor="city" className='pb-2'>City</label>
                                    <select id="city" className='form-control form-select form-control-a'>
                                        <option>All City</option>
                                        <option>Alabama</option>
                                        <option>Arizona</option>
                                        <option>California</option>
                                        <option>Colorado</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group mt-3">
                                    <label htmlFor="bedrooms" className='pb-2'>Bedrooms</label>
                                    <select id="bedrooms" className='form-control form-select form-control-a'>
                                        <option>Any</option>
                                        <option>01</option>
                                        <option>02</option>
                                        <option>03</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group mt-3">
                                    <label htmlFor="garages" className='pb-2'>Garages</label>
                                    <select id="garages" className='form-control form-select form-control-a'>
                                        <option>Any</option>
                                        <option>01</option>
                                        <option>02</option>
                                        <option>03</option>
                                        <option>04</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group mt-3">
                                    <label htmlFor="bathrooms" className='pb-2'>Bathrooms</label>
                                    <select id="bathrooms" className='form-control form-select form-control-a'>
                                        <option>Any</option>
                                        <option>01</option>
                                        <option>02</option>
                                        <option>03</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6 mb-2">
                                <div className="form-group mt-3">
                                    <label htmlFor="price" className='pb-2'>Min Price</label>
                                    <select id="price" className='form-control form-select form-control-a'>
                                        <option>Unlimite</option>
                                        <option>$50.000</option>
                                        <option>$100.000</option>
                                        <option>$150.000</option>
                                        <option>$200.000</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-12 mt-4">
                                <button type="submit" className='btn btn-b'>
                                    Search Property
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default SearchForm;
