import React, { Component } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { FaGem, FaSignOutAlt, FaUserAlt, FaList, FaBook } from 'react-icons/fa';
import '../../assets/admin.scss';
import { Row } from 'react-bootstrap';
import ManagedTeacher from './managed-teacher';
import ManagedStudent from './managed-student';
import ManagedCategories from './managed-category';
import ManagedCourses from './managed-courses';
import Dashboard from './dashboard';

class AdminHomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numberOfClick: 0,
            access_token: localStorage.getItem('access_token'),
            is_success: localStorage.getItem('is_success')
        }
    }

    render() {
        var { is_success, access_token } = this.state;
        var info = { role: "" };
        if (is_success) {
            info = JSON.parse(atob(access_token.split(".")[1]));
        }

        return (
            <Row className="admin-page-container">
                <ProSidebar>
                    <SidebarHeader className="sidebar-header-cus">
                        <img className="cus-logo" src="https://lh3.googleusercontent.com/p397WtUokKazvBXnYWu7ToOgHj3mEFC5On1EipL5r_v4-0x-ks_7L3K8hEz1XanEKGpKvoTAgVaq-fPicG6pV0gN6Sw_xXtiobfnMQY60n3admBB4kmiTmkRZO_tCy5kenZg_H1N2LZYHMUGmqGySpy5s1QcSWBZItQBt2yDZDqmiQSaIMjYeuuP6pD9WjEIKDv1DfKZoOeICwhD9Bxmfo6odsZ0iXM655i6uW2fng_uAfrcCyoYTcsO68HSGWBa3b0XAjU3OZs3LG6zmDwsXkpzBHhEYEdVY_japfiAPcRNRdO3kOJ3nQFh8KbRniErAz_yRg4nEDVip58Dz4rNO8A1Jh9oRyMvjhJiqR5BGaRl5BCZ1PhDeNapgQ9bA9N4HuqCdXZjrOC37mYDntwECJwhJIxXun4R29mkcKDrve7U3U78G_LHtclY8OX_wakHVC9h2_4bb8tceM-MfJz7Dh3w1C0uGEfVd4JLVjNoFEvPTl1FPzLJiWbuoS3mBUOhj-AAZzCsnabl6RnkZnh58zxbLmVRpAm5zKuDBnRZc50pZWUx9AQ9HxRv7df56v8V3QI-pMXuV4uk86dLl-hpNQG7w9nCc0r1O7Tosg1oPGLKFgb0Jo1J0wrJRYwUE9o1TKqk2VZuMfhjPSICxy88e1VfJju1Ej5ayktkAkixALyuvh4y9oGZb30XIYG8VQ=s564-no?authuser=0" />
                        <Menu iconShape="square">
                            <SubMenu title={info.name} style={{ textAlign: "left" }}>
                                <MenuItem onClick={() => this.onGoHomePage()} >Home Page</MenuItem>
                                <MenuItem><FaSignOutAlt className="button-icon" onClick={() => this.onClickLogout()} /></MenuItem>
                            </SubMenu>
                        </Menu>
                    </SidebarHeader>
                    <SidebarContent>
                        <Menu iconShape="square">
                            <MenuItem icon={<FaGem />} onClick={() => this.onSelectMenu(0)}>Dashboard</MenuItem>
                            <MenuItem onClick={() => this.onSelectMenu(1)} icon={<FaList />}> Managed Categories</MenuItem>
                            <MenuItem onClick={() => this.onSelectMenu(2)} icon={<FaBook />}> Managed Courses</MenuItem>
                            <SubMenu title="Managed Users" icon={<FaUserAlt />}>
                                <MenuItem onClick={() => this.onSelectMenu(3)}>Teacher</MenuItem>
                                <MenuItem onClick={() => this.onSelectMenu(4)}>Student</MenuItem>
                            </SubMenu>
                        </Menu>
                    </SidebarContent>
                    <SidebarFooter className="sidebar-footer-cus">
                    </SidebarFooter>
                </ProSidebar>
                <div className="managed-teacher-custom-row">
                    {this.onChangeMenuItem()}
                </div>
            </Row>
        )
    }

    onChangeMenuItem() {
        var number = this.state.numberOfClick;
        switch (number) {
            case 0:
                return <Dashboard />
            case 1:
                return <ManagedCategories />
            case 2:
                return <ManagedCourses />
            case 3:
                return <ManagedTeacher />
            case 4:
                return <ManagedStudent />
        }
    }

    onSelectMenu(num) {
        this.setState({ numberOfClick: num })
    }

    onGoHomePage() {
        window.location = '/home-page';
    }

    onClickLogout = () => {
        localStorage.removeItem('is_success');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location = '/login';
    }

}

export default AdminHomePage;
