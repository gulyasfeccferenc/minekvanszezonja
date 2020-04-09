import React, {Fragment} from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from './SideDrawer.module.scss';
import Backdrop from "../../UI/Backdrop/Backdrop";


const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];

    if (props.sideDrawerOpen) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Fragment>
            <Backdrop show={props.sideDrawerOpen} clickHandler={props.close}></Backdrop>
            <div className={attachedClasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems></NavigationItems>
                </nav>
            </div>
        </Fragment>
    );
};

export default sideDrawer;
