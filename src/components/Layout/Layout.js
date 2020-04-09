import React, {Component, Fragment} from "react";
import styles from "./Layout.module.scss";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";


class Layout extends Component {
    state = {
        showSideDrawer: true
    };

    closeSideDrawer = () => {
        this.setState({showSideDrawer: false});
    };
    toggleSideDrawer = () => {
        this.setState(( prevState ) => {
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    };


    render() {
        return (
            <Fragment>
                <Toolbar sideDrawerOpener={this.toggleSideDrawer}></Toolbar>
                <SideDrawer sideDrawerOpen={this.state.showSideDrawer}
                            close={this.closeSideDrawer} />
                <main className={styles.Content}>{this.children}</main>
            </Fragment>
        )
    }
};

export default Layout;
