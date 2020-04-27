import React, { Component } from 'react';

class Plant extends Component {
    state = {
        plantId: ''
    }

    componentDidMount () {
        this.parseQueryParams();
    }

    componentDidUpdate() {
        this.parseQueryParams();
    }

    parseQueryParams () {
        console.log(this.props);
        const query = new URLSearchParams(this.props.location.search);
        for (let param of query.entries()) {
            if (this.state.plantId !== param[1]) {
                this.setState({plantId: param[1]});
            }
        }
    }

    render () {
        return (
            <div>
                <h1>{this.state.plantId}</h1>
                <p>You selected the plant: {this.props.match.params.plantId}</p>
            </div>
        );
    }
}

export default Plant;
