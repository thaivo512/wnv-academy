import './App.scss';
import React, { Component } from 'react';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './authenicate/login';
import Register from './authenicate/register';
import VerifyEmail from './authenicate/verify-by-opt';
import PrivateNavigate from './authenicate/private-navigate';
import AdminHomePage from './containers/admin/home-page';

class RouterConfig extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <PrivateNavigate />
                    <Route path='/login' exact={true} component={Login} />
                    <Route path='/verify/:emailHashed' exact={true} component={VerifyEmail} />
                    <Route path='/register' exact={true} component={Register} />
                    <Route path='/admin-home-page' exact={true} component={AdminHomePage} />
                </Switch>
            </Router>
        )
    }
}

export default RouterConfig;
