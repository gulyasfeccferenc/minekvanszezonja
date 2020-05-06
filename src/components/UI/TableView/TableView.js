import React, {Component, Fragment} from "react";
import classes from './TableView.module.scss'
import TableRow from './TableRow/TableRow';
import instance from "../../Com/AxiosHandler";
import {NavLink} from "react-router-dom";

class TableView extends Component {
    state = {
        plants: []
    };

    constructor(props) {
        super(props);
        this.plantRows = null;
        this.filteredPlants = null;
        // this.state.plants = props.plants ? Object.keys(props.plants) : [];
    }



    componentDidMount() {
        const self = this;
        instance.get('plants.json')
            .then(function (response) {
                const rawPlantData = [];
                for (let key in response.data) {
                    rawPlantData.push({
                        ...response.data[key],
                        id: key
                    });
                }
                self.setState({plants: rawPlantData});
            })
            .catch(function (error) {
                // handle error
                console.error("Some nasty error happened here: ", error);
            });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    calculatePlantRows() {
        if (this.props.searchedTerm && this.props.searchedTerm.length > 2) {
            const filterValue = this.props.searchedTerm.toLowerCase();
            this.filteredPlants = this.state.plants.filter(item => {
                return item.toLowerCase().includes(filterValue);
            });

            if (this.filteredPlants.length < 1) {
                this.plantRows = <p className={classes.FullWidth}>A keresett növény ({this.props.searchedTerm}) sajnos nem található!</p>;
            } else {
                this.plantRows = this.filteredPlants.map(item => {
                    return (<TableRow key={item.id + '_key'}
                                      name={item.name}
                                      description={item.details}
                                      season={item.season}
                    />);
                });
            }
        } else {
            this.plantRows = this.state.plants.map(item => {
                return (<TableRow key={item.id + '_key'}
                                  id={item.id}
                                  name={item.name}
                                  description={item.details}
                                  season={item.season}
                />);
            });
        }
    }


    render() {
        if (Object.keys(this.state.plants).length > 1) {
            this.calculatePlantRows();
        } else {
            this.plantRows = <Fragment><p className={classes.FullWidth}>Nincs növény az adatbázisban</p><NavLink to={"/plants/new"}>
                <p>Adj hozzá egy újat</p>
            </NavLink></Fragment>;
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
                    {this.plantRows}
                </div>
                <NavLink to={"/plants/new"}>
                    <p>+ Adj hozzá egy újat</p>
                </NavLink>
            </Fragment>
        )
    }
};

export default TableView;
