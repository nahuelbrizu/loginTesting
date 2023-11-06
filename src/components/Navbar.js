// Navbar.js
import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useAuth } from '../AuthContext';
import Login from "../Login";
import {Link} from "react-router-dom";
import { Modal, Button, Form } from 'react-bootstrap';
import {auth} from "../firebase";

function Navbar() {
    const { isAuthenticated,  login, logout, onUserChange , setUser, user} = useAuth();
    const [loggedIn, setLoggedIn] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        const userToken = Cookies.get('userToken');
        if (userToken) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [isAuthenticated]);

    const handleShowLogin = () => {
        if (!loggedIn) {
            setShowLoginModal(true);
        }
    };

    const handleCloseLogin = () => {
        setShowLoginModal(false);
    };

    const handleLoginSuccess = (user) => {
        setLoggedIn(true);
        login(user);
        handleCloseLogin();
    };
    const handleLogout = async () => {
        try {
            await auth.signOut();
            Cookies.remove('userToken');
            setLoggedIn(false);
            setUser(null);
            onUserChange(null); // Notify the parent component (App) that the user has logged out
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    LoginApp
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link">
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className="nav-link">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="navbar  " id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        {isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <span className="nav-link">Welcome, {user?.displayName}</span>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-danger" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li className="nav-item">
                                <button className="btn btn-primary" onClick={handleShowLogin}>
                                    Login
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <Modal show={showLoginModal} onHide={handleCloseLogin}>
                <Modal.Header closeButton>
                    <Modal.Title>Iniciar sesión</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Login onSuccess={handleLoginSuccess} />
                    </Form>
                </Modal.Body>
            </Modal>
        </nav>
    );
};

export default Navbar;
