import React, { Component } from 'react';
import '../../assets/admin.scss';
import { Row, Col, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { MDBDataTableV5 } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import EsolModal from '../../components/modal';
import { FaPlus, FaEdit } from 'react-icons/fa';
import ModalPage from '../../components/modal-warning'
import { requestApiGetAllUser, requestApiDeleteUser } from './redux/action';
import { connect } from 'react-redux';
import { POSITION } from '../../authenicate/constants';

class ManagedTeacher extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teachers: [],
            isClicked: false,
            isShowModalAdd: false,
            isShowModalEdit: false,
            selectedList: {},
        }
    }


    componentDidMount() {
        this.props.requestApiGetAllUser();
    }

    componentDidUpdate() {
        var { isGetUsers, teachers } = this.state;
        if (isGetUsers) {
            this.props.requestApiGetAllUser();
        }

        if (JSON.stringify(this.props.allUsers) != JSON.stringify({})
            && teachers.length != this.props.allUsers.filter(x => x.role == POSITION.TEACHER).length) {
            var teachers = this.props.allUsers.filter(x => x.role == POSITION.TEACHER);
            this.setState({ teachers: teachers, isGetUsers: false });
        }
    }

    render() {
        var { isShowModalAdd, isShowModalEdit, datatable } = this.state;

        return (
            <>
                <EsolModal isShow={isShowModalAdd}
                    title="Add Teacher"
                    onHide={() => this.onShowOrCloseModalAddTeacher()}
                    body={this.renderAddTeacherBodyModal()}
                    size="xs"
                />
                {isShowModalEdit == true &&
                    <EsolModal isShow={isShowModalEdit}
                        title="Edit Teacher"
                        onHide={() => this.onShowOrCloseModalEditTeacher()}
                        body={this.renderEditTeacherBodyModal(this.setState.selectedList)}
                        size="xs"
                    />
                }

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
                            <ModalPage userName={this.setState.userNameSelected}></ModalPage>
                        </Col>

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
                    <Form.Control type="text" placeholder="Name" value={el.name} />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" value={el.email} />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" placeholder="Password" value={el.password} />
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

const mapDispatchToProps = dispatch => {
    return {
        requestApiGetAllUser: () => dispatch(requestApiGetAllUser()),
        requestApiDeleteUser: (id) => dispatch(requestApiDeleteUser(id)),
    };
}

const mapStateToProps = state => ({
    allUsers: state.requestGetAllUsersReducer,
})

export default connect(mapStateToProps, mapDispatchToProps)(ManagedTeacher)