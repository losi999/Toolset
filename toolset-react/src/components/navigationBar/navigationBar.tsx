import React from 'react';
import './navigationBar.css';
import { Link } from "react-router-dom";

const NavigationBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/registration' >
                        REGISTRATION
                    </Link>
                </li>
                <li>
                    <Link to='/login' >
                        LOGIN
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavigationBar;