import React, { Component, Fragment } from "react";
import Title from "antd/es/typography/Title";
import PlantPlaceholder from "../../../../assets/plant_placeholder.jpg";
import * as classes from "./HighlightedPlant.module.scss";
import { months } from "../../../../Constants";

export default class HighlightedPlant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plantsSource: [],
      plant: props.plant,
    };
  }

  generateSeasonList() {
    return this.props.plant?.season?.map((season) => (
      <li className={`${months[season - 1]?.color}`}>
        {months[season - 1]?.label} {months[season - 1]?.emoji}
      </li>
    ));
  }

  render() {
    return (
      <Fragment>
        <aside className={classes.SeasonBox}>
          <ul>{this.generateSeasonList()}</ul>
        </aside>
        <div
          style={{ backgroundImage: `url(${PlantPlaceholder})` }}
          className={classes.PlantImage}
        ></div>
        <Title className={classes.Title}>{this.props.plant.name}</Title>
        <p>{this.props.plant.details}</p>
      </Fragment>
    );
  }
}
