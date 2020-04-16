import React, {Fragment} from "react";
import classes from './TableView.module.scss'
import TableRow from './TableRow/TableRow';

const TableView = (props) => {
    const plants = Object.keys(props.plants);
    let plantRows;
    let filteredPlants;
    if (props.searchedTerm && props.searchedTerm.length > 2) {
        const filterValue = props.searchedTerm.toLowerCase();
        filteredPlants = plants.filter(item => {
            return item.toLowerCase().includes(filterValue);
        });

        if (filteredPlants.length < 1) {
            plantRows = <p className={classes.FullWidth}>A keresett növény ({props.searchedTerm}) sajnos nem található!</p>;
        } else {
            plantRows = filteredPlants.map(item => {
                return (<TableRow key={item + '_key'}
                                  name={item}
                                  description={props.plants[item].details}
                                  season={props.plants[item].season}
                />);
            });
        }
    } else {
        plantRows = plants.map(item => {
            return (<TableRow key={item + '_key'}
                              name={item}
                              description={props.plants[item].details}
                              season={props.plants[item].season}
            />);
        });
    }


    return (
        <Fragment>
            <div className={classes.GridContainer}>
                <div className={classes.GridHeader}></div>
                <div className={classes.GridHeader} title="Január">Jan</div>
                <div className={classes.GridHeader} title="Február">Feb</div>
                <div className={classes.GridHeader} title="Március">Már</div>
                <div className={classes.GridHeader} title="Április">Ápr</div>
                <div className={classes.GridHeader} title="Május">Máj</div>
                <div className={classes.GridHeader} title="Június">Jún</div>
                <div className={classes.GridHeader} title="Július">Júl</div>
                <div className={classes.GridHeader} title="Augusztus">Aug</div>
                <div className={classes.GridHeader} title="Szeptember">Szep</div>
                <div className={classes.GridHeader} title="Október">Okt</div>
                <div className={classes.GridHeader} title="November">Nov</div>
                <div className={classes.GridHeader} title="December">Dec</div>
                {plantRows}
            </div>
        </Fragment>
    )
};

export default TableView;
