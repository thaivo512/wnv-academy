import React, { Component } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import { FaGem, FaSignOutAlt, FaUserAlt, FaList } from 'react-icons/fa';
import '../../assets/admin.scss';
import { Row } from 'react-bootstrap';
import ManagedTeacher from './managed-teacher';
import ManagedStudent from './managed-student';
import Dashboard from './dashboard';

class AdminHomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            numberOfClick: 0
        }
    }

    render() {
        return (
            <Row className="admin-page-container">
                <ProSidebar>
                    <SidebarHeader className="sidebar-header-cus">
                        <img className="cus-logo" src="https://lh3.googleusercontent.com/p397WtUokKazvBXnYWu7ToOgHj3mEFC5On1EipL5r_v4-0x-ks_7L3K8hEz1XanEKGpKvoTAgVaq-fPicG6pV0gN6Sw_xXtiobfnMQY60n3admBB4kmiTmkRZO_tCy5kenZg_H1N2LZYHMUGmqGySpy5s1QcSWBZItQBt2yDZDqmiQSaIMjYeuuP6pD9WjEIKDv1DfKZoOeICwhD9Bxmfo6odsZ0iXM655i6uW2fng_uAfrcCyoYTcsO68HSGWBa3b0XAjU3OZs3LG6zmDwsXkpzBHhEYEdVY_japfiAPcRNRdO3kOJ3nQFh8KbRniErAz_yRg4nEDVip58Dz4rNO8A1Jh9oRyMvjhJiqR5BGaRl5BCZ1PhDeNapgQ9bA9N4HuqCdXZjrOC37mYDntwECJwhJIxXun4R29mkcKDrve7U3U78G_LHtclY8OX_wakHVC9h2_4bb8tceM-MfJz7Dh3w1C0uGEfVd4JLVjNoFEvPTl1FPzLJiWbuoS3mBUOhj-AAZzCsnabl6RnkZnh58zxbLmVRpAm5zKuDBnRZc50pZWUx9AQ9HxRv7df56v8V3QI-pMXuV4uk86dLl-hpNQG7w9nCc0r1O7Tosg1oPGLKFgb0Jo1J0wrJRYwUE9o1TKqk2VZuMfhjPSICxy88e1VfJju1Ej5ayktkAkixALyuvh4y9oGZb30XIYG8VQ=s564-no?authuser=0" />
                        <Menu iconShape="square">
                            <SubMenu title="Thắng Nguyễn" style={{ textAlign: "left" }}>
                                <MenuItem>Edit Profile</MenuItem>
                                <MenuItem><FaSignOutAlt /></MenuItem>
                            </SubMenu>
                        </Menu>
                    </SidebarHeader>
                    <SidebarContent>
                        <Menu iconShape="square">
                            <MenuItem icon={<FaGem />} onClick={() => this.onSelectMenu(0)}>Dashboard</MenuItem>
                            <MenuItem onClick={() => this.onSelectMenu(1)} icon={<FaList />}> Managed Categories</MenuItem>
                            <SubMenu title="Managed Users" icon={<FaUserAlt />}>
                                <MenuItem onClick={() => this.onSelectMenu(2)}>Teacher</MenuItem>
                                <MenuItem onClick={() => this.onSelectMenu(3)}>Student</MenuItem>
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
                return <ManagedTeacher />
            case 2:
                return <ManagedTeacher />
            case 3:
                return <ManagedStudent />
        }
    }

    onSelectMenu(num) {
        this.setState({ numberOfClick: num })
    }
}

export default AdminHomePage;