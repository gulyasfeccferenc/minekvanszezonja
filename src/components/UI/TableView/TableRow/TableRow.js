import React, {Fragment, useContext} from "react";
import classes from './TableRow.module.scss';
import {NavLink} from "react-router-dom";
import {UserContext} from "../../../../services/UserProvider";
import {Tooltip} from "antd";

const TableRow = (props) => {
    const user = useContext(UserContext);
    const plantName = (<Tooltip title={props.description}><div>{props.name}</div></Tooltip>);
    const navLink = (<NavLink to={"/plants/" + props.id}>
        {plantName}
    </NavLink>)
    return (
        <Fragment>
            {user ? navLink : plantName}
            <div className={classes.Grid}>{(props.season && props.season.includes(1))? 'X':null}</div>
            <div className={classes.Grid}>{(props.season && props.season.includes(2))? 'X':null}</div>
            <div className={classes.Grid}>{(props.season && props.season.includes(3))? 'X':null}</div>
            <div className={classes.Grid}>{(props.season && props.season.includes(4))? 'X':null}</div>
            <div className={classes.Grid}>{(props.season && props.season.includes(5))? 'X':null}</div>
            <div className={classes.Grid}>{(props.season && props.season.includes(6))? 'X':null}</div>
            <div className={classes.Grid}>{(props.season && props.season.includes(7))? 'X':null}</div>
            <div className={classes.Grid}>{(props.season && props.season.includes(8))? 'X':null}</div>
            <div className={classes.Grid}>{(props.season && props.season.includes(9))? 'X':null}</div>
            <div className={classes.Grid}>{(props.season && props.season.includes(10)) ? 'X':null}</div>
            <div className={classes.Grid}>{(props.season && props.season.includes(11)) ? 'X':null}</div>
            <div className={classes.Grid}>{(props.season && props.season.includes(12)) ? 'X':null}</div>
        </Fragment>
    );
}

export default TableRow;
