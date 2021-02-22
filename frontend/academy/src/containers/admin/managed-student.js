import React, { Component } from 'react';
import '../../assets/admin.scss';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { MDBDataTableV5 } from 'mdbreact';
import EsolModal from '../../components/modal';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { connect } from 'react-redux';
import { requestApiGetAllUser } from './redux/action';

class ManagedStudent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isClicked: false,
            isShowModal: false,
            selectedItem: null,
            datatable:
            {
                columns: [
                    {
                        label: 'ID',
                        field: 'id',
                        width: 50,
                    },
                    {
                        label: 'Username',
                        field: 'username',
                        width: 200,
                    },
                    {
                        label: 'Name',
                        field: 'name',
                        width: 200,
                    },
                    {
                        label: 'Email',
                        field: 'email',
                        width: 200,
                    },
                ],
                rows: []
            }
        }
    }

    componentDidMount() {
        this.props.requestApiGetAllUser();
    }

    render() {
        var { isShowModal, datatable } = this.state;
        this.onOnDisplayUserData()
        return (
            <>
                <EsolModal isShow={isShowModal}
                    title="Add Teacher"
                    onHide={() => this.onShowOrCloseModalAddTeacher()}
                    body={this.renderAddTeacherBodyModal()}
                    size="xs"
                />
                <div className="managed-teacher-container">
                    <Row>
                        <Col>
                            <h3>Student Management</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button variant="primary" type="button"><FaEdit />Edit Student</Button>
                            <Button variant="danger" type="button"><FaTrashAlt /> Remove Student</Button>
                        </Col>
                        <MDBDataTableV5
                            scrollX
                            scrollY
                            maxHeight="60vh"
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
                            getValueCheckBox={(e) => {
                            }} />
                    </Row>
                </div>
            </>
        )
    }

    renderAddTeacherBodyModal() {
        return (
            <Form style={{ textAlign: "left" }}>
                <Form.Group >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" />
                </Form.Group>
                <Button type="button">Add New Teacher</Button>
            </Form>
        )
    }

    onShowOrCloseModalAddTeacher() {
        var isShowModal = this.state.isShowModal;
        this.setState({ isShowModal: !isShowModal });
    }

    onOnDisplayUserData() {
        var { allUsers } = this.props;
        var { datatable } = this.state;
        if (allUsers != null && allUsers.length > 0) {
            allUsers = allUsers.filter(x => x.role == "STUDENT" && x.is_active)
            allUsers.forEach(element => {
                datatable.rows.push({
                    id: element.id,
                    name: element.name,
                    email: element.email
                })
            });

            this.setState({ datatable })
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        requestApiGetAllUser: () => dispatch(requestApiGetAllUser()),
    };
}

const mapStateToProps = state => ({
    allUsers: state.requestGetAllUsersReducer,
})

export default connect(mapStateToProps, mapDispatchToProps)(ManagedStudent)
