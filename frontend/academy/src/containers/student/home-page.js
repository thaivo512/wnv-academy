import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import '../../assets/student.scss';
import { FaShoppingCart } from 'react-icons/fa';

class StudentHomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="#home">Udemy</Navbar.Brand>
                <Nav className="nav-mr-right">
                    <Dropdown className="dropdown">
                        <Dropdown.Toggle className="custom-radius dropdown-toggle" variant="outline-info" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Categories
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="dropdown-menu">
                            <Dropdown.Item>Design</Dropdown.Item>
                            <Dropdown.Item>Development</Dropdown.Item>
                            <Dropdown.Item>English</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                    {/* <div class="dropdown">
                        <button class="btn btn-info dropdown-toggle custom-radius" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Categories
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <a class="dropdown-item" href="#">Action</a>
                            <a class="dropdown-item" href="#">Another action</a>
                            <a class="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div> */}
                </Nav>
                <Form className="form-wrap-input" inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2 custom-input" />
                    <Button className="custom-radius" variant="info">Search</Button>
                </Form>
                <Nav className="nav-wrap-button justify-content-end" >
                    <Nav.Item className="nav-icon-mr-right">
                        <FaShoppingCart className="icon-shopping-cart" />
                    </Nav.Item>
                    <Nav.Item className="nav-mr-right">
                        <Button variant="outline-info">Login</Button>
                    </Nav.Item>
                    <Nav.Item>
                        <Button variant="info">Sign up</Button>
                    </Nav.Item>
                </Nav>
            </Navbar>
        )
    }
}

export default StudentHomePage;
