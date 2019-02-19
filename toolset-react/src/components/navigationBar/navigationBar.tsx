import React from 'react';
import { Link } from 'react-router-dom';
import 'src/components/navigationBar/navigationBar.css';

const NavigationBar: React.FC<{}> = () => {
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
