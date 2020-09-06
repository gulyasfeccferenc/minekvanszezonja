import React, {Component} from 'react';
import 'antd/dist/antd.min.css';
import PageLayout from './components/Layout/PageLayout';
import Search from './components/UI/Search/Search';
import TableView from "./components/UI/TableView/TableView";
import NoMatch from "./components/Navigation/NoMatch/NoMatch";
import {Route, Switch, withRouter} from "react-router";
import Plant from "./components/UI/Plant/Plant";
import './App.module.scss';
import About from "./components/Pages/About/About";
import Login from "./components/Pages/Login/Login";
import UserProvider from "./services/UserProvider";


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
            <UserProvider>
                <PageLayout>
                    {this.props.location.pathname.startsWith('/table') ? searchField : null}
                    <Switch>
                        <Route path="/plants/new" component={Plant} new={true} />
                        <Route path="/plants/:plantId" component={Plant} />
                        <Route path="/table" exact render={(props) => <TableView {...props} {...this.state} /> } />
                        <Route path="/login" component={Login} />
                        <Route path="/about" component={About} />
                        <Route component={NoMatch}/>
                    </Switch>
                </PageLayout>
            </UserProvider>
                )
    }
}

export default withRouter(App);
