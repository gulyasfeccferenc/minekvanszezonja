import React, { Component, Fragment } from "react";
import { db } from "../../../services/firebase";
import * as styles from "./Dashboard.module.scss";

import { Card } from "antd";
const { Meta } = Card;
import plant_placeholder from "../../../assets/plant_placeholder.jpg";
import ScrollContainer from "react-indiana-drag-scroll";
import Title from "antd/es/typography/Title";

export default class Dashboard extends Component {
  constructor() {
    super();
    this.month = "Január";
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

  generateMonthHighlights() {
    let plantsOfMonth = this.state.plants.filter(
      (plant) => plant.season.indexOf(1) > -1
    );
    return plantsOfMonth.map((item) => {
      return (
        // <li>
        //     {/*key={item.id + "_key"}*/}
        //     {/*id={item.id}*/}
        //     {item.name} - {item.details}
        //     {/*season={item.season}*/}
        // </li>
        <Card
          className={styles.Card}
          key={item.id}
          hoverable
          style={{ width: 150 }}
          cover={<img alt="example" src={plant_placeholder} />}
        >
          <Meta title={item.name} description={item.description} />
        </Card>
      );
    });
  }

  render() {
    return (
      <Fragment>
        <section className={styles.Dashboard}>
          <Title> {this.month} sztárjai</Title>
          <ul className={styles.CardContainer}>
            <ScrollContainer>{this.generateMonthHighlights()}</ScrollContainer>
          </ul>
        </section>
      </Fragment>
    );
  }
}
