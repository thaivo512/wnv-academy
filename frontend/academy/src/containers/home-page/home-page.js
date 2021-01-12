import React, { Component } from 'react';
import '../../assets/homepage.scss';
import { Col, Row, Card, Button, Carousel } from 'react-bootstrap';
import { FaYoutube, FaMedal, FaHeartbeat, FaClock, FaUserAlt, FaSearch } from 'react-icons/fa';

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
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
                    <div className="row-margin-top" style={{ textAlign: "center" }}>
                        <h4>Three outstanding course in the past week</h4>
                    </div>
                    {this.renderThreeOutstandingCourses()}
                    <div className="border-bottom row-margin-top"></div>
                    <div className="row-margin-top" style={{ textAlign: "center" }}>
                        <h4>Top 10 most viewed courses</h4>
                    </div>
                    {this.genderTabCourses()}
                    <div className="border-bottom row-margin-top"></div>
                    <div className="row-margin-top" style={{ textAlign: "center" }}>
                        <h4>Top 10 latest courses</h4>
                    </div>
                    {this.genderTabCourses()}
                    <div className="border-bottom row-margin-top"></div>
                    <Row style={{ marginTop: "2%" }}>
                        <Col>
                            <FaClock className="icon-ads" />
                            <strong><p><h5>Go at your own pace</h5></p></strong>
                        </Col>
                        <Col>
                            <FaUserAlt className="icon-ads" />
                            <strong><p><h5>Learn from industry experts</h5></p></strong>
                        </Col>
                        <Col>
                            <FaSearch className="icon-ads" />
                            <strong><p><h5>Find video courses on almost any topic</h5></p></strong>
                        </Col>
                    </Row>
                </div>
                {this.renderFooter()}
            </>
        )
    }

    renderFooter() {
        return <div class="footer">
            <p>Footer</p>
        </div>
    }

    renderThreeOutstandingCourses() {
        return <div className="d-flex flex-wrap" style={{ justifyContent: "center" }}>
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
    }

    genderTabCourses() {
        return <div className="row-margin-top" style={{ backgroundColor: "#17a2b8", width: "195%", marginLeft: "-47%" }}>
            <Carousel>
                <Carousel.Item>
                    <div className="d-flex flex-wrap" style={{ justifyContent: "center" }}>
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
                </Carousel.Item>
                <Carousel.Item>
                    <div className="d-flex flex-wrap" style={{ justifyContent: "center" }}>
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
                </Carousel.Item>
            </Carousel>
        </div >
    }
}

export default HomePage;
