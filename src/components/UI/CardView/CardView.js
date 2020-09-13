import React, {Component} from "react";
import {Card, Col, Empty, Row} from "antd";
import {db} from "../../../services/firebase";
import classes from "../TableView/TableView.module.scss";

const { Meta } = Card;

export default class CardView extends Component {
    constructor(props) {
        super(props);
        this.state = { width: 0,plants: [] };
        this.plantCards = null;
        this.filteredPlants = null;
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        // Responsivity
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        // Getting data
        const self = this;
        db.ref("plants/").on("value", snapshot => {
            const rawPlantData = [];
            snapshot.forEach(snap => {
                rawPlantData.push({...snap.val(), id: snap.key});
            });
            self.setState({plants: rawPlantData});
        });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth });
    }

    calculateSpanValue() {
        let spanValue = 24;
        if (this.state.width > 1200) {
            spanValue = 4;
        } else if (this.state.width > 800) {
            spanValue = 6;
        } else if (this.state.width > 500) {
            spanValue = 12;
        }
        return spanValue;
    }

    calculatePlantCards() {
        const spanValue = this.calculateSpanValue();
        if (this.props.searchedItem && this.props.searchedItem.length > 2) {
            const filterValue = this.props.searchedItem.toString().toLowerCase();
            this.filteredPlants = this.state.plants.filter(item => {
                return item.name.toLowerCase().includes(filterValue);
            });

            if (this.filteredPlants.length < 1) {
                this.plantCards = <p className={classes.FullWidth}>A keresett növény ({this.props.searchedItem}) sajnos nem található!</p>;
            } else {
                this.plantCards = this.filteredPlants.map(item => {
                    console.info('item', item)
                    return (<Col span={spanValue} key={item.id + '_key'}>
                                <Card
                                  id={item.id}
                                  title={item.name}
                                  description={item.details}
                                  bordered={false}
                                  hoverable
                                  size={"small"}
                        // season={item.season}
                    /></Col>);
                });
            }
        } else {
            this.plantCards = this.state.plants.map(item => {
                return (<Col span={spanValue} key={item.id + '_key'}>
                            <Card
                              id={item.id}
                              title={item.name}
                              description={item.details}
                              bordered={false}
                              hoverable
                              size={"small"}
                              // season={item.season}
                            >
                                <Meta
                                    // title={item.name}
                                    description={item.details}
                                />
                            </Card></Col>);
            });
        }
    }

    render() {
        if (Object.keys(this.state.plants).length > 0) {
            this.calculatePlantCards();
        } else {
            return (
                <section>
                    <Empty>
                        <p className={classes.FullWidth}>Nincs növény az adatbázisban</p>
                        {this.context ? this.newButton : null}
                    </Empty>
                </section>);
        }
        return (<Row gutter={16}>
                    {this.plantCards}
                </Row>)
    }
}
