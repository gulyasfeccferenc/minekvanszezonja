import React, {Component} from 'react';
import 'antd/dist/antd.min.css';
import Layout from './components/Layout/Layout';
import Search from './components/UI/Search/Search';
import TableView from "./components/UI/TableView/TableView";
import NoMatch from "./components/Navigation/NoMatch/NoMatch";
import {Route, Switch} from "react-router";
import Plant from "./components/UI/Plant/Plant";
import './App.module.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedItem: ''
        };
    }

    componentDidMount() {

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
        return (
            <Layout>
                <Route path="/" exact={true} component={Search} change={this.searchChangeHandler} />
                <Switch>
                    <Route path="/plants/new" component={Plant} new={true} />
                    <Route path="/plants/:plantId" component={Plant} />
                    <Route path="/" exact render={(props) => <TableView {...props} {...this.state} /> } />
                    <Route component={NoMatch}/>
                </Switch>
            </Layout>
                )
    }
}

export default App;
