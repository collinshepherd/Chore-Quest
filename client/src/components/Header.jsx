import React from 'react'
import { Container, Heading } from 'react-bulma-components'
import '../style/Header.css'

function Header() {
    return (
        <>
            <Container className="header-container">
                <Heading>
                    <header
                        className="abril-fatface-regular"
                        style={{ fontSize: '80px' }}
                    >
                        Chore Quest
                    </header>
                </Heading>
            </Container>
        </>
    )
}

export default Header
