import React from 'react';
import classes from './Backdrop.module.scss';

const backDrop = (props) => (props.show ? (
  <div className={classes.Backdrop} onClick={props.clickHandler} />
) : null);

export default backDrop;
