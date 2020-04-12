import React, {Fragment} from "react";
import classes from './TableRow.module.scss';

const TableRow = (props) => {

    return (
        <Fragment>
            <div title={props.description}>{props.name}</div>
            <div className={classes.Grid}>{props.season.includes(1) ? 'X':null}</div>
            <div className={classes.Grid}>{props.season.includes(2) ? 'X':null}</div>
            <div className={classes.Grid}>{props.season.includes(3) ? 'X':null}</div>
            <div className={classes.Grid}>{props.season.includes(4) ? 'X':null}</div>
            <div className={classes.Grid}>{props.season.includes(5) ? 'X':null}</div>
            <div className={classes.Grid}>{props.season.includes(6) ? 'X':null}</div>
            <div className={classes.Grid}>{props.season.includes(7) ? 'X':null}</div>
            <div className={classes.Grid}>{props.season.includes(8) ? 'X':null}</div>
            <div className={classes.Grid}>{props.season.includes(9) ? 'X':null}</div>
            <div className={classes.Grid}>{props.season.includes(10) ? 'X':null}</div>
            <div className={classes.Grid}>{props.season.includes(11) ? 'X':null}</div>
            <div className={classes.Grid}>{props.season.includes(12) ? 'X':null}</div>
        </Fragment>
    );
}

export default TableRow;
