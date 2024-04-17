import React, { useState } from 'react';

function ContactForm() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [result, setResult] = useState('');

    const handleSubmitMessage = async (e) => {
        e.preventDefault();
        if (fullName === '' || email === '' || phoneNumber === '' || message === '') {
            setResult('incomplete');
            return;
        }
        try {
            const response = await fetch('http://127.0.0.1:8080/mails/mailForm', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fullName, email, phoneNumber, subject, message })
            });
            if (!response.ok) {
                throw new Error('Impossible d\'envoyer le formulaire');
            }
            const data = await response.json();
            console.log('Réponse du backend :', data);
            setResult('success');
            setFullName('');
            setEmail('');
            setPhoneNumber('');
            setSubject('');
            setMessage('');
            console.log('Formulaire envoyé avec succès');
        } catch (error) {
            console.error('Erreur :', error);
            setResult('error');
        }
    };

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
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <div className='col-md-12 mb-3'>
                    <div className='form-group'>
                        <input
                            type="text"
                            name="phoneNumber"
                            className='form-control form-control-lg form-control-a'
                            placeholder='Numéro de téléphone'
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
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
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
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
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                    </div>
                </div>

                <div className='col-md-12 my-3'>
                    <div className='mb-3'>
                        <div className='loading'>Chargement</div>
                        {result === 'incomplete' && (
                            <div className='error-message'>
                                Veuillez remplir tous les détails ci-dessus
                            </div>
                        )}
                        {result === 'success' && (
                            <div className='sent-message'>
                                Votre message a été envoyé ! Merci !
                            </div>
                        )}
                        {result === 'error' && (
                            <div className='error-message'>
                                Une erreur s'est produite. Veuillez réessayer plus tard.
                            </div>
                        )}
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
