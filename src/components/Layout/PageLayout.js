import React, { Component, Fragment } from "react";
import styles from "./PageLayout.module.scss";
import Footer from "./Footer/Footer";
import { Layout } from "antd";
import logoImage from "../../radish.png";
import { withRouter } from "react-router-dom";

const { Content, Header } = Layout;

class PageLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideDrawer: false,
      searchField: props.searchField,
    };
    this.escFunction = this.escFunction.bind(this);
  }

  escFunction(event) {
    if (event.keyCode === 27) {
      this.setState({ showSideDrawer: true });
    }
  }

  searchBarNeeded() {
    return (
      this.props.location?.pathname.startsWith("/table") ||
      this.props.location?.pathname.startsWith("/cards")
    );
  }

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  render() {
    let widthShouldCollapse = window.innerWidth.toFixed(0) > 460;
    let fullSize = window.innerWidth.toFixed(0) > 800;
    return (
      <Fragment>
        <Layout style={{ minHeight: "100vh" }}>
          <Layout className="site-layout">
            <Header className={styles.Header}>
              <div className={styles.Logo}>
                <img src={logoImage} alt="Minek van szezonja" />
                <h1>Minek van szezonja?</h1>
              </div>
              {this.searchBarNeeded() ? this.state.searchField : ""}
            </Header>
            <Content>
              <main className={styles.Content}>{this.props.children}</main>
            </Content>
            <Footer></Footer>
          </Layout>
        </Layout>
      </Fragment>
    );
  }
}

export default withRouter(PageLayout);
