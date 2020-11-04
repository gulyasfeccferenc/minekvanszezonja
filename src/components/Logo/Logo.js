import React from "react";
import logoImage from "../../radish.png";
import classes from "./Logo.module.scss";

const logo = (props) => (
  <div className={classes.Logo}>
    <img src={logoImage} alt="Minek van szezonja" />
  </div>
);

export default logo;
