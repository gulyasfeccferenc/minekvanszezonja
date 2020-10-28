import React from 'react';
import classes from './Toolbar.module.scss';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <div className={classes.Hamburger} onClick={props.sideDrawerOpener}>
      <span role="img" alt="menu" aria-label="hamburger menu icon">
        🍔
      </span>
    </div>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.NavItems}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
