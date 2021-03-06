import React, { Component } from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import '../assets/nav-component.scss';
import { Link, withRouter } from 'react-router-dom';
import { API_URL } from '../authenicate/constants';
import { Input, Select } from 'antd';
import { Menu } from 'antd';


const { SubMenu } = Menu;
const { Option } = Select;



class NavBarComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_success: localStorage.getItem('is_success'),
            keyword: '',
            category: '',
            allCategories: []
        }
    }

    async componentDidMount() {
        const categories = await this.getAllCategory();
        this.setState({
            ...this.state,
            allCategories: categories
        })
    }


    onClickMoveToRegister = () => {
        this.props.history.push('/register');
    }

    onClickMoveToLogin = () => {
        this.props.history.push('/login');
    }

    onChangeKeyword = (e) => {
        this.setState({
            ...this.state,
            keyword: e.target.value
        })
    }

    onClickMoveToSearch = () => {

        this.props.history.push(`/search?q=${this.state.keyword}&category=${this.state.category}`);
    }

    onChangeCategorySearch = (e) => {
        this.setState({
            ...this.state,
            category: e
        })
    }

    getAllCategory = async () => {
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        };
        const response = await fetch(API_URL + 'category', requestOptions);
        return await response.json();
    }


    handleClickMenu = (e) => {
        this.props.history.push(`/search?category=${e.key}`);
    }
    onClickLogout = (e) => {
        localStorage.removeItem('is_success');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        window.location = '/login';
    }

    onRedirectToTeacher() {
        window.location = '/teacher-home-page';
    }

    render() {
        return (
            <div>
                <Navbar bg="light" variant="light">
                    <Navbar.Brand>
                        <Link to="/home-page">Academy</Link>
                    </Navbar.Brand>

                    <Input.Search addonBefore={
                        <Select defaultValue="" className="select-before" onChange={this.onChangeCategorySearch}>
                            <Option value="">Tất cả danh mục</Option>
                            {
                                this.state.allCategories.map(i => i.sub_categorys).flat()
                                    .map(item => <Option value={item.id}>{item.name}</Option>)
                            }
                        </Select>
                    }
                        placeholder="Search"
                        value={this.state.keyword}
                        onChange={this.onChangeKeyword}
                        style={{ marginRight: 30 }}
                        onSearch={this.onClickMoveToSearch} />

                    <Nav className="nav-wrap-button justify-content-end" >
                        {this.state.is_success == null ?
                            <>
                                <Nav.Item className="nav-mr-right">
                                    <Button variant="outline-info" onClick={this.onClickMoveToLogin}>Login</Button>
                                </Nav.Item>
                                <Nav.Item>
                                    <Button variant="info" onClick={this.onClickMoveToRegister}>Sign up</Button>
                                </Nav.Item>
                            </>
                            : <>
                                <a style={{ marginRight: "3%" }} onClick={() => this.onRedirectToTeacher()}>Teacher</a>
                                <a onClick={this.onClickLogout}>Đăng xuất</a>
                            </>
                        }
                    </Nav>
                </Navbar >

                <Menu onClick={this.handleClickMenu} mode="horizontal">
                    {
                        this.state.allCategories.map(category =>
                            <SubMenu key={category.id} title={category.name}>
                                {
                                    category.sub_categorys.map(sub =>
                                        <Menu.Item key={sub.id}>{sub.name}</Menu.Item>
                                    )
                                }
                            </SubMenu>
                        )
                    }
                </Menu>
            </div>
        )
    }

}

export default withRouter(NavBarComponent);
