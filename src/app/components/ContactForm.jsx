"use client";
import React, { useState } from 'react';


 // Cette page est le formulaire du contact

function ContactForm() {
    const initialState = { // Ici, les objecs déclarer
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
        console.log("Formulaire envoyé");
    };

    const changeText = (e) => {
        const { name, value } = e.target;
        setText({ ...text, [name]: value, result: '' });
    }

    //On return les objects déclarer
    return (
        <form role="form" className='contact-form' onSubmit={handleSubmitMessage}>
            <div className='row'>
                <div className='col-md-6 mb-3'>
                    <div className='form-group'>
                        <input
                            type="text"
                            name="fullname"
                            className='form-control form-control-lg form-control-a'
                            placeholder='Votre nom'
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
                            placeholder='Votre Email'
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
                            placeholder='Titre du sujet'
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
                            placeholder='Votre message'
                            value={text.message}
                            onChange={changeText}
                        ></textarea>
                    </div>
                </div>

                <div className='col-md-12 my-3'>
                    <div className='mb-3'>
                        <div className='loading'>Chargement</div>
                        {text.result === 'incomplete' && (
                            <div className='error-message'>
                                Veuillez remplir tous les détails ci-dessus
                            </div>
                        )}
                        <div className='sent-message'>
                            Votre message a été envoyé ! Merci ! 
                        </div>
                    </div>
                </div>

                <div className='col-md-12 text-center'>
                    <button className='btn btn-a' type="submit">
                        Envoyer
                    </button>
                </div>
            </div>
        </form>
    );
}

export default ContactForm;
