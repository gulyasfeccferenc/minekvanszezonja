import React, { Component, Fragment } from "react";
import { db } from "../../../services/firebase";
import * as styles from "./Dashboard.module.scss";
import { months } from "../../../Constants";
import { Card, Row, Col } from "antd";
const { Meta } = Card;
import plant_placeholder from "../../../assets/plant_placeholder.jpg";
import ScrollContainer from "react-indiana-drag-scroll";
import Title from "antd/es/typography/Title";
import HighlightedPlant from "./HighlightedPlant/HighlightedPlant";
import QuickSearchTable from "./QuickSearchTable/QuickSearchTable";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.month = this.getCurrentMonth().label;
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

  /**
   * This should filter the plants of the actual month
   * @returns {Array<Card>} Array with the generated cards
   */
  generateMonthHighlights() {
    let plantsOfMonth = this.state.plants.filter(
      (plant) => plant.season.indexOf(1) > -1
    );
    return plantsOfMonth.map((item) => {
      return (
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

  /**
   * Will gives back the current month according to the months array
   * @returns {{color: string, label: string, value: number}} An object with a month (label, value, color)
   */
  getCurrentMonth() {
    return months.find((item) => item.value === new Date().getMonth() + 1);
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
        <section className={styles.Dashboard}>
          <Title>Többi</Title>
          <Row>
            <Col span={12}>
              <HighlightedPlant></HighlightedPlant>
            </Col>
            <Col span={12}>
              <QuickSearchTable {...this.props} plants={this.state.plants} />
            </Col>
          </Row>
        </section>
      </Fragment>
    );
  }
}
