import React, { Component } from 'react';
import '../../assets/homepage.scss';
import { Col, Row, Tabs, Tab, Card, Button } from 'react-bootstrap';
import { FaYoutube, FaMedal, FaHeartbeat } from 'react-icons/fa';

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="home-page-container">
                <div className="banner-advertisement ">
                    <div className="img-banner"></div>
                </div>
                <Row className="border-bottom">
                    <Col>
                        <FaYoutube className="icon-ads" />
                        <strong><p><h5>130,000 online courses</h5></p></strong>
                    </Col>
                    <Col>
                        <FaMedal className="icon-ads" />
                        <strong><p><h5>Expert instruction</h5></p></strong>
                    </Col>
                    <Col>
                        <FaHeartbeat className="icon-ads" />
                        <strong><p><h5>Lifetime access</h5></p></strong>
                    </Col>
                </Row>
                <div className="row-margin-top">
                    <Row>
                        <h3>The world's largest selection of courses</h3>
                    </Row>
                    <Row>
                        <div>Choose from 130,000 online video courses with new additions published every month</div>
                    </Row>
                </div>
                {this.genderTabCourses()}
            </div>
        )
    }

    genderTabCourses() {
        return <div className="row-margin-top">
            <Tabs className="row-margin-top" defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="python" title="Python">
                    <div className="d-flex flex-wrap" style={{ overflowY: "scroll", height: "80%" }}>
                        <div class="p-2">
                            <Card style={{ width: '18rem', marginTop: "2%", marginLeft: "2%", textAlign: "left" }}>
                                <Card.Img variant="top" src="https://img-a.udemycdn.com/course/240x135/567828_67d0.jpg?aOSheI8E79KhllxbQda1eg1a6lT6i-WlEB_gSXpjQ-4BIwGR7zKNwLpJ2HmhEqtreyigHpKjGMwyAkWmS0yG9dWGhZBH8sRnRPBduXdI_Q2iKJD9tcoKn5fv5gur" />
                                <Card.Body>
                                    <Card.Title>2021 Complete Python Bootcamp From Zero to Hero in Python</Card.Title>
                                    <Card.Text>
                                        <div style={{ fontSize: "12px" }}>Teacher Name</div>
                                        <Row style={{ marginTop: "3%" }}>
                                            <strong style={{ marginRight: "5px", fontSize: "13px" }}>4.6</strong>
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star checked"></span>
                                            <span class="fa fa-star"></span>
                                            <span class="fa fa-star"></span>
                                            <div style={{ marginLeft: "5px", fontSize: "13px" }}>(334.231)</div>
                                        </Row>
                                        <div style={{ fontSize: "20px", fontWeight: "bold", marginTop: "3%" }}>$11.99</div>
                                        <div class="alert alert-warning" role="alert" style={{ marginTop: "3%", textAlign: "center" }}>
                                            <strong>Best Seller</strong>
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="excel" title="Excel">
                    asdasdasd
                </Tab>
                <Tab eventKey="webdevelopment" title="Web Development">
                    asdasdasd
                </Tab>
                <Tab eventKey="1" title="Contact">
                    asdasdasd
                </Tab>
                <Tab eventKey="2" title="Contact">
                    asdasdasd
                </Tab>
                <Tab eventKey="3" title="Contact">
                    asdasdasd
                </Tab>
                <Tab eventKey="4" title="Contact">
                    asdasdasd
                </Tab>
            </Tabs>
        </div >
    }
}

export default HomePage;
