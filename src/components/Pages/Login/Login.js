import React, {Component, Fragment} from 'react';
import {Button, Input, Space, Typography} from 'antd';
import {EyeInvisibleOutlined, EyeTwoTone, UserOutlined} from '@ant-design/icons';
import {auth} from "../../../services/firebase";

const { Title } = Typography;

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: ''
        }
    }

    onChangeHandler(event) {
        const {name, value} = event.currentTarget;
        console.warn('change happened', name);
        console.warn('change happened', value);
        if (name === 'email') {
            this.setState({user: value});
        } else if (name === 'password') {
            this.setState({password: value});
        }
    }

    loginHandler(event) {
        event.preventDefault();
        console.info(`trying auth with email: ${this.state.user} and with my super hacky secret password ${this.state.password}`);
        auth().signInWithEmailAndPassword(this.state.user, this.state.password).catch(error => {
            // setError("Error signing in with password and email!");
            console.error("Error signing in with password and email", error);
        });
    }

    render() {

        return (
            <Fragment>
                <Title>Bejelentkezés</Title>
                <form>
                    <Space direction="vertical" align={"left"}>
                        <Input placeholder="E-mail cím"
                               name={"email"}
                               autoComplete={"email"}
                               prefix={<UserOutlined />}
                               onChange={(event) => this.onChangeHandler(event)}
                               value={this.state.user}
                        />
                        <Input.Password
                            placeholder="Jelszó"
                            name={"password"}
                            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            autoComplete={"current-password"}
                            onChange={(event) => this.onChangeHandler(event)}
                        />
                        <Button onClick={(event) => this.loginHandler(event)}>
                            Bejelentkezés
                        </Button>
                    </Space>
                </form>
            </Fragment>
        )
    }
}