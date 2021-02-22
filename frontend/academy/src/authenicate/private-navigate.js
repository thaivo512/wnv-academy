import React, { Component } from 'react';
import { POSITION } from './constants';
import NavBarComponent from '../components/nav-bar';

class PrivateNavigate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            access_token: localStorage.getItem('access_token'),
            refresh_token: localStorage.getItem('refresh_token'),
            is_success: localStorage.getItem('is_success'),
        };
    }

    redirect = redirectUrl => {
        window.location = redirectUrl;
    };

    render() {
        var { is_success, access_token } = this.state;
        var currentURL = window.location.href;
        if (access_token) {
            var payload = JSON.parse(atob(access_token.split(".")[1]))
        }
        if (is_success == null || is_success== false) {
            if (this.isContains(currentURL, 'register')) {
                if (!this.isContains(currentURL, 'register')) {
                    return this.redirect("/register");
                }
            }
            else if (this.isContains(currentURL, 'verify')) {
                if (!this.isContains(currentURL, 'verify')) {
                    var tail = "/verify" + currentURL.substring(currentURL.lastIndexOf("/"));
                    return this.redirect(tail);
                }
            }
            else if (this.isContains(currentURL, 'login')) {
                if (!this.isContains(currentURL, 'login')) {
                    return this.redirect("/login");
                }
            }
            else {
                return <>
                    <NavBarComponent />
                    { this.showByRole(POSITION.NONE, currentURL)}
                </>
            }
            return <></>
        }
        else {
            return <>
                {this.showByRole(POSITION.TEACHER, currentURL)}
            </>
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

    showByRole = (position, currentURL) => {
        switch (position) {
            case POSITION.ADMIN:
                if (!this.isContains(currentURL, 'admin-home-page')) {
                    return this.redirect("/admin-home-page");
                }
                return <></>
            case POSITION.STUDENT:
                if (!this.isContains(currentURL, 'student-home-page')) {
                    return this.redirect("/student-home-page");
                }
                return <></>
            case POSITION.TEACHER:
                if (!this.isContains(currentURL, 'teacher-home-page')) {
                    return this.redirect("/teacher-home-page");
                }
                return <></>
            default:
                if (!this.isContains(currentURL, 'home-page')) {
                    return this.redirect("/home-page");
                }
                return <></>
        }

    }
}

export default PrivateNavigate;
