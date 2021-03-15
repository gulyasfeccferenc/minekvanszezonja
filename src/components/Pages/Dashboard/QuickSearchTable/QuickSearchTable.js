import React, { Component, Fragment } from "react";
import { List, Avatar, Input } from "antd";
import plantPlaceholder from "../../../../assets/plant_placeholder.jpg";
import ReactGA from "react-ga";
import * as styles from "./QuickSearchTable.module.scss";
const { Search } = Input;

export default class QuickSearchTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plantsSource: [],
      searchedItem: "",
    };
  }

  filterBySearch = (value) => {
    if (value) {
      this.setState({ searchedItem: value });
      ReactGA.event({
        category: "User",
        action: "Hit search",
        label: value,
      });
    } else {
      this.setState({ searchedItem: "" });
    }
  };

  filterList = (plantList) => {
    if (this.state.searchedItem?.length > 2 && plantList) {
      return plantList.filter(
        (plant) =>
          plant.name
            .toLowerCase()
            .indexOf(this.state.searchedItem.toLowerCase()) > -1
      );
    }
    return plantList;
  };

  selectCurrentPlant = (item) => {
    this.props.selectPlant(item);
  };

  render() {
    return (
      <div className={styles.ListItems}>
        <Search
          placeholder="Mit keresel?"
          allowClear
          onSearch={this.filterBySearch}
        />
        <List
          itemLayout="horizontal"
          dataSource={this.filterList(this.props.plants)}
          size="small"
          renderItem={(item) => (
            <List.Item
              onClick={() => this.selectCurrentPlant(item)}
              key={`${new Date()}-${item.id}`}
              className={
                this.props.selected?.id === item.id ? styles.SelectedItem : ""
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={plantPlaceholder} />}
                title={
                  /*<NavLink to={`/plants/${item.id}`}>{*/ item.name /*}</NavLink>*/
                }
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}
