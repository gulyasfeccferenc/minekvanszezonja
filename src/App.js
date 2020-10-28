import React, { Component } from "react";
import "antd/dist/antd.min.css";
import PageLayout from "./components/Layout/PageLayout";
import TableView from "./components/UI/TableView/TableView";
import NoMatch from "./components/Navigation/NoMatch/NoMatch";
import {
  MemoryRouter,
  Redirect,
  Route,
  Switch,
  withRouter,
} from "react-router";
import Plant from "./components/UI/Plant/Plant";
import "./App.module.scss";
import About from "./components/Pages/About/About";
import Login from "./components/Pages/Login/Login";
import UserProvider from "./services/UserProvider";
import CardView from "./components/UI/CardView/CardView";
import { Input } from "antd";
import ReactGA from "react-ga";

const { Search } = Input;

class App extends Component {
  user = null;
  searchField = (
    <Search
      placeholder="Mit keresel?"
      autoFocus={true}
      allowClear
      onSearch={(event) => {
        this.searchChangeHandler(event);
      }}
      style={{ width: 200 }}
    />
  );

  constructor(props) {
    super(props);
    this.state = {
      searchedItem: "",
      searchField: this.searchField,
    };
    ReactGA.initialize("UA-163347419-1");
  }

  /**
   * Will deal with the state change of search input
   * @param value
   */
  searchChangeHandler = (value) => {
    if (value) {
      this.setState({ searchedItem: value });
      ReactGA.event({
        category: "User",
        action: "Hit search",
        value: value,
      });
    } else {
      this.setState({ searchedItem: "" });
    }
  };

  render() {
    return (
      <MemoryRouter>
        <UserProvider>
          <PageLayout searchField={this.searchField}>
            <Switch>
              <Route
                path="/"
                exact={true}
                render={() => <Redirect to="/table" />}
              />
              <Route path="/plants/new" component={Plant} new={true} />
              <Route path="/plants/:plantId" component={Plant} />
              <Route
                path="/table"
                exact
                render={(props) => <TableView {...props} {...this.state} />}
              />
              <Route
                path="/cards"
                exact
                render={(props) => <CardView {...props} {...this.state} />}
              />
              <Route path="/login" component={Login} />
              <Route path="/about" component={About} />
              <Route component={NoMatch} />
            </Switch>
          </PageLayout>
        </UserProvider>
      </MemoryRouter>
    );
  }
}

export default withRouter(App);
