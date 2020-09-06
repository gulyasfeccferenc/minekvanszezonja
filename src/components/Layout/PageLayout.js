import React, {Component, Fragment} from "react";
import styles from "./PageLayout.module.scss";
import Footer from "./Footer/Footer";
import {Layout, Menu} from 'antd';
import {BuildOutlined, IdcardOutlined, LoginOutlined, TableOutlined,} from '@ant-design/icons';
import logoImage from "../../radish.png";

const { Content, Sider } = Layout;
// const { SubMenu } = Menu;

class PageLayout extends Component {
    state = {
        showSideDrawer: false,
    };

    toggleSideDrawer = () => {
        this.setState(( prevState ) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    };


    render() {
        return (
            <Fragment>
                <Layout style={{ minHeight: '100vh' }}>
                    <Sider collapsible collapsed={this.state.showSideDrawer} onCollapse={this.toggleSideDrawer}>
                        <div className={styles.Logo}>
                            <img src={logoImage} alt="Minek van szezonja"/>
                        </div>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1" icon={<TableOutlined />}>
                                Táblázat nézet
                            </Menu.Item>
                            <Menu.Item key="2" disabled={true} icon={<IdcardOutlined />}>
                                Kártya nézet
                            </Menu.Item>
                            <Menu.Item key="3" disabled={true} icon={<LoginOutlined />}>
                                Bejelentkezés
                            </Menu.Item>
                            {/*<SubMenu key="sub1" icon={<UserOutlined />} title="User">*/}
                            {/*    <Menu.Item key="3">Tom</Menu.Item>*/}
                            {/*    <Menu.Item key="4">Bill</Menu.Item>*/}
                            {/*    <Menu.Item key="5">Alex</Menu.Item>*/}
                            {/*</SubMenu>*/}
                            <Menu.Item key="9" icon={<BuildOutlined />}>
                                Az oldalról
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout">
                        <Content style={{ margin: '0 16px' }}>
                            <main className={styles.Content}>{this.props.children}</main>
                        </Content>
                        <Footer></Footer>
                    </Layout>
                </Layout>
            </Fragment>
        )
    }
};

export default PageLayout;