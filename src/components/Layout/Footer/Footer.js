import React from "react";
import classes from './Footer.module.scss';
import carrot from '../../../assets/carrot.png';

const footer = (props) => (
    <footer className={classes.Footer}>
        <div className={classes.ground}>
            <img src={carrot} alt=""/>
            <img src={carrot} alt=""/>
            <img src={carrot} alt=""/>
            <img src={carrot} alt=""/>
            <img src={carrot} alt=""/>
        </div>
        <p>Made with 🌱 by <a href="https://gulyasfeccferenc.github.io">gulyasfeccferenc</a></p>
    </footer>
)

export default footer;
