import React, { Component } from 'react';
import '../../assets/admin.scss';
import { Row, Col, Button, Table, Pagination } from 'react-bootstrap';
import EsolModal from '../../components/modal';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { connect } from 'react-redux';
import { requestApiGetAllUser, requestApiDeleteUser } from './redux/action';
import { POSITION } from '../../authenicate/constants';

class ManagedStudent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isGetUsers: true,
            isShowDeleteModal: false,
            pageIndex: 0,
            selectedUser: "",
            pageNumber: 13,
            students: []
        }
    }

    componentDidMount() {
        this.props.requestApiGetAllUser();
    }

    componentDidUpdate() {
        var { students, isGetUsers } = this.state;
        if (isGetUsers) {
            this.props.requestApiGetAllUser();
        }

        if (JSON.stringify(this.props.allUsers) != JSON.stringify({})
            && students.length != this.props.allUsers.filter(x => x.role == POSITION.STUDENT).length) {
            var students = this.props.allUsers.filter(x => x.role == POSITION.STUDENT);
            this.setState({ students: students, isGetUsers: false });
        }
    }

    render() {
        var { isShowDeleteModal, selectedUser } = this.state;
        return (
            <>
                <EsolModal isShow={isShowDeleteModal}
                    title="Confirm Delete User"
                    onHide={() => this.onHideDeleteUser()}
                    body={this.onRenderConfirmDelete(selectedUser)}
                    size="xs"
                />
                <div className="managed-teacher-container">
                    <Row>
                        <Col>
                            <h3>Student Management</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Table striped bordered hover style={{ textAlign: "center" }}>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Is Active</th>
                                    <th>Email</th>
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
        var { pageIndex, students, pageNumber } = this.state;
        students = students.slice(pageIndex * pageNumber, pageIndex * pageNumber + pageNumber);
        var elements = [];
        for (let item of students) {
            elements.push(
                <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.is_active ? "True" : "False"}</td>
                    <td>{item.email}</td>
                    <td>
                        <FaTrashAlt onClick={() => this.onShowDeleteUser(item.id)} className="button-icon" style={{ marginRight: "3%", color: "red" }} />
                    </td>
                </tr>)
        }

        return elements;
    }

    onSelectPage(pageIndex) {
        this.setState({ pageIndex: pageIndex })
    }

    renderPagination() {
        var { pageIndex, students, pageNumber } = this.state;
        var elements = [];
        var totalPages = parseInt(students.length / pageNumber);
        var pageNumber = students.length % pageNumber != 0 ? totalPages + 1 : totalPages;
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

export default connect(mapStateToProps, mapDispatchToProps)(ManagedStudent)
