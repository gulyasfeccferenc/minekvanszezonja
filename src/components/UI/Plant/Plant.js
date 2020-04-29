import React, { Component } from 'react';
import instance from "../../Com/AxiosHandler";
import classes from './Plant.module.scss';

class Plant extends Component {

    constructor(props) {
        super(props);
        this.state = {
            plantId: '',
        }
    }

    componentDidMount () {
        this.parseQueryParams();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.getPlantInfo();

    }

    getPlantInfo() {
        const self = this;
        if (self.state.plantId && !self.state.plantData) {
            instance.get(`plants/${self.state.plantId}.json`)
                .then(function (response) {
                    self.setState({plantData: response.data});
                })
                .catch(function (error) {
                    // handle error
                    console.error("Some nasty error happened here: ", error);
                });
        }
    }

    generatePlantForm() {
        let plantForm = '';
        if (this.state.plantData) {
            plantForm = (<form>
                <label>
                    <input type="text" value={this.state.plantData.name} name="plantName"/>
                </label><br />
                <label>
                    <textarea name="plantDesc" id="plantDesc" cols="30" rows="10" value={this.state.plantData.details} onChange={(news) => console.warn('news is', news)}/>
                </label><br />
                <label>
                    <select name="plantType" id="plantType" value={this.state.plantData.type} onChange={(news) => console.warn('news is', news)}>
                        <option value="plant">Plant</option>
                        <option value="vegetable">Vegetable</option>
                        <option value="fruit">Fruit</option>
                        <option value="herb">Herb</option>
                    </select>
                </label>
            </form>);
        }
        return plantForm;
    }


    parseQueryParams () {
        const queryPlantId = this.props.match.params.plantId;
        if (this.state.plantId !== queryPlantId) {
            this.setState({plantId: queryPlantId});
        }
    }

    render () {
        const plantForm = this.generatePlantForm();
        return (
            <div className={classes.Plant}>
                <h1>{this.state.plantId}</h1>
                {plantForm}
                <p>You selected the plant: {this.props.match.params.plantId}</p>
            </div>
        );
    }
}

export default Plant;
