import React, {Fragment} from "react";
import classes from './TableRow.module.scss';

const TableRow = (props) => {


    return (
        <Fragment>
            <div>{props.name}</div>
            <div className={classes.Grid}></div>
            <div className={classes.Grid}></div>
            <div className={classes.Grid}></div>
            <div className={classes.Grid}>X</div>
            <div className={classes.Grid}>X</div>
            <div className={classes.Grid}>X</div>
            <div className={classes.Grid}>X</div>
            <div className={classes.Grid}>X</div>
            <div className={classes.Grid}>X</div>
            <div className={classes.Grid}></div>
            <div className={classes.Grid}></div>
            <div className={classes.Grid}></div>
        </Fragment>
    );
}

export default TableRow;
