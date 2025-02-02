import React, { Component } from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import '../assets/authen.scss';
import { Redirect } from "react-router-dom";
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import { requestApiLogin } from './redux/action';
import { API_URL } from './constants';
import { withRouter } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            loginInformation: null,
            isClickedResgister: false,
            isLogin: false
        }
    }

    componentDidUpdate() {
        var { isLogin } = this.state;
        var info = this.props.loginInformation;
        if (info != null && info.is_success == true && isLogin) {
            localStorage.setItem("access_token", info.access_token);
            localStorage.setItem("is_success", info.is_success);
            localStorage.setItem("refresh_token", info.refresh_token);
            this.setState({
                isLogin: false
            })
            this.props.history.push('/');
        }
    }

    render() {
        var { isClickedResgister } = this.state;
        if (isClickedResgister) {
            return (<Redirect to='register' />)
        }

        return (
            <Form className="auth-form login">
                <h2 className="text-align-center">Login</h2>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={(e) => this.onChangeUsername(e)} type="text" placeholder="Enter Username" />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e) => this.onChangePassword(e)} type="password" placeholder="Enter Password" />
                </Form.Group>
                <Button className="styling-of-button" variant="primary" onClick={() => this.onlogin()}> Sign in </Button>
                <Button className="styling-of-button" variant="success" type="button" onClick={() => this.onRedirectToRegister()}> Create Account</Button>
                <GoogleLogin className="styling-of-button"
                    clientId="233633475297-iraf1qjlm6lvotjd5kqc32alt9840qs5.apps.googleusercontent.com" // hom bua cai nay cau dua dung ko 
                    buttonText="Login with Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <br></br>
                <Form.Group style={{ textAlign: "center" }}>
                    <a onClick={() => this.onShowNotification()}>Forgot Password</a>
                </Form.Group>
            </Form>
        );
    }

    onlogin() {
        var { username, password } = this.state;
        this.props.requestApiLogin({ username, password });
        this.setState({
            isLogin: true
        })
    }

    onShowNotification() {
        // toast.success("We haven't supported.")
    }

    onChangeUsername(e) {
        this.setState({ username: e.target.value })
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value })
    }

    onRedirectToRegister() {
        this.setState({ isClickedResgister: true })
    }

    responseGoogle(response) {
        console.log(response)
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
                        console.log(result)
                        if (result.is_success) {
                            localStorage.setItem("access_token", result.access_token);
                            localStorage.setItem("is_success", result.is_success);
                            localStorage.setItem("refresh_token", result.refresh_token);

                            this.props.history.push('/');
                        }
                    })
                    .catch(error => console.log('error', error));
            } catch (e) {
                toast.error(e);
                return { isFail: true };
            }
        }
    }
};

const mapDispatchToProps = dispatch => {
    return {
        requestApiLogin: (payload) => dispatch(requestApiLogin(payload)),
    };
}

const mapStateToProps = state => ({
    loginInformation: state.loginReducer,
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
