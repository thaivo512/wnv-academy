import React, { Component } from 'react';
import { Button, Form, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import '../assets/authen.scss';
import '../App.scss';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            passwordRetype: "",
            nickname: "",
            email: "",
            fullname: ""
        }
    }

    onRegister() {
        if (this.state.fullname == "") {
            toast('Please type fullname.', { type: "error" })
        }
        else if (this.state.username == "") {
            toast('Please type username.', { type: "error" })
        }
        else if (this.state.username.length < 4) {
            toast('Username have to 4 characters.', { type: "error" })
        }
        else if (this.state.password == "") {
            toast('Please type password.', { type: "error" })
        }
        else if (this.state.password.length < 6) {
            toast('Passowrd have to 6 characters.', { type: "error" })
        }
        else if (this.state.passwordRetype == "") {
            toast('Please type RetypePassword.', { type: "error" })
        }
        else if (this.state.password != this.state.passwordRetype) {
            toast('RetypePassword is wrong.', { type: "error" })
        }
        else if (this.state.email == "") {
            toast('Please type email.', { type: "error" })
        }
        else if (this.state.email.indexOf("@") == 0) {
            toast('Email format is wrong.', { type: "error" })
        }
        else if (this.state.nickname == "") {
            toast('Please type nickname.', { type: "error" })
        }
        else {
            var data = {
                username: this.state.username,
                password: this.state.password,
                nickname: this.state.nickname,
                email: this.state.email,
                fullname: this.state.fullname,
            };

            fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(res => {
                    if (res.status == 200) {
                        toast('Register success', {
                            type: "success"
                        })
                    }
                    if (res.status == 400) {
                        toast('User is existing. If you have an account, you can login.', {
                            type: "error"
                        })
                    }
                })
                .catch(console.log)
        }
    }

    onChangeUsername(e) {
        this.setState({ username: e.target.value })
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value })
    }

    onChangeRetypePassword(e) {
        this.setState({ passwordRetype: e.target.value })
    }

    onChangeNickname(e) {
        this.setState({ nickname: e.target.value })
    }

    onChangeEmail(e) {
        this.setState({ email: e.target.value })
    }
    onChangeFullname(e) {
        this.setState({ fullname: e.target.value })
    }

    render() {
        return (
            <Form className="auth-form">
                <h2 className="text-align-center">Register</h2>
                <Form.Group>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Full Name" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="emal" placeholder="Enter Email" />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
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
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Retype Password</Form.Label>
                    <Form.Control type="password" placeholder="Retype Password" />
                </Form.Group>
                <Button className="styling-of-button" variant="primary" type="submit"> Submit  </Button>
                <Button className="styling-of-button" variant="success" type="submit"> Sign in </Button>
            </Form>
        );
    }
};
