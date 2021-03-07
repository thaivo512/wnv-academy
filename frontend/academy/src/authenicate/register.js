import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import '../assets/authen.scss';
import '../App.scss';
import { GoogleLogin } from 'react-google-login';
import { requestApiRegister, requestApiOPT } from './redux/action';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { API_URL } from './constants';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            passwordRetype: "",
            email: "",
            fullname: "",
            isClickedRedirectToLogin: false,
        }
    }

    componentDidUpdate() {
    }

    render() {
        var { isClickedRedirectToLogin } = this.state;
        var { registerInformation, requestApiOPT } = this.props;

        if (isClickedRedirectToLogin) {
            return (<Redirect to='login' />)
        }

        if (registerInformation != null && registerInformation.is_success) {
            var email = registerInformation.email;
            requestApiOPT(email)
            var url = "verify/" + btoa(email);
            return (<Redirect to={url} />)
        }

        return (
            <Form className="auth-form register">
                <h2 className="text-align-center">Create Account</h2>
                <Form.Group>
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control onChange={(e) => this.onChangeFullname(e)} type="text" placeholder="Enter Full Name" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={(e) => this.onChangeEmail(e)} type="emal" placeholder="Enter Email" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={(e) => this.onChangeUsername(e)} type="text" placeholder="Enter Username" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e) => this.onChangePassword(e)} type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Retype Password</Form.Label>
                    <Form.Control onChange={(e) => this.onChangeRetypePassword(e)} type="password" placeholder="Retype Password" />
                </Form.Group>
                <Button className="styling-of-button" variant="primary" type="button" onClick={() => this.onRegister()}> Sign Up </Button>
                <Button className="styling-of-button" variant="success" type="button" onClick={() => this.onRedirectToLogin()}> Sign in </Button>
                <GoogleLogin className="styling-of-button"
                    clientId="233633475297-iraf1qjlm6lvotjd5kqc32alt9840qs5.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={this.responseGoogle()}
                    onFailure={this.responseGoogle()}
                    cookiePolicy={'single_host_origin'}
                />
            </Form>
        );
    }

    responseGoogle(response) {
        if (response != null) {
            const requestOptions = {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                redirect: 'follow',
                body: JSON.stringify({
                    gg_token: response.tokenId,
                })
            };
            try {
                fetch(API_URL + "auth/gg-oauth", requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        if (result.is_success) {
                            localStorage.setItem("access_token", result.access_token);
                            localStorage.setItem("is_success", result.is_success);
                            localStorage.setItem("refresh_token", result.refresh_token);
                            window.location.reload();
                        }
                    })
                    .catch(error => console.log('error', error));
            } catch (e) {
                toast.error(e);
                return { isFail: true };
            }
        }
    }

    onRegister() {
        var { username, password, email, fullname, passwordRetype } = this.state;

        if (fullname == "") {
            toast('Please type fullname.', { type: "error" })
        }
        else if (username == "") {
            toast('Please type username.', { type: "error" })
        }
        else if (username.length < 4) {
            toast('Username have to 4 characters.', { type: "error" })
        }
        else if (password == "") {
            toast('Please type password.', { type: "error" })
        }
        else if (password.length < 6) {
            toast('Passowrd have to 6 characters.', { type: "error" })
        }
        else if (passwordRetype == "") {
            toast('Please type RetypePassword.', { type: "error" })
        }
        else if (password != passwordRetype) {
            toast('RetypePassword is wrong.', { type: "error" })
        }
        else if (email == "") {
            toast('Please type email.', { type: "error" })
        }
        else if (email.indexOf("@") == 0) {
            toast('Email format is wrong.', { type: "error" })
        }
        else {
            this.props.requestApiRegister({ username, password, email, fullname });
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

    onChangeEmail(e) {
        this.setState({ email: e.target.value })
    }

    onChangeFullname(e) {
        this.setState({ fullname: e.target.value })
    }

    onRedirectToLogin() {
        this.setState({ isClickedRedirectToLogin: true })
    }
};

const mapDispatchToProps = dispatch => {
    return {
        requestApiRegister: (payload) => dispatch(requestApiRegister(payload)),
        requestApiOPT: (payload) => dispatch(requestApiOPT(payload)),
    }
}

const mapStateToProps = state => ({
    registerInformation: state.registerReducer,
    optInformation: state.requestOPTReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);