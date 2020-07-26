import React, {Component} from 'react';
import classes from './Plant.module.scss';
import DynamicInput from "../../Form/DynamicInput/DynamicInput";
import {db} from "../../../services/firebase";

class Plant extends Component {

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
                planttype: {
                    inputtype: 'select',
                    inputConfig: {
                        name: "plantType",
                        label: "Type of the plant",
                        options: [
                            {value: 'plant', displayValue: 'Plant'},
                            {value: 'fruit', displayValue: 'Fruit'},
                            {value: 'vegetable', displayValue: 'Vegetable'},
                            {value: 'herb', displayValue: 'Herb'},
                        ],
                        // onChange: (key) => {
                        //     let plantChoice = ""+key.nativeEvent.target.value;
                        //     console.warn('key', plantChoice);
                        //     if (plantChoice) {
                        //         this.setState(
                        //             (prevState) => (
                        //                 {...prevState, plantFormFields:
                        //                         {...prevState.planttype, planttype: {
                        //                                 value: plantChoice}}}));
                        //     }
                        // },
                    },
                    value: 'this.state.plantData.details'
                }
            }
        }
    }

    inputChangeHandler = (event, inputIdentifier) => {
        const updatedPlantForm = {
            ...this.state.plantFormFields
        };
        const updatedPlantFormElement = {
            ...updatedPlantForm[inputIdentifier]
        };
        updatedPlantFormElement.value = event.target.value;
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
                updatedNameElement.value = snapshot.val().name;
                updatedDetailsElement.value = snapshot.val().details;
                updatedTypeElement.value = snapshot.val().planttype;
                updatedPlantForm['name'] = updatedNameElement;
                updatedPlantForm['details'] = updatedDetailsElement;
                updatedPlantForm['planttype'] = updatedTypeElement;
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
            plantForm = (<form onSubmit={this.saveHandler}>
                {formElementArray.map((formElement) => (
                    <DynamicInput inputtype={formElement.config.inputtype}
                                  elementConfig={formElement.config.inputConfig}
                                  value={formElement.config.value}
                                  change={(event) => this.inputChangeHandler(event, formElement.id)}
                                  key={formElement.id}
                    />
                ))}
                <button type="submit">Save</button>
            </form>);
        }
        return plantForm;
    }

    saveHandler = (event) => {
        event.preventDefault();
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
            this.setState({loading: false});
        }).then(r => {
            this.setState({loading: false, plantId: plantData.id});
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
                {plantForm}
                <p>You selected the plant: {this.props.match.params.plantId}</p>
            </div>
        );
    }
}

export default Plant;
