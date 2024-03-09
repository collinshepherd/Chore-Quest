import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

function UserNavigation() {
    function navBarRendering() {
        const isLoggedIn = Auth.loggedIn();
        let role = '';
        if (isLoggedIn) {
            const { data } = Auth.getProfile();
            role = data.role;
            if (role === 'parent') {
                return (
                    <>
                        <Nav.Link
                            as={Link}
                            to="/addUser"
                            style={{ color: 'white' }}
                        >
                            Add User
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/addTask"
                            style={{ color: 'white' }}
                        >
                            Add Task
                        </Nav.Link>
                    </>
                );
            } else {
                return;
            }
        }
    }

    return (
        <>
        <Navbar expand="lg" style={{ backgroundColor: '#1B2021' }}>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link
                            as={Link}
                            to="/profile"
                            style={{ color: 'white' }}
                        >
                            Profile
                        </Nav.Link>
                        <Nav.Link
                            as={Link}
                            to="/users"
                            style={{ color: 'white' }}
                        >
                            Users
                        </Nav.Link>
                        {navBarRendering()}
                        <Nav.Link
                            as={Link}
                            to="/login"
                            style={{ color: 'white' }}
                        >
                            Logout
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <br/>
        </>
    );
}

export default UserNavigation;
