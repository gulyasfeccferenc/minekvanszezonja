import React, { Fragment, useContext } from "react";
import { NavLink } from "react-router-dom";
import { Tooltip } from "antd";
import classes from "./TableRow.module.scss";
import { UserContext } from "../../../../services/UserProvider";

const TableRow = (props) => {
  const plantName = (
    <Tooltip title={props.description}>
      <div>{props.name}</div>
    </Tooltip>
  );
  const navLink = <NavLink to={`/plants/${props.id}`}>{plantName}</NavLink>;
  return (
    <>
      <div className={classes.TableRow}>
        {navLink}
        <Tooltip title="Január">
          <div className={classes.Grid}>
            {props.season && props.season.includes(1) ? "X" : null}
          </div>
        </Tooltip>
        <Tooltip title="Február">
          <div className={classes.Grid}>
            {props.season && props.season.includes(2) ? "X" : null}
          </div>
        </Tooltip>
        <Tooltip title="Március">
          <div className={classes.Grid}>
            {props.season && props.season.includes(3) ? "X" : null}
          </div>
        </Tooltip>
        <Tooltip title="Április">
          <div className={classes.Grid}>
            {props.season && props.season.includes(4) ? "X" : null}
          </div>
        </Tooltip>
        <Tooltip title="Május">
          <div className={classes.Grid}>
            {props.season && props.season.includes(5) ? "X" : null}
          </div>
        </Tooltip>
        <Tooltip title="Június">
          <div className={classes.Grid}>
            {props.season && props.season.includes(6) ? "X" : null}
          </div>
        </Tooltip>
        <Tooltip title="Július">
          <div className={classes.Grid}>
            {props.season && props.season.includes(7) ? "X" : null}
          </div>
        </Tooltip>
        <Tooltip title="Augusztus">
          <div className={classes.Grid}>
            {props.season && props.season.includes(8) ? "X" : null}
          </div>
        </Tooltip>
        <Tooltip title="Szeptember">
          <div className={classes.Grid}>
            {props.season && props.season.includes(9) ? "X" : null}
          </div>
        </Tooltip>
        <Tooltip title="Október">
          <div className={classes.Grid}>
            {props.season && props.season.includes(10) ? "X" : null}
          </div>
        </Tooltip>
        <Tooltip title="November">
          <div className={classes.Grid}>
            {props.season && props.season.includes(11) ? "X" : null}
          </div>
        </Tooltip>
        <Tooltip title="December">
          <div className={classes.Grid}>
            {props.season && props.season.includes(12) ? "X" : null}
          </div>
        </Tooltip>
      </div>
    </>
  );
};

export default TableRow;
