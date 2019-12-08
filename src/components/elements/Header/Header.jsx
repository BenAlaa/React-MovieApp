import React, { Component } from 'react';
import logo from '../../../Assets/Images/reactMovie3_logo.png'
import './Header.css';

const Header = () => {
    return ( 
        <div className="rmdb-header">
            <div className="rmdb-header-content">
                <img className="rmdb-logo" src={logo} alt="rmdb"/><span className="header-title-R">R</span><span className="header-title">Movies</span>
            </div>
        </div>
     );
}
 
export default Header;