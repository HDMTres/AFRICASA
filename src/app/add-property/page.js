"use client"
import React, { useState } from 'react';
import axios from 'axios';
import './styles.css';

const AddProperty = () => {
  const [propertyData, setPropertyData] = useState({
    address: '',
    coverPhoto: null,
    propertyType: '',
    price: 0,
    title: '',
    rooms: 0,
    baths: 0,
    purpose: '',
    sqSize: 0,
    externalID: '',
    photos: [],
    description: '',
    coverVideo: null,
    panorama: null,
    amenities: [],
    furnished: ''
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({
      ...propertyData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setPropertyData({
      ...propertyData,
      [name]: files.length > 1 ? [...files] : files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      for (const key in propertyData) {
        if (Array.isArray(propertyData[key])) {
          propertyData[key].forEach((file, index) => {
            formData.append(`${key}[${index}]`, file);
          });
        } else {
          formData.append(key, propertyData[key]);
        }
      }

       const token = localStorage.getItem("authToken")

      const response = await axios.post('http://127.0.0.1:8080/properties/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        // Redirection ou feedback après succès
        console.log('Propriété ajoutée avec succès');
      } else {
        setErrorMessage('Veuillez remplir tous les champs correctement.');
      }
    } catch (error) {
      setErrorMessage("Erreur lors de l'ajout de la propriété");
    }
  };

  return (
    <div className="add-property-container">
      <h1>Ajouter une Propriété</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form className="add-property-form" onSubmit={handleSubmit}>

        <div className="form-section">
          <h2 className="section-title">Informations Générales</h2>

          <div className="form-group">
            <label>Adresse</label>
            <input
              type="text"
              name="address"
              value={propertyData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Type de propriété</label>
            <select
              name="propertyType"
              value={propertyData.propertyType}
              onChange={handleChange}
              required
            >
              <option value="">Sélectionner</option>
              <option value="maison">Maison</option>
              <option value="appartement">Appartement</option>
              <option value="terrain">Terrain</option>
              <option value="autre">Autre (Précisez)</option>
            </select>
          </div>

          <div className="form-group">
            <label>Prix</label>
            <input
              type="number"
              name="price"
              value={propertyData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Titre</label>
            <input
              type="text"
              name="title"
              value={propertyData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={propertyData.description}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h2 className="section-title">Détails et Médias</h2>

          <div className="form-group">
            <label>Photo de couverture</label>
            <input
              type="file"
              name="coverPhoto"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Photos</label>
            <input
              type="file"
              name="photos"
              onChange={handleFileChange}
              multiple
              required
            />
          </div>

          <div className="form-group">
            <label>Vidéo de couverture</label>
            <input
              type="file"
              name="coverVideo"
              onChange={handleFileChange}
            />
          </div>

          <div className="form-group">
            <label>Panorama</label>
            <input
              type="file"
              name="panorama"
              onChange={handleFileChange}
            />
          </div>

          <div className="form-group">
            <label>Équipements</label>
            <input
              type="text"
              name="amenities"
              value={propertyData.amenities.join(',')}
              onChange={(e) =>
                setPropertyData({ ...propertyData, amenities: e.target.value.split(',') })
              }
            />
          </div>

          <div className="form-group">
            <label>Meublé</label>
            <select
              name="furnished"
              value={propertyData.furnished}
              onChange={handleChange}
            >
              <option value="">Sélectionner</option>
              <option value="oui">Oui</option>
              <option value="non">Non</option>
            </select>
          </div>
        </div>

        <button type="submit" className="submit-button">Ajouter</button>
      </form>
    </div>
  );
};

export default AddProperty;
