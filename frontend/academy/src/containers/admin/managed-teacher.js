import React, { Component } from 'react';
import '../../assets/admin.scss';
import { Row, Col, Form, Button, Table, Pagination } from 'react-bootstrap';
import EsolModal from '../../components/modal';
import { FaPlus, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { requestApiGetAllUser, requestApiDeleteUser, requestApiAddTeacher } from './redux/action';
import { connect } from 'react-redux';
import { POSITION } from '../../authenicate/constants';
import { toast } from 'react-toastify';

class ManagedTeacher extends Component {
    constructor(props) {
        super(props);

        this.state = {
            teachers: [],
            isShowModalAdd: false,
            isShowModalEdit: false,
            isShowDeleteModal: false,
            selectedUser: "",
            repassowrd: "",
            username: "",
            name: "",
            email: "",
            password: "",
            pageIndex: 0,
            pageNumber: 13,
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
            var teachers = this.props.allUsers.filter(x => x.role == POSITION.TEACHER).sort(x => x.id);
            this.setState({ teachers: teachers, isGetUsers: false });
        }
    }

    render() {
        var { isShowModalAdd, isShowDeleteModal, selectedUser } = this.state;
        return (
            <>
                <EsolModal isShow={isShowModalAdd}
                    title="Add Teacher"
                    onHide={() => this.onShowOrCloseModalAddTeacher()}
                    body={this.renderAddTeacherBodyModal()}
                    size="xs"
                />
                <EsolModal isShow={isShowDeleteModal}
                    title="Confirm Delete User"
                    onHide={() => this.onHideDeleteUser()}
                    body={this.onRenderConfirmDelete(selectedUser)}
                    size="xs"
                />
                <div className="managed-teacher-container">
                    <Row>
                        <Col className="col-3">
                            <h3>Teacher Management</h3>
                        </Col>
                        <Col className="col-9" style={{ textAlign: "right" }}>
                            <Button onClick={() => this.onShowOrCloseModalAddTeacher()} variant="success">+ Add Teacher</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Table striped bordered hover style={{ textAlign: "center" }}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Is Active</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.onRenderBodyTable()}
                            </tbody>
                        </Table>
                    </Row>
                    <Row>
                        {this.renderPagination()}
                    </Row>
                </div>
            </>
        )
    }

    onHideDeleteUser() {
        this.setState({ isShowDeleteModal: false })
    }

    onShowDeleteUser(id) {
        this.setState({ isShowDeleteModal: true, selectedUser: id })
    }

    onRenderConfirmDelete(id) {
        return (
            <Row>
                <Col>
                    <Button onClick={() => this.onDeleteUser(id)} variant="info">Confirm</Button>
                </Col>
                <Col>
                    <Button onClick={() => this.onHideDeleteUser()} variant="danger">Cancel</Button>
                </Col>
            </Row>
        )
    }

    onDeleteUser(id) {
        this.props.requestApiDeleteUser({ id: id })
        this.onHideDeleteUser();
        this.setState({ isGetUsers: true });
    }

    onRenderBodyTable() {
        var { pageIndex, teachers, pageNumber } = this.state;
        teachers = teachers.slice(pageIndex * pageNumber, pageIndex * pageNumber + pageNumber);
        var elements = [];
        for (let item of teachers) {
            elements.push(
                <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.is_active ? "True" : "False"}</td>
                    <td>
                        <FaTrashAlt onClick={() => this.onShowDeleteUser(item.id)} className="button-icon" style={{ marginRight: "3%", color: "red" }} />
                    </td>
                </tr>)
        }

        return elements;
    }

    renderPagination() {
        var { pageIndex, teachers, pageNumber } = this.state;
        var elements = [];
        var totalPages = parseInt(teachers.length / pageNumber);
        var pageNumber = teachers.length % pageNumber != 0 ? totalPages + 1 : totalPages;
        for (let i = 0; i < pageNumber; i++) {
            if (pageIndex == i) {
                elements.push(<Pagination.Item active>{i}</Pagination.Item>)
            }
            else {
                elements.push(<Pagination.Item onClick={() => this.onSelectPage(i)}>{i}</Pagination.Item>)
            }
        }

        return (
            totalPages == 0 ? <></> :
                <Pagination size="lg">
                    {elements}
                </Pagination >
        )
    }

    onSelectPage(pageIndex) {
        this.setState({ pageIndex: pageIndex })
    }

    renderAddTeacherBodyModal() {
        var { repassowrd, password } = this.state;
        return (
            <Form>
                {password != repassowrd && repassowrd != "" ? <p style={{ color: "red", marginLeft: "10%" }}>Retype password is wrong</p> : <></>}
                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control onChange={(e) => this.onChangeUsername(e.target.value)} type="text" placeholder="User name" />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={(e) => this.onChangeName(e.target.value)} type="text" placeholder="Name" />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Email</Form.Label>
                    <Form.Control onChange={(e) => this.onChangeEmail(e.target.value)} type="email" placeholder="Email" />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Password</Form.Label>
                    <Form.Control onChange={(e) => this.onChangePassword(e.target.value)} type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Retype-Password</Form.Label>
                    <Form.Control onChange={(e) => this.onChangeRetypePassowrd(e.target.value)} type="password" placeholder="Password" />
                </Form.Group>
                <div style={{ textAlign: "center" }}>
                    <Button onClick={() => this.onAddTeacher()} type="button">Add New Teacher</Button>
                </div>
            </Form>
        )
    }

    onChangeUsername(username) {
        this.setState({ username: username })
    }

    onChangeName(name) {
        this.setState({ name: name })
    }

    onChangeEmail(email) {
        this.setState({ email: email })
    }

    onChangePassword(password) {
        this.setState({ password: password })
    }

    onChangeRetypePassowrd(repassowrd) {
        this.setState({ repassowrd: repassowrd })
    }

    onAddTeacher() {
        var { username, name, email, password, repassowrd } = this.state;
        if (password == repassowrd &&
            username != "" && name != "" && email != "" && password != "") {
            this.props.requestApiAddTeacher({
                name: name,
                username: username,
                email: email,
                password: password
            })

            this.setState({
                repassowrd: "",
                username: "",
                name: "",
                email: "",
                password: "",
                isGetUsers: true
            })
            this.onShowOrCloseModalAddTeacher();
        }
        else if (username != "" || name != "" || email != "" || password != "") {
            toast.error("Please fill input fields.");
        }
        else {
            toast.error("Please retype password correctly.");
        }
    }

    onShowOrCloseModalAddTeacher() {
        var isShowModal = this.state.isShowModalAdd;
        this.setState({ isShowModalAdd: !isShowModal });
    }
}

const mapDispatchToProps = dispatch => {
    return {
        requestApiGetAllUser: () => dispatch(requestApiGetAllUser()),
        requestApiDeleteUser: (id) => dispatch(requestApiDeleteUser(id)),
        requestApiAddTeacher: (teacher) => dispatch(requestApiAddTeacher(teacher)),
    };
}

const mapStateToProps = state => ({
    allUsers: state.requestGetAllUsersReducer,
})

export default connect(mapStateToProps, mapDispatchToProps)(ManagedTeacher)