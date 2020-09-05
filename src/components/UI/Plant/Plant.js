import React, {Component} from 'react';
import classes from './Plant.module.scss';
import DynamicInput from "../../Form/DynamicInput/DynamicInput";
import {db} from "../../../services/firebase";
import {Button} from 'antd';
import {BackwardOutlined, DeleteOutlined, SaveOutlined} from '@ant-design/icons';


class Plant extends Component {
    saving = false;

    constructor(props) {
        super(props);
        this.state = {
            plantId: '',
            loading: true,
            plantFormFields: {
                name: {
                    inputtype: 'text',
                    inputConfig: {
                        name: 'plantName',
                        label: 'Name of the plant',
                    },
                    value: ''
                },
                details: {
                    inputtype: 'textarea',
                    inputConfig: {
                        name: "plantDesc",
                        label: "Description",
                        id: "plantDesc",
                        cols: "30",
                        rows: "10",
                    },
                    value: ''
                },
                season: {
                    inputtype: 'multiselect',
                    inputConfig: {
                        name: 'season',
                        label: 'Seasons when this plant is flourishing',
                        options: [
                            {value: 0, displayValue: 'January'},
                            {value: 1, displayValue: 'Feb'},
                            {value: 2, displayValue: 'March'},
                            {value: 3, displayValue: 'Apr'},
                            {value: 4, displayValue: 'May'},
                            {value: 5, displayValue: 'Jun'},
                            {value: 6, displayValue: 'Jul'},
                            {value: 7, displayValue: 'Aug'},
                            {value: 8, displayValue: 'Sep'},
                            {value: 9, displayValue: 'Okt'},
                            {value: 10, displayValue: 'Nov'},
                            {value: 11, displayValue: 'Dec'},
                        ],
                        optionsChange: this.inputChangeHandler
                    },
                    value: ''
                },
                planttype: {
                    inputtype: 'select',
                    inputConfig: {
                        name: "plantType",
                        label: "Type of the plant",
                        options: [
                            {value: 'plant', displayValue: 'Plant 🍃'},
                            {value: 'fruit', displayValue: 'Fruit 🍎'},
                            {value: 'vegetable', displayValue: 'Vegetable 🥕'},
                            {value: 'herb', displayValue: 'Herb 🌿'},
                        ],
                    },
                    value: 'this.state.plantData.details'
                }
            }
        }
    }

    inputChangeHandler = (event, inputIdentifier, multiselectValue) => {
        const updatedPlantForm = {
            ...this.state.plantFormFields
        };
        const updatedPlantFormElement = {
            ...updatedPlantForm[inputIdentifier]
        };
        if (updatedPlantFormElement.inputtype === 'multiselect') {
            updatedPlantFormElement.value = event;
        } else {
            updatedPlantFormElement.value = event.target.value;
        }
        updatedPlantForm[inputIdentifier] = updatedPlantFormElement;
        this.setState({plantFormFields: updatedPlantForm});
    }

    componentDidMount () {
        this.parseQueryParams();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.loading) {
            this.getPlantInfo();
        }
    }

    getPlantInfo = () => {
        const self = this;
        if (!this.props.new && self.state.plantId && !self.state.plantData) {
            db.ref(`plants/${self.state.plantId}`).once('value').then(snapshot => {
                const updatedPlantForm = {
                    ...self.state.plantFormFields
                };
                const updatedNameElement = {...updatedPlantForm['name']};
                const updatedDetailsElement = {...updatedPlantForm['details']};
                const updatedTypeElement = {...updatedPlantForm['planttype']};
                const updatedSeasonElement = {...updatedPlantForm['season']};
                updatedNameElement.value = snapshot.val().name;
                updatedDetailsElement.value = snapshot.val().details;
                updatedTypeElement.value = snapshot.val().planttype;
                updatedSeasonElement.value = snapshot.val().season;
                updatedPlantForm['name'] = updatedNameElement;
                updatedPlantForm['details'] = updatedDetailsElement;
                updatedPlantForm['planttype'] = updatedTypeElement;
                updatedPlantForm['season'] = updatedSeasonElement;
                self.setState({loading: false, plantFormFields: updatedPlantForm});
            })
        } else {
            self.setState({loading: false});
        }
    }

    generatePlantForm() {
        let plantForm = '';
        const formElementArray = [];
        for (let key in this.state.plantFormFields) {
            formElementArray.push({
                id: key,
                config: this.state.plantFormFields[key]
            });
        }
        if (!this.state.loading) {
            plantForm = (<form >
                {formElementArray.map((formElement) => (
                    <DynamicInput inputtype={formElement.config.inputtype}
                                  elementConfig={formElement.config.inputConfig}
                                  value={formElement.config.value}
                                  change={(event) => this.inputChangeHandler(event, formElement.id)}
                                  key={formElement.id}
                    />
                ))}
                <Button type="primary" size={"large"} loading={this.saving} onClick={this.saveHandler} icon={<SaveOutlined />}>
                    Save
                </Button>
            </form>);
        }
        return plantForm;
    }

    saveHandler = (event) => {
        event.preventDefault();
        this.saving = true;
        this.setState({loading: true});
        const plantData = {};

        // Differentiate whether its a new plant or an existing one
        if (this.state.plantId) {
            plantData.id = this.state.plantId || this.props.match.params.plantId;
        } else {
            plantData.id = db.ref().child('plants').push().key;
        }

        for (let formElementId in this.state.plantFormFields) {
            plantData[formElementId] = this.state.plantFormFields[formElementId].value;
        }

        db.ref(`plants/${plantData.id}`).set(plantData, (error) => {
            if (error) {
                console.error('An error happened during save', error);
            }
            setTimeout(() => {this.saving = false}, 1000);
        }).then(r => {
            this.setState({loading: false, plantId: plantData.id});
            this.saving = false;
            this.props.history.push(`/plants/${plantData.id}`);
        })
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
                <h1>{this.state.plantFormFields.name.value}</h1>
                <Button type="dashed" icon={<BackwardOutlined />}>
                    Back
                </Button>
                {!this.props.new && this.state.plantId ? (
                    <Button type="danger" icon={<DeleteOutlined />}>
                        Delete
                    </Button>) : null}
                {plantForm}
                <p>You selected the plant: {this.props.match.params.plantId}</p>
            </div>
        );
    }
}

export default Plant;
