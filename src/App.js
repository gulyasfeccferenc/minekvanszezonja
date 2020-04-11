import React, {Component} from 'react';
import './App.module.scss';
import Layout from './components/Layout/Layout';
import Search from './components/UI/Search/Search';
import TableView from "./components/UI/TableView/TableView";

class App extends Component {
    state = {
        searchedItem: ''
    };

    searchChangeHandler = (event) => {
        if (event.target.value) {
            this.setState({searchedItem: event.target.value});
        }
    }

    render() {
        return (
            <Layout>
                <Search change={this.searchChangeHandler}></Search>
                <TableView searchedTerm={this.state.searchedItem}></TableView>
            </Layout>)
    }
}

export default App;
