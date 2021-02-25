import React, { Component } from 'react';
import '../../assets/homepage.scss';
import { Col, Row, Card, Button, Carousel } from 'react-bootstrap';
import { FaYoutube, FaMedal, FaHeartbeat, FaClock, FaUserAlt, FaSearch } from 'react-icons/fa';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import NavBarComponent from '../../components/nav-bar';

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <NavBarComponent />
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
                        <h4>Top 10 categories</h4>
                    </div>
                    {this.renderTopCategories()}
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
            <MDBFooter color="blue" className="font-small pt-4 mt-4">
                <MDBContainer fluid className="text-center text-md-left">
                    <MDBRow>
                        <MDBCol md="6">
                            <h5 className="title">Footer Content</h5>
                            <p>
                                Here you can use rows and columns here to organize your footer
                                content.
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <div className="footer-copyright text-center py-3">
                    <MDBContainer fluid>
                        &copy; {new Date().getFullYear()} Copyright: <a href="https://www.mdbootstrap.com"> MDBootstrap.com </a>
                    </MDBContainer>
                </div>
            </MDBFooter>
        </div>
    }

    renderTopCategories() {
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

    renderThreeOutstandingCourses() {
        return <div className="d-flex flex-wrap" style={{ justifyContent: "center" }}>
            <div class="p-2">
                <Card style={{ width: '18rem', marginTop: "2%", marginLeft: "2%", textAlign: "left" }}>
                    <Card.Img variant="top" src="https://img-a.udemycdn.com/course/240x135/567828_67d0.jpg?aOSheI8E79KhllxbQda1eg1a6lT6i-WlEB_gSXpjQ-4BIwGR7zKNwLpJ2HmhEqtreyigHpKjGMwyAkWmS0yG9dWGhZBH8sRnRPBduXdI_Q2iKJD9tcoKn5fv5gur" />
                    <Card.Body>
                        <Card.Title>2021 Complete Python Bootcamp From Zero to Hero in Python</Card.Title>
                        <Card.Text>
                            <div style={{ fontSize: "12px" }}>Teacher Name</div>
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
