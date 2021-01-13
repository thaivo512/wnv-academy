import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import '../assets/nav-component.scss';
import { FaShoppingCart } from 'react-icons/fa';

class NavBarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_success: localStorage.getItem('is_success'),
        }
    }

    render() {
        return (
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="#home">Udemy</Navbar.Brand>
                <Nav className="nav-mr-right">
                    <div class="dropdown">
                        <a class="dropdown-toggle custom-radius" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Categories
                        </a>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a className="dropdown-item">
                                <div class="dropright dropdown-root toggle-sub">
                                    <a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Design
                                    </a>
                                    <div class="dropdown-menu menu-sub" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" href="#">Action</a>
                                        <a class="dropdown-item" href="#">Another action</a>
                                        <a class="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </div>
                            </a>
                            <a className="dropdown-item">
                                <div class="dropright dropdown-root toggle-sub">
                                    <a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Development
                                    </a>
                                    <div class="dropdown-menu menu-sub" aria-labelledby="dropdownMenuButton">
                                        <a class="dropdown-item" href="#">Action</a>
                                        <a class="dropdown-item" href="#">Another action</a>
                                        <a class="dropdown-item" href="#">Something else here</a>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </Nav>
                <Form className="form-wrap-input" inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2 custom-input" />
                    <Button className="custom-radius" variant="info">Search</Button>
                </Form>
                <Nav className="nav-wrap-button justify-content-end" >
                    <Nav.Item className="nav-icon-mr-right">
                        <FaShoppingCart className="icon-shopping-cart" />
                    </Nav.Item>
                    {this.state.is_success == null ?
                        <>
                            <Nav.Item className="nav-mr-right">
                                <Button variant="outline-info" onClick={() => this.onClickMoveToLogin()}>Login</Button>
                            </Nav.Item>
                            <Nav.Item>
                                <Button variant="info" onClick={() => this.onClickMoveToRegister()}>Sign up</Button>
                            </Nav.Item>
                        </>
                        : <></>
                    }
                </Nav>
            </Navbar >
        )
    }

    onClickMoveToRegister() {
        return this.redirect("/register");
    }

    onClickMoveToLogin() {
        return this.redirect("/login");
    }

    redirect = redirectUrl => {
        window.location = redirectUrl;
    };

}

export default NavBarComponent;
