import React from 'react';
import { Footer } from 'react-bulma-components';
import '../style/Footer.css';

const AppFooter = () => {
    return (
        <Footer className="footer-container">
            <h3 className="name-text">
                &copy; 2024 All rights reserved Design by Alfredo Mercado,
                Andria Goodwin, Chris Brewer, Collin Shepherd, & Nate McMahon
            </h3>
        </Footer>
    );
};

export default AppFooter;
