import React, { Component } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import '../assets/nav-component.scss';
import { Link, withRouter } from 'react-router-dom';
import { API_URL } from '../authenicate/constants';
import { Input, Select } from 'antd';
import jwt from 'jwt-decode';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';



const { SubMenu } = Menu;
const { Option } = Select;



class NavBarComponent extends Component {
    constructor(props) {
        super(props);

        const token = localStorage.getItem('access_token');
        let user = null;
        try { 
            user = jwt(token);
        }
        catch (err) { }

        this.state = {
            user: user,
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

        this.props.history.push('/login');
    }

    studentMenu = (
        <Menu>
          <Menu.Item key="0">
            <Link to='/info'>Thông tin</Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link to='/enrol-course'>Khóa học</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to='/watchlist'>Watchlist</Link>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3" danger onClick={this.onClickLogout}>Đăng xuất</Menu.Item>
        </Menu>
    );
    teacherMenu = (
        <Menu>
          <Menu.Item key="0">
            <Link to='/info'>Thông tin</Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link to='/teacher-home-page'>Trang giáo viên</Link>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3" danger onClick={this.onClickLogout}>Đăng xuất</Menu.Item>
        </Menu>
    );
    adminMenu = (
        <Menu>
          <Menu.Item key="0">
            <Link to='/info'>Thông tin</Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link to='/admin-home-page'>Trang Admin</Link>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3" danger onClick={this.onClickLogout}>Đăng xuất</Menu.Item>
        </Menu>
    );
    getMenuByRole = () => {
        const role = this.state.user.role;
        
        if(role == 'ADMIN') return this.adminMenu;
        if(role == 'TEACHER') return this.teacherMenu;
        return this.studentMenu;
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
                        {!this.state.user ?
                            <>
                                <Nav.Item className="nav-mr-right">
                                    <Button variant="outline-info" onClick={this.onClickMoveToLogin}>Login</Button>
                                </Nav.Item>
                                <Nav.Item>
                                    <Button variant="info" onClick={this.onClickMoveToRegister}>Sign up</Button>
                                </Nav.Item>
                            </>
                            : <>
                                <Dropdown overlay={this.getMenuByRole} trigger={['click']}>
                                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                        { this.state.user.name } <DownOutlined />
                                    </a>
                                </Dropdown>
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
