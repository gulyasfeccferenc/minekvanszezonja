import React, { Component, lazy, Suspense } from "react";
import "antd/dist/antd.min.css";
import {
  MemoryRouter,
  Redirect,
  Route,
  Switch,
  withRouter,
} from "react-router";
import "./App.module.scss";
import UserProvider from "./services/UserProvider";
import { Input } from "antd";
import ReactGA from "react-ga";

const { Search } = Input;
const Plant = lazy(() => import("./components/UI/Plant/Plant"));
const About = lazy(() => import("./components/Pages/About/About"));
const Login = lazy(() => import("./components/Pages/Login/Login"));
const CardView = lazy(() => import("./components/UI/CardView/CardView"));
const PageLayout = lazy(() => import("./components/Layout/PageLayout"));
const TableView = lazy(() => import("./components/UI/TableView/TableView"));
const NoMatch = lazy(() => import("./components/Navigation/NoMatch/NoMatch"));

const renderLoader = () => <div id="suspense-loading"></div>;

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
        label: value,
      });
    } else {
      this.setState({ searchedItem: "" });
    }
  };

  render() {
    return (
      <MemoryRouter>
        <UserProvider>
          <Suspense fallback={renderLoader()}>
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
          </Suspense>
        </UserProvider>
      </MemoryRouter>
    );
  }
}

export default withRouter(App);
