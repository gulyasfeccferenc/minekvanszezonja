import React, { Component, Fragment } from "react";

export default class HighlightedPlant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plantsSource: [],
      plant: props.plant,
    };
  }

  render() {
    return (
      <Fragment>
        Növény neve:
        {this.props.plant.name}
      </Fragment>
    );
  }
}
