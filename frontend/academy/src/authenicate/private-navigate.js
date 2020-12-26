import React, { Component } from 'react';
import { BrowserRouter as Redirect } from 'react-router-dom';
import { POSITION } from './constants';

class PrivateNavigate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            access_token: localStorage.getItem('access_token'),
            refresh_token: localStorage.getItem('refresh_token'),
            is_success: localStorage.getItem('is_success'),
        };
    }

    render() {
        var { is_success, access_token } = this.state;
        if (access_token) {
            var payload = JSON.parse(atob(access_token.split(".")[1]))
        }
        if (is_success && is_success) {
            return <> {this.showByRole(payload.role)} </>
        }
        else {
            var currentURL = window.location.href;
            if (this.isContains(currentURL, 'register')) {
                return <Redirect to='/register' />
            }
            else if (this.isContains(currentURL, 'verify')) {
                var tail = "/verify" + currentURL.substring(currentURL.lastIndexOf("/"));
                return <Redirect to={tail} />
            }
            else {
                return <Redirect to='/login' />
            }
        }
    }


    isContains(parent, child) {
        return parent.indexOf(child) >= 0;
    }


    onLogout = () => {
        localStorage.removeItem('access_token');
        this.setState = { access_token: null };
        window.location.reload();
    }

    showByRole = (position) => {
        switch (position) {
            case POSITION.ADMIN:
                return <Redirect to='/admin-home-page' />
            case POSITION.STUDENT:
            case POSITION.TEACHER:
            default:
        }

    }
}

export default PrivateNavigate;