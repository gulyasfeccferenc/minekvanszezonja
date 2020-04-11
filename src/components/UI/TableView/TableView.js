import React, {Fragment} from "react";
import classes from './TableView.module.scss'
import TableRow from './TableRow/TableRow';

const plants = ['Répa', 'Retek', 'Mogyoró', 'Bazsalikom'];

const TableView = (props) => {
    const plantRows = plants.map(item => {
        return (<TableRow key={item + '_key'} name={item} />);
    })

    return (
        <Fragment>
            <p>{props.searchedTerm}</p>
            <div className={classes.GridContainer}>
                <div className={classes.GridHeader}>Hónapok/Növények</div>
                <div className={classes.GridHeader} title="Január">Jan</div>
                <div className={classes.GridHeader} title="Január">Feb</div>
                <div className={classes.GridHeader} title="Január">March</div>
                <div className={classes.GridHeader} title="Január">Ápr</div>
                <div className={classes.GridHeader} title="Január">Máj</div>
                <div className={classes.GridHeader} title="Január">Jún</div>
                <div className={classes.GridHeader} title="Január">Júl</div>
                <div className={classes.GridHeader} title="Január">Aug</div>
                <div className={classes.GridHeader} title="Január">Szep</div>
                <div className={classes.GridHeader} title="Január">Okt</div>
                <div className={classes.GridHeader} title="Január">Nov</div>
                <div className={classes.GridHeader} title="Január">Dec</div>
                {plantRows}
            </div>
        </Fragment>
    )
};

export default TableView;
