import React, {Component} from 'react';
import './App.module.scss';
import Layout from './components/Layout/Layout';
import Search from './components/UI/Search/Search';
import TableView from "./components/UI/TableView/TableView";
import instance from './components/Com/AxiosHandler';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedItem: '',
            plants: []
        };
    }

    componentDidMount() {
        const self = this;
        instance.get('plants.json')
            .then(function (response) {
                self.setState({plants: response.data});
            })
            .catch(function (error) {
                // handle error
                console.error("Some nasty error happened here: ", error);
            });
    }

    searchChangeHandler = (event) => {
        if (event.target.value) {
            this.setState({searchedItem: event.target.value});
        }
    }

    render() {
        return (
            <Layout>
                <Search change={this.searchChangeHandler}></Search>
                <TableView searchedTerm={this.state.searchedItem}
                           plants={this.state.plants}></TableView>
            </Layout>)
    }
}

export default App;
