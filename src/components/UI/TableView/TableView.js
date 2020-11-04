import React, { Component, Fragment } from "react";
import classes from "./TableView.module.scss";
import TableRow from "./TableRow/TableRow";
import { NavLink } from "react-router-dom";
import { db } from "../../../services/firebase";
import { Button, Empty, Checkbox } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { UserContext } from "../../../services/UserProvider";

class TableView extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.plantRows = null;
    this.filteredPlants = null;
    this.state = {
      plants: [],
    };
  }

  componentDidMount() {
    const self = this;
    db.ref("plants/").on("value", (snapshot) => {
      const rawPlantData = [];
      snapshot.forEach((snap) => {
        rawPlantData.push({ ...snap.val(), id: snap.key });
      });
      self.setState({ plants: rawPlantData });
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  calculatePlantRows() {
    if (this.props.searchedItem && this.props.searchedItem.length > 2) {
      const filterValue = this.props.searchedItem.toString().toLowerCase();
      this.filteredPlants = this.state.plants.filter((item) => {
        return item.name.toLowerCase().includes(filterValue);
      });

      if (this.filteredPlants.length < 1) {
        this.plantRows = (
          <p className={classes.FullWidth}>
            A keresett növény ({this.props.searchedItem}) sajnos nem található!
          </p>
        );
      } else {
        this.plantRows = this.filteredPlants.map((item) => {
          return (
            <TableRow
              key={item.id + "_key"}
              name={item.name}
              description={item.details}
              season={item.season}
            />
          );
        });
      }
    } else {
      this.plantRows = this.state.plants.map((item) => {
        return (
          <TableRow
            key={item.id + "_key"}
            id={item.id}
            name={item.name}
            description={item.details}
            season={item.season}
          />
        );
      });
    }
  }

  render() {
    let mobileView = window.innerWidth < 460;
    if (Object.keys(this.state.plants).length > 0) {
      this.calculatePlantRows();
    } else {
      return (
        <section>
          <Empty>
            <p className={classes.FullWidth}>Nincs növény az adatbázisban</p>
            {this.context ? this.newButton : null}
          </Empty>
        </section>
      );
    }
    return (
      <Fragment>
        <div hidden>
          <Checkbox onChange={this.onFilterSelect}>Zöldség 🥕</Checkbox>
          <Checkbox onChange={this.onFilterSelect}>Gyümölcs 🍒</Checkbox>
          <Checkbox onChange={this.onFilterSelect}>Gyógynövény 🌿</Checkbox>
          <br />
          <Checkbox onChange={this.onFilterSelect}>Tavaszi 🍃</Checkbox>
          <Checkbox onChange={this.onFilterSelect}>Nyári 🌞</Checkbox>
          <Checkbox onChange={this.onFilterSelect}>Őszi 🍂</Checkbox>
          <Checkbox onChange={this.onFilterSelect}>Téli ❄</Checkbox>
        </div>
        <section className={mobileView ? classes.NoPadding : ""}>
          <div
            className={[
              classes.GridContainer,
              mobileView ? classes.smOptimized : "",
            ].join(" ")}
          >
            <div className={classes.GridHeader}></div>
            <div className={classes.GridHeader} title="Január">
              {mobileView ? "I" : "Jan"}
            </div>
            <div className={classes.GridHeader} title="Február">
              {mobileView ? "II" : "Feb"}
            </div>
            <div className={classes.GridHeader} title="Március">
              {mobileView ? "III" : "Már"}
            </div>
            <div className={classes.GridHeader} title="Április">
              {mobileView ? "IV" : "Ápr"}
            </div>
            <div className={classes.GridHeader} title="Május">
              {mobileView ? "V" : "Máj"}
            </div>
            <div className={classes.GridHeader} title="Június">
              {mobileView ? "VI" : "Jún"}
            </div>
            <div className={classes.GridHeader} title="Július">
              {mobileView ? "VII" : "Júl"}
            </div>
            <div className={classes.GridHeader} title="Augusztus">
              {mobileView ? "VIII" : "Aug"}
            </div>
            <div className={classes.GridHeader} title="Szeptember">
              {mobileView ? "IX" : "Szep"}
            </div>
            <div className={classes.GridHeader} title="Október">
              {mobileView ? "X" : "Okt"}
            </div>
            <div className={classes.GridHeader} title="November">
              {mobileView ? "XI" : "Nov"}
            </div>
            <div className={classes.GridHeader} title="December">
              {mobileView ? "XII" : "Dec"}
            </div>
            {this.plantRows}
          </div>
          {this.context ? this.newButton : null}
        </section>
      </Fragment>
    );
  }

  onFilterSelect() {}

  newButton = (
    <NavLink to={"/plants/new"}>
      <Button type="primary" shape="round" icon={<AppstoreAddOutlined />}>
        Adj hozzá egy újat
      </Button>
    </NavLink>
  );
}

export default TableView;
