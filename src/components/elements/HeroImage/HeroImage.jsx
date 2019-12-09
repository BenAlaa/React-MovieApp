import React, { Component } from 'react';
import './HeroImage.css';

const HeroImage = (props) => {

    const styles_background = `linear-gradient(to bottom, rgba(0,0,0,0)39%, rgba(0,0,0,0)41%, rgba(0,0,0,0.5)100%), url('${props.image}'), #1c1c1c`;
    return ( 
        <div className="rmdb-heroimage" style={{background:styles_background}}>
            <div className="rmdb-heroimage-content">
                <div className="rmdb-heroimage-text">
                    <h1>{props.title}</h1>
                    <h3>{props.text}</h3>

                </div>
            </div>
        </div>
     );
}
 
export default HeroImage;