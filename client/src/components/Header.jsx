import React from "react";
import { Container, Heading } from 'react-bulma-components';
    

function Header() {
    return (
        <>
        <Container className="bg-dark">
            <Heading>
                <header className="text-white" style={{ fontSize: "70px" }}>
                Chore Quest
                </header>
            </Heading>
        </Container>
        </>
    );
}

export default Header;