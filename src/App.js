import React, {Component, Fragment} from 'react';
import 'antd/dist/antd.min.css';
import PageLayout from './components/Layout/PageLayout';
import Search from './components/UI/Search/Search';
import TableView from "./components/UI/TableView/TableView";
import NoMatch from "./components/Navigation/NoMatch/NoMatch";
import {MemoryRouter, Redirect, Route, Switch, withRouter} from "react-router";
import Plant from "./components/UI/Plant/Plant";
import './App.module.scss';
import About from "./components/Pages/About/About";
import Login from "./components/Pages/Login/Login";
import UserProvider from "./services/UserProvider";
import CardView from "./components/UI/CardView/CardView";

class App extends Component {
    user = null;
    constructor(props) {
        super(props);
        this.state = {
            searchedItem: ''
        };
    }

    /**
     * Will deal with the state change of search input
     * @param {Event} event
     */
    searchChangeHandler = (event) => {
        if (event.target.value) {
            this.setState({searchedItem: event.target.value});
        } else {
            this.setState({searchedItem: ''});
        }
    }

    render() {
        const searchField = (<Search change={(event) => this.searchChangeHandler(event)}/>)
        return (
            <MemoryRouter>
                <UserProvider>
                    <PageLayout>
                        <Switch>
                            <Route path="/" exact={true} render={() => <Redirect to='/table'  />} />
                            <Route path="/plants/new" component={Plant} new={true} />
                            <Route path="/plants/:plantId" component={Plant} />
                            <Route path="/table" exact render={(props) => <Fragment>{searchField}<TableView {...props} {...this.state} /></Fragment> } />
                            <Route path="/cards" exact render={(props) => <Fragment>{searchField}<CardView {...props} {...this.state} /></Fragment> } />
                            <Route path="/login" component={Login} />
                            <Route path="/about" component={About} />
                            <Route component={NoMatch}/>
                        </Switch>
                    </PageLayout>
                </UserProvider>
            </MemoryRouter>
                )
    }
}

export default withRouter(App);
