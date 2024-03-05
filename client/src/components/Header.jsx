import React from "react";
import { Container, Heading } from 'react-bulma-components';
import '../style/Header.css';

    

function Header() {
    return (
        <>
        <Container className="bg-dark">
            <Heading>
                <header className="text-white abril-fatface-regular" style={{ fontSize: "80px" }}>
                Chore Quest
                </header>
            </Heading>
        </Container>
        </>
    );
}

export default Header;