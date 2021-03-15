import React from "react";
import classes from "./Footer.module.scss";
import carrot from "../../../assets/carrot.png";
import { NavLink } from "react-router-dom";

const footer = () => (
  <footer className={classes.Footer}>
    <div className={classes.ground}>
      <img src={carrot} alt="" />
      <img src={carrot} alt="" />
      <img src={carrot} alt="" />
      <img src={carrot} alt="" />
      <img src={carrot} alt="" />
    </div>
    <br />
    <p>
      <NavLink to={"/about"}>🤔🙄👨‍🌾 Mi is ez az oldal?</NavLink>
    </p>
    <p>
      Kérdés, ötlet, javaslat:{" "}
      <a href="mailto:ferenckoppany+minekvanszezonja@gmail.com">
        ferenckoppany+minekvanszezonja🐛gmail.com
      </a>
    </p>
    <p>
      Made with{" "}
      <span role="img" alt="radish" aria-label="radis icon">
        🌱
      </span>{" "}
      by <a href="https://gulyasfeccferenc.github.io">gulyasfeccferenc</a>
    </p>
  </footer>
);

export default footer;
