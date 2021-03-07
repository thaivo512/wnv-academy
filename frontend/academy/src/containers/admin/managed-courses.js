import React, { Component } from 'react';
import '../../assets/admin.scss';
import { Row, Col, Button, Table, Pagination } from 'react-bootstrap';
import EsolModal from '../../components/modal';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { connect } from 'react-redux';
import { requestApiGetAllUser, requestApiDeleteUser } from './redux/action';

class ManagedCourses extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="managed-teacher-container">
                <Row>
                    <Col className="col-3">
                        <h3>Courses Management</h3>
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
                        </tbody>
                    </Table>
                </Row>
                <Row>
                </Row>
            </div>
        )
    }
}

// const mapDispatchToProps = dispatch => {
//     return {
//         requestApiGetAllUser: () => dispatch(requestApiGetAllUser()),
//         requestApiDeleteUser: (id) => dispatch(requestApiDeleteUser(id)),
//     };
// }

// const mapStateToProps = state => ({
//     allUsers: state.requestGetAllUsersReducer,
// })

// export default connect(mapStateToProps, mapDispatchToProps)(ManagedCourses)
export default ManagedCourses;
