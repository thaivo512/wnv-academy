import React, { Component } from 'react';
import '../../assets/admin.scss';
import { Card, Button, Row, Col } from 'react-bootstrap';

class ManagedCourses extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="managed-teacher-container">
                <Row>
                    <Col>
                        <h3 className="title-page-admin">Courses Management</h3>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col style={{ overflowY: 'scroll', height: '81vh' }}>
                        <Card style={{ width: '95%' }}>
                            <Card.Body>
                                <Card.Title>Card Title</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                                <Button variant="primary">View Detail</Button>
                                <Button variant="primary">Remove</Button>
                                <Button variant="primary">Do something</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col></Col>
                </Row>
            </div>
        )
    }
}

export default ManagedCourses;
