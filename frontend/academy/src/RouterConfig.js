import './App.scss';
import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from './authenicate/login';
import Register from './authenicate/register';
import VerifyEmail from './authenicate/verify-by-opt';
import AdminHomePage from './containers/admin/home-page';
import TeacherHomePage from './containers/teacher/home-page';
import StudentHomePage from './containers/student/home-page';
import HomePage from './containers/home-page/home-page';
import SearchPage from './containers/search-page/search-page';
import DetailPage from './containers/detail-page/detail-page';
import InfoPage from './containers/info-page/info-page';
import EnroledPage from './containers/enroled-page/enroled-page';
import WatchListPage from './containers/watchlist-page/watchlist-page';
import LearningPage from './containers/learning-page/learning-page';
import { POSITION } from './authenicate/constants';

class RouterConfig extends Component {
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
        var teacherInfo = { role: "" };
        if (is_success) {
            teacherInfo = JSON.parse(atob(access_token.split(".")[1]));
        }

        return (
            <Router>
                <Route path='/' exact={true} component={HomePage} />
                <Route path='/home-page' exact={true} component={HomePage} />
                <Route path='/search' exact={true} component={SearchPage}  />
                <Route path='/details' exact={true} component={DetailPage}  />
                <Route path='/info' exact={true} component={ InfoPage }  />
                <Route path='/enrol-course' exact={true} component={ EnroledPage }  />
                <Route path='/watchlist' exact={true} component={ WatchListPage }  />
                <Route path='/course' exact={true} component={ LearningPage }  />
                
                {
                    is_success ?
                        this.routeByRole(teacherInfo.role) :
                        this.routeUnauthorize()
                }
                {this.autoRedirect(is_success, teacherInfo.role)}
            </Router>
        )
    }

    autoRedirect(is_success, role) {
        var currentURL = window.location.href;
        var position = role.toLowerCase() + "-home-page";
        if (!is_success) {
            if (this.isContains(currentURL, position)) {
                return <Redirect to="/login" />
            }
        }
        else {
            if (!this.isContains(currentURL, position))
                return <Redirect to="/home-page" />
        }
    }

    isContains(parent, child) {
        return parent.indexOf(child) >= 0;
    }

    routeByRole(position) {
        var elements = [];
        switch (position) {
            case POSITION.ADMIN:
                elements.push(<Route path='/admin-home-page' exact={true} component={AdminHomePage} />);
            case POSITION.STUDENT:
                elements.push(<Route path='/student-home-page' exact={true} component={StudentHomePage} />);
            case POSITION.TEACHER:
                elements.push(<Route path='/teacher-home-page' exact={true} component={TeacherHomePage} />);
        }
        return elements;
    }

    routeUnauthorize() {
        return (
            <>
                <Route path='/login' exact={true} component={Login} />
                <Route path='/verify/:emailHashed' exact={true} component={VerifyEmail} />
                <Route path='/register' exact={true} component={Register} />
            </>
        )
    }
}

export default RouterConfig;
