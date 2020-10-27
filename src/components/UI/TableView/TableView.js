import React, {Component, Fragment} from "react";
import classes from './TableView.module.scss'
import TableRow from './TableRow/TableRow';
import {NavLink} from "react-router-dom";
import {db} from "../../../services/firebase"
import {Button, Empty, Checkbox} from "antd";
import {AppstoreAddOutlined} from "@ant-design/icons";
import {UserContext} from "../../../services/UserProvider";

class TableView extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);
        this.plantRows = null;
        this.filteredPlants = null;
        this.state = {
            plants: []
        };
    }

    componentDidMount() {
        const self = this;
        db.ref("plants/").on("value", snapshot => {
            const rawPlantData = [];
            snapshot.forEach(snap => {
                rawPlantData.push({...snap.val(), id: snap.key});
            });
            self.setState({plants: rawPlantData});
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    calculatePlantRows() {
        if (this.props.searchedItem && this.props.searchedItem.length > 2) {
            const filterValue = this.props.searchedItem.toString().toLowerCase();
            this.filteredPlants = this.state.plants.filter(item => {
                return item.name.toLowerCase().includes(filterValue);
            });

            if (this.filteredPlants.length < 1) {
                this.plantRows = <p className={classes.FullWidth}>A keresett növény ({this.props.searchedItem}) sajnos nem található!</p>;
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
        if (Object.keys(this.state.plants).length > 0) {
            this.calculatePlantRows();
        } else {
            return (
                    <section>
                        <Empty>
                            <p className={classes.FullWidth}>Nincs növény az adatbázisban</p>
                            {this.context ? this.newButton : null}
                        </Empty>
                    </section>);
        }
        return (
            <Fragment>
                <Checkbox onChange={this.onFilterSelect}>Zöldség 🥕</Checkbox>
                <Checkbox onChange={this.onFilterSelect}>Gyümölcs 🍒</Checkbox>
                <Checkbox onChange={this.onFilterSelect}>Gyógynövény 🌿</Checkbox>
                <br/>
                <Checkbox onChange={this.onFilterSelect}>Tavaszi 🍃</Checkbox>
                <Checkbox onChange={this.onFilterSelect}>Nyári 🌞</Checkbox>
                <Checkbox onChange={this.onFilterSelect}>Őszi 🍂</Checkbox>
                <Checkbox onChange={this.onFilterSelect}>Téli ❄</Checkbox>
                <section>
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
                    {this.context ? this.newButton : null}
                </section>
            </Fragment>
        )
    }

    onFilterSelect() {

    }

    newButton = (<NavLink to={"/plants/new"}>
        <Button type="primary" shape="round" icon={<AppstoreAddOutlined />}>Adj hozzá egy újat</Button>
    </NavLink>);
};

export default TableView;
