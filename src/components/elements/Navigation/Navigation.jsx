import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Navigation.css';

const Navigation = (props) => {
    return ( 
        <div>
            <div className="rmdb-navigation">
                <div className="rmdb-navigation-content">
                    <Link to="/">
                        <p>Home</p>
                    </Link>
                    <p></p>
                    <p>{props.movie}</p>
                </div>
            </div>
        </div>
     );
}
 
export default Navigation;