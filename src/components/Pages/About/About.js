import React, {Component, Fragment} from 'react';
import {Typography} from 'antd';

const { Title } = Typography;

export default class About extends Component {
    render() {
        return (
            <Fragment>
                <Title>Minek van szezonja?</Title>
                <p>Az oldal tanulóprojektként jött létre, hogy a React keretrendszert minél behatóbban ismerhessem meg egy igazi projekt kapcsán.</p>
                <p>A fő cél egy olyan könnyen használható webes alkalmazás elkészítése volt, ami kereshető és átlátható formában mutatja be a hazai növények szezonalitását.</p>
            </Fragment>
            )
    }
}