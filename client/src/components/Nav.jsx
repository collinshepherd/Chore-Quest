import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <>
            <Navbar expand="lg" style={{ backgroundColor: "#1B2021" }}>
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ backgroundColor: '#399e5a' }} />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/" style={{ color: "white"}}>
                                Home
                            </Nav.Link>
                            <Nav.Link as={Link} to="/Signup" style={{ color: "white"}}>
                                SignUp
                            </Nav.Link>
                            <Nav.Link as={Link} to="/login" style={{ color: "white"}}>
                                Login
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br/>
        </>
    );
}

export default Navigation;
