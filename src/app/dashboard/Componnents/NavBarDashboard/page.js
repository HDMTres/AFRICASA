"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Nav, Navbar, Container, NavDropdown } from 'react-bootstrap';
import { FaSignOutAlt } from 'react-icons/fa';
import './styles.css';

function NavBarDashboard() {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.setItem("isAuth", false);
    window.location.href = "/login";
  };

  return (
    <Navbar expand="lg" className="dashboard-navbar">
      <Container>
        <Navbar.Brand href="/" className="brand-link">
          <span className="logo-afri">AFRI</span><span className="logo-casa">CASA</span>
        </Navbar.Brand>
        <Nav className="ml-auto">
          <NavDropdown
            title={
              <img src="/path/to/profile.jpg" alt="Profil" className="profile-pic" />
            }
            id="profile-dropdown"
            show={showDropdown}
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <NavDropdown.Item onClick={handleLogout}>
              <FaSignOutAlt /> Déconnexion
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default NavBarDashboard;
