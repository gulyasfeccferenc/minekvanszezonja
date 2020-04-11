import React, {Component} from 'react';
import './App.module.scss';
import Layout from './components/Layout/Layout';
import Search from './components/UI/Search/Search';

class App extends Component {

    render() {
        return (
            <Layout>
                <Search></Search>
            </Layout>)
    }
}

export default App;
