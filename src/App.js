import React, { Component, lazy, Suspense } from "react";
import "antd/dist/antd.min.css";
import { MemoryRouter, Route, Switch, withRouter } from "react-router";
import "./App.module.scss";
import UserProvider from "./services/UserProvider";
import { Input } from "antd";
import ReactGA from "react-ga";
import CookieConsent from "./components/UI/CookieConsent/CookieConsent";
import Dashboard from "./components/Pages/Dashboard/Dashboard";

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
      cookiesAccepted: true,
    };
  }

  componentDidMount() {
    this.setState({
      cookiesAccepted: localStorage.getItem("CookiePolicy") === "true",
    });
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
                  render={(props) => <Dashboard {...props} {...this.state} />}
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
                <Route path="/login" exact={true} component={Login} />
                <Route path="/about" exact={true} component={About} />
                <Route component={NoMatch} />
              </Switch>
              {this.state.cookiesAccepted ? null : (
                <CookieConsent cookieClickHandler={() => this.acceptCookie()} />
              )}
            </PageLayout>
          </Suspense>
        </UserProvider>
      </MemoryRouter>
    );
  }

  /**
   * Utility function to handle persist cookie consent
   */
  acceptCookie() {
    localStorage.setItem("CookiePolicy", true);
    this.setState({ cookiesAccepted: true });
  }
}

export default withRouter(App);
