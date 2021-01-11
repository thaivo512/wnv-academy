import './App.scss';
import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './authenicate/login';
import Register from './authenicate/register';
import VerifyEmail from './authenicate/verify-by-opt';
import PrivateNavigate from './authenicate/private-navigate';
import AdminHomePage from './containers/admin/home-page';
import TeacherHomePage from './containers/teacher/home-page';
import StudentHomePage from './containers/student/home-page';
import HomePage from './containers/home-page/home-page';

class RouterConfig extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <PrivateNavigate />
                <Route path='/login' exact={true} component={Login} />
                <Route path='/verify/:emailHashed' exact={true} component={VerifyEmail} />
                <Route path='/register' exact={true} component={Register} />
                <Route path='/admin-home-page' exact={true} component={AdminHomePage} />
                <Route path='/teacher-home-page' exact={true} component={TeacherHomePage} />
                <Route path='/student-home-page' exact={true} component={StudentHomePage} />
                <Route path='/home-page' exact={true} component={HomePage} />
            </Router>
        )
    }
}

export default RouterConfig;
