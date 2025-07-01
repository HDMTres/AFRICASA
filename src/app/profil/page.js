'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    adresse: ''
  });
  const router = useRouter();

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    // Charger les données utilisateur
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/auth/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        setFormData({
          nom: userData.nom || '',
          prenom: userData.prenom || '',
          email: userData.email || '',
          telephone: userData.telephone || '',
          adresse: userData.adresse || ''
        });
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Erreur lors du chargement du profil:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8080/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setEditing(false);
        alert('Profil mis à jour avec succès !');
      } else {
        alert('Erreur lors de la mise à jour du profil');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la mise à jour du profil');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Mon Profil</h4>
              <div>
                <button 
                  className="btn btn-outline-primary me-2"
                  onClick={() => setEditing(!editing)}
                >
                  {editing ? 'Annuler' : 'Modifier'}
                </button>
                <button 
                  className="btn btn-outline-danger"
                  onClick={handleLogout}
                >
                  Déconnexion
                </button>
              </div>
            </div>
            <div className="card-body">
              {editing ? (
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="prenom" className="form-label">Prénom</label>
                      <input
                        type="text"
                        className="form-control"
                        id="prenom"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="nom" className="form-label">Nom</label>
                      <input
                        type="text"
                        className="form-control"
                        id="nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="telephone" className="form-label">Téléphone</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="telephone"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="adresse" className="form-label">Adresse</label>
                    <textarea
                      className="form-control"
                      id="adresse"
                      name="adresse"
                      rows="3"
                      value={formData.adresse}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Sauvegarder
                  </button>
                </form>
              ) : (
                <div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <strong>Prénom:</strong> {user?.prenom || 'Non renseigné'}
                    </div>
                    <div className="col-md-6 mb-3">
                      <strong>Nom:</strong> {user?.nom || 'Non renseigné'}
                    </div>
                  </div>
                  <div className="mb-3">
                    <strong>Email:</strong> {user?.email}
                  </div>
                  <div className="mb-3">
                    <strong>Téléphone:</strong> {user?.telephone || 'Non renseigné'}
                  </div>
                  <div className="mb-3">
                    <strong>Adresse:</strong> {user?.adresse || 'Non renseignée'}
                  </div>
                  <div className="mb-3">
                    <strong>Membre depuis:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('fr-FR') : 'Non disponible'}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}