import React, { Component } from 'react';
import '../../assets/admin.scss';
import { Row, Col, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { MDBDataTableV5 } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import EsolModal from '../../components/modal';
import { FaTrashAlt, FaPlus, FaEdit } from 'react-icons/fa';

class ManagedTeacher extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isClicked: false,
            isShowModalAdd: false,
            isShowModalEdit: false,
            selectedList: {},
            datatable:
            {
                columns: [
                    {
                        label: 'UserName',
                        field: 'username',
                        width: 70,
                        attributes: {
                            'aria-controls': 'DataTable',
                            'aria-label': 'UserName',
                        },
                    },
                    {
                        label: 'Name',
                        field: 'name',
                        width: 150,
                    },
                    {
                        label: 'Email',
                        field: 'email',
                        width: 200,
                    },
                    {
                        label: 'Password',
                        field: 'password',
                        sort: 'asc',
                        width: 100,
                    }
                ],
                rows: [
                    {
                        username: 'Tiger Nixon',
                        name: 'System Architect',
                        email: 'Edinburgh',
                        password: '61',
                    },
                    {
                        username: 'Garrett Winters',
                        name: 'Accountant',
                        email: 'Tokyo',
                        password: '63'
                    },
                    {
                        username: 'Ashton Cox',
                        name: 'Junior Technical Author',
                        email: '66',
                        password: '2009/01/12',
                    },
                    {
                        username: 'Cedric Kelly',
                        name: 'Senior Javascript Developer',
                        email: 'Edinburgh',
                        password: '22',
                    },
                    {
                        username: 'Airi Satou',
                        name: 'Accountant',
                        email: 'Tokyo',
                        password: '33',
                    },
                    {
                        username: 'Brielle Williamson',
                        name: 'Integration Specialist',
                        email: 'New York',
                        password: '61',
                    },
                    {
                        username: 'Herrod Chandler',
                        name: 'Sales Assistant',
                        email: 'San Francisco',
                        password: '59',
                    },
                    {
                        username: 'Donna Snider',
                        name: 'Customer Support',
                        email: 'New York',
                        password: '27',
                    },
                ]
            }
        }
    }

    handleChange(e) {
        this.setState({ selectedList: e });
        this.setState.selectedList = e;
        console.log(this.setState.selectedList.name);
    }

    render() {
        var { isShowModalAdd, isShowModalEdit, datatable, selectedList } = this.state;

        return (
            <>
                <EsolModal isShow={isShowModalAdd}
                    title="Add Teacher"
                    onHide={() => this.onShowOrCloseModalAddTeacher()}
                    body={this.renderAddTeacherBodyModal()}
                    size="xs"
                />
                <EsolModal isShow={isShowModalEdit}
                    title="Edit Teacher"
                    onHide={() => this.onShowOrCloseModalEditTeacher()}
                    body={this.renderEditTeacherBodyModal(this.setState.selectedList)}
                    size="xs"
                />
                <div className="managed-teacher-container">
                    <Row>
                        <Col>
                            <h3 className="title-page-admin">Teacher Management</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="success" type="button" onClick={() => this.onShowOrCloseModalAddTeacher()}>
                                <FaPlus /> Add Teacher
                            </Button>
                            <Button variant="primary" type="button" onClick={() => this.onShowOrCloseModalEditTeacher()}>
                                <FaEdit />Edit Teacher
                            </Button>
                            <Button variant="danger" type="button">
                                <FaTrashAlt /> Remove
                            </Button>
                        </Col>
                        <MDBDataTableV5
                            scrollX
                            scrollY
                            maxHeight="56vh"
                            bordered
                            hover
                            entries={10}
                            pagesAmount={4}
                            data={datatable}
                            searchTop
                            searchBottom={false}
                            checkbox
                            headCheckboxID='id2'
                            bodyCheckboxID='checkboxes2'
                            getValueCheckBox={e => this.handleChange(e)} 
                        />
                    </Row>
                </div>
            </>
        )
    }

    onClickActive() {
        var isClicked = this.state.isClicked;
        this.setState({ isClicked: !isClicked })
    }

    renderAddTeacherBodyModal() {
        return (
            <Form style={{ textAlign: "left" }}>
                <Form.Group>
                    <Form.Label>User name</Form.Label>
                    <Form.Control type="text" placeholder="User name" />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" placeholder="Password" />
                </Form.Group>
                <Button type="button">Add New Teacher</Button>
            </Form>
        )
    }

    renderEditTeacherBodyModal(el) {
        return (
            <Form style={{ textAlign: "left" }}>
                <Form.Group >
                    <Form.Label>User name</Form.Label>
                    <Form.Control type="text" placeholder="User name" value={el.username} />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Name" value={el.name}/>
                </Form.Group>
                <Form.Group >
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" value={el.email}/>
                </Form.Group>
                <Form.Group >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" placeholder="Password" value={el.password}/>
                </Form.Group>
                <Button type="button">Edit Teacher</Button>
            </Form>
        )
    }

    onShowOrCloseModalAddTeacher() {
        var isShowModal = this.state.isShowModalAdd;
        this.setState({ isShowModalAdd: !isShowModal });
    }

    onShowOrCloseModalEditTeacher() {
        var isShowModal = this.state.isShowModalEdit;
        this.setState({ isShowModalEdit: !isShowModal });
    }
}

export default ManagedTeacher;
