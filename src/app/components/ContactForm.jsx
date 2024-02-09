"use client";
import React, { useState } from 'react';

function ContactForm() {
    const initialState = {
        fullname: '',
        email: '',
        subject: '',
        message: '',
        result: ''
    };
    const [text, setText] = useState(initialState);

    const handleSubmitMessage = (e) => {
        e.preventDefault();
        if (text.fullname === '' || text.email === '' || text.message === '') {
            setText({ ...text, result: "incomplete" });
            return;
        }
        console.log("Form Submitted!");
    };

    const changeText = (e) => {
        const { name, value } = e.target;
        setText({ ...text, [name]: value, result: '' });
    }

    return (
        <form role="form" className='contact-form' onSubmit={handleSubmitMessage}>
            <div className='row'>
                <div className='col-md-6 mb-3'>
                    <div className='form-group'>
                        <input
                            type="text"
                            name="fullname"
                            className='form-control form-control-lg form-control-a'
                            placeholder='Your Name'
                            value={text.fullname}
                            onChange={changeText}
                        />
                    </div>
                </div>
                <div className='col-md-6 mb-3'>
                    <div className='form-group'>
                        <input
                            type="email"
                            name="email"
                            className='form-control form-control-lg form-control-a'
                            placeholder='Your Email'
                            value={text.email}
                            onChange={changeText}
                        />
                    </div>
                </div>
                <div className='col-md-12 mb-3'>
                    <div className='form-group'>
                        <input
                            type="text"
                            name="subject"
                            className='form-control form-control-lg form-control-a'
                            placeholder='Subject'
                            value={text.subject}
                            onChange={changeText}
                        />
                    </div>
                </div>
                <div className='col-md-12'>
                    <div className='form-group'>
                        <textarea
                            name="message"
                            className='form-control'
                            cols="45"
                            rows="8"
                            placeholder='Message'
                            value={text.message}
                            onChange={changeText}
                        ></textarea>
                    </div>
                </div>

                <div className='col-md-12 my-3'>
                    <div className='mb-3'>
                        <div className='loading'>Loading</div>
                        {text.result === 'incomplete' && (
                            <div className='error-message'>
                                Please fill in all above details
                            </div>
                        )}
                        <div className='sent-message'>
                            Your message has been send. Thank You!
                        </div>
                    </div>
                </div>

                <div className='col-md-12 text-center'>
                    <button className='btn btn-a' type="submit">
                        Send Message
                    </button>
                </div>
            </div>
        </form>
    );
}

export default ContactForm;
