import React, {Component, createContext} from "react";
import { notification } from "antd";
import {auth} from "./firebase";

export const UserContext = createContext({ user: null });
class UserProvider extends Component {
    state = {
        user: null
    };

    componentDidMount = () => {
        this.authSubscription = auth().onAuthStateChanged(userAuth => {
            this.setState({ user: userAuth});

            if (userAuth) {
                notification["success"]({
                    message: 'Sikeres bejelentkezés!',
                    description:
                        `Üdv itt ${userAuth.displayName} (${userAuth.email})`,
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
export default UserProvider;
