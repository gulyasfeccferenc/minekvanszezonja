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
  }

  state = {
    plants: [],
    selectedPlant: "",
  };

  /**
   * Lifecycle hook
   */
  componentDidMount() {
    const self = this;
    db.ref("plants/").on("value", (snapshot) => {
      const rawPlantData = [];
      snapshot.forEach((snap) => {
        rawPlantData.push({ ...snap.val(), id: snap.key });
      });
      self.setState({ plants: rawPlantData });
      self.setInitialHighlight(rawPlantData[0]);
    });
  }

  /**
   * Utility function to get last selected plant or the first one from the list
   * @param first
   */
  setInitialHighlight(first) {
    let highlight;
    const lastId = localStorage.getItem("lastHighlightedPlantId");
    if (lastId) {
      highlight = this.state.plants.find((plant) => plant.id === lastId);
    }
    this.setState({ selectedPlant: highlight ? highlight : first });
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
          onClick={() => this.selectPlant(item)}
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

  /**
   * Will look up the given plant by ID and set state accordingly
   * @param selectedPlant
   */
  selectPlant = (selectedPlant) => {
    let plant = null;
    if (selectedPlant) {
      plant = this.state.plants.find((item) => item.id === selectedPlant.id);
      this.setState({ selectedPlant: plant });
      localStorage.setItem("lastHighlightedPlantId", plant.id);
    }
  };

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
            <Col
              xs={24}
              md={12}
              xl={12}
              className={styles.HighlightedContainer}
            >
              <HighlightedPlant
                {...this.props}
                plant={this.state.selectedPlant}
              />
            </Col>
            <Col
              xs={24}
              md={12}
              xl={12}
              className={styles.QuickSearchContainer}
            >
              <QuickSearchTable
                {...this.props}
                plants={this.state.plants}
                selectPlant={this.selectPlant}
                selected={this.state.selectedPlant}
              />
            </Col>
          </Row>
        </section>
      </Fragment>
    );
  }
}
