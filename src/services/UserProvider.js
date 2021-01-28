import React, { Component, createContext } from "react";
import { notification } from "antd";
import { auth } from "./firebase";
import { connect } from "react-redux";
import * as actionTypes from "../store/actions";
export const UserContext = createContext({ user: null });
class UserProvider extends Component {
  state = {
    user: null,
  };

  componentDidMount = () => {
    this.authSubscription = auth().onAuthStateChanged((userAuth) => {
      // this.setState({ user: userAuth });

      if (userAuth) {
        this.props.onLogin(userAuth);
        notification["success"]({
          message: "Sikeres bejelentkezés!",
          description: `Üdv itt ${userAuth.displayName} (${userAuth.email})`,
        });
      }
    });
  };

  render() {
    return (
      <UserContext.Provider value={this.state.user}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (user) => dispatch({ type: actionTypes.LOGIN, user }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProvider);
