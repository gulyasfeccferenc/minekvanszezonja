import React, { Component, Fragment } from "react";
import styles from "./PageLayout.module.scss";
import Footer from "./Footer/Footer";
import { Layout, Menu } from "antd";
import {
  BuildOutlined,
  IdcardOutlined,
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TableOutlined,
} from "@ant-design/icons";
import logoImage from "../../radish.png";
import { withRouter } from "react-router-dom";

const { Content, Sider, Header } = Layout;

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

  toggleSideDrawer = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  handleMenuClick(viewTitle) {
    this.props.history.push(`/${viewTitle}`);
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
          {React.createElement(
            this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: styles.Trigger,
              onClick: this.toggleSideDrawer,
            }
          )}
          <Sider
            collapsible
            breakpoint="md"
            collapsed={this.state.showSideDrawer}
            onCollapse={this.toggleSideDrawer}
            className={styles.Sider}
            collapsedWidth={widthShouldCollapse ? 80 : 0}
            trigger={null}
          >
            <div className={styles.Logo}>
              <img src={logoImage} alt="Minek van szezonja" />
            </div>
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item
                key="1"
                onClick={() => {
                  this.handleMenuClick("table");
                }}
                icon={<TableOutlined />}
              >
                Táblázat nézet
              </Menu.Item>
              <Menu.Item
                key="2"
                disabled={true}
                onClick={() => {
                  this.handleMenuClick("cards");
                }}
                icon={<IdcardOutlined />}
              >
                Kártya nézet
              </Menu.Item>
              <Menu.Item
                key="3"
                onClick={() => {
                  this.handleMenuClick("login");
                }}
                icon={<LoginOutlined />}
              >
                Bejelentkezés
              </Menu.Item>
              {/*<SubMenu key="sub1" icon={<UserOutlined />} title="User">*/}
              {/*    <Menu.Item key="3">Tom</Menu.Item>*/}
              {/*    <Menu.Item key="4">Bill</Menu.Item>*/}
              {/*    <Menu.Item key="5">Alex</Menu.Item>*/}
              {/*</SubMenu>*/}
              <Menu.Item
                key="9"
                onClick={() => {
                  this.handleMenuClick("about");
                }}
                icon={<BuildOutlined />}
              >
                Az oldalról
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className={styles.Header}>
              {this.searchBarNeeded() ? this.state.searchField : ""}
            </Header>
            <Content
              style={{
                marginLeft: fullSize
                  ? "200px"
                  : widthShouldCollapse
                  ? "80px"
                  : "4px",
              }}
            >
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
