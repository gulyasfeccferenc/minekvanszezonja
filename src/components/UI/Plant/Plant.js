import React, {Component} from 'react';
import instance from "../../Com/AxiosHandler";
import classes from './Plant.module.scss';
import DynamicInput from "../../Form/DynamicInput/DynamicInput";

class Plant extends Component {

    constructor(props) {
        super(props);
        this.state = {
            plantId: '',
            plantFormFields: {
                name: {
                    inputtype: 'text',
                    inputConfig: {
                        name: 'plantName',
                        label: 'Name of the plant',
                    },
                    value: 'this.state.plantData.name'
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
                    value: 'this.state.plantData.details'
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
        const formElementArray = [];
        for (let key in this.state.plantFormFields) {
            formElementArray.push({
                id: key,
                config: this.state.plantFormFields[key]
            });
        }
        if (this.state.plantData) {
            plantForm = (<form>
                {formElementArray.map((formElement) => (
                    <DynamicInput inputtype={formElement.config.inputtype}
                                  elementConfig={formElement.config.inputConfig}
                                  value={formElement.config.value}
                                  change={(event) => this.inputChangeHandler(event, formElement.id)}
                                  key={formElement.id}
                    />
                ))}
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
