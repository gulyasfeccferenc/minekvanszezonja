import React, { Component, Fragment } from "react";
import { List, Avatar, Input } from "antd";
import plantPlaceholder from "../../../../assets/plant_placeholder.jpg";
import ReactGA from "react-ga";

const { Search } = Input;

const data = [
  {
    title: "Ant Design Title 1",
  },
  {
    title: "Ant Design Title 2",
  },
  {
    title: "Ant Design Title 3",
  },
  {
    title: "Ant Design Title 4",
  },
];

export default class QuickSearchTable extends Component {
  constructor(props) {
    super(props);
    this.data = data;
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

  render() {
    return (
      <Fragment>
        <Search
          placeholder="Mit keresel?"
          allowClear
          onSearch={this.filterBySearch}
        />
        <List
          itemLayout="horizontal"
          dataSource={this.filterList(this.props.plants)}
          size="small"
          onSearch={(searchedTerm) => this.filterBySearch(searchedTerm)}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={plantPlaceholder} />}
                title={<a href="https://ant.design">{item.name}</a>}
                description={item.details}
              />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}
