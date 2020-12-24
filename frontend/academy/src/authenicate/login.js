import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import '../assets/authen.scss';
import { Redirect } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            isLoggedIn: ""
        }
    }

    login() {
        var data = {
            username: this.state.username,
            password: this.state.password,
        };
        fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(res => {
                if (res.status == 400) {
                    toast('Username or Password is wrong')
                }
                if (res.status == 200) {
                    res.json().then(data => {
                        sessionStorage.setItem("username", data.username);
                    })
                    window.location.reload(false);
                }
            })
            .catch(console.log)
    }

    onChangeName(e) {
        this.setState({ username: e.target.value })
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value })
    }

    onRedirect() {
        return <Redirect to='/register' />;
    }

    render() {
        return (
            <Form className="auth-form">
                <h2 className="text-align-center">Login</h2>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button className="styling-of-button" variant="primary" type="submit"> Sign in </Button>
                <Button className="styling-of-button" variant="success" type="submit"> Sign in with Goole </Button>
                <Button className="styling-of-button" variant="info" type="submit" onClick={() => this.onRedirect()}> Register</Button>
            </Form>
        );
    }
};
