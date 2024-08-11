"use client";
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { FaHome, FaPlus, FaSearch, FaEnvelope, FaChartLine, FaHeart, FaUser } from 'react-icons/fa';
import NoNavLayout from '../components/NoNavLayout';
import './styles.css';
import NavBarDashboard from "./Componnents/NavBarDashboard/page";

const Dashboard = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
      <NoNavLayout>
        <NavBarDashboard />
            <section className="dashboard-container">
                <section className="wrapper">
                    <div className="dashboard">
                        <h1>Tableau de Bord</h1>
                        <div className="dashboard-buttons">
                            <Link href="/add-property">
                                <div className="dashboard-button">
                                    <FaPlus className="icon" />
                                    <span>Ajouter un bien</span>
                                </div>
                            </Link>
                            <Link href="/my-properties">
                                <div className="dashboard-button">
                                    <FaHome className="icon" />
                                    <span>Consulter mes biens</span>
                                </div>
                            </Link>
                            <Link href="/search-properties">
                                <div className="dashboard-button">
                                    <FaSearch className="icon" />
                                    <span>Rechercher des biens</span>
                                </div>
                            </Link>
                            <Link href="/messaging">
                                <div className="dashboard-button">
                                    <FaEnvelope className="icon" />
                                    <span>Messagerie</span>
                                </div>
                            </Link>
                            <Link href="/statistics">
                                <div className="dashboard-button">
                                    <FaChartLine className="icon" />
                                    <span>Statistiques</span>
                                </div>
                            </Link>
                            <Link href="/favorites">
                                <div className="dashboard-button">
                                    <FaHeart className="icon" />
                                    <span>Favoris</span>
                                </div>
                            </Link>
                            <Link href="/profile">
                                <div className="dashboard-button">
                                    <FaUser className="icon" />
                                    <span>Profil</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>
            </section>
        </NoNavLayout>
    );
};

export default Dashboard;
