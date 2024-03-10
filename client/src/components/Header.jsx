import React from 'react';
import { Container, Heading } from 'react-bulma-components';
import '../style/Header.css';
import ChoreQuestHeader from "../assets/images/ChoreQuest4.png";

function Header() {
    return (
        <>
        <img src={ChoreQuestHeader} style={{ height:"80%", width:"100%"}} />
            {/* <Container className="header-container">
                <Heading>
                    <header
                        className="abril-fatface-regular"
                        style={{ fontSize: '80px' }}
                    >
                        Chore Quest
                    </header>
                </Heading>
            </Container> */}
        </>
    );
}

export default Header;
