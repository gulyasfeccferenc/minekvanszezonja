import React from 'react';
import classes from './Footer.module.scss';
import carrot from '../../../assets/carrot.png';

const footer = (props) => (
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
      Kérdés, ötlet, javaslat:
      {' '}
      <a href="mailto:admin@minekvanszezonja.hu">admin🐛minekvanszezonja.hu</a>
    </p>
    <p>
      Made with
      {' '}
      <span role="img" alt="radish" aria-label="radis icon">
        🌱
      </span>
      {' '}
      by
      {' '}
      <a href="https://gulyasfeccferenc.github.io">gulyasfeccferenc</a>
    </p>
  </footer>
);

export default footer;
