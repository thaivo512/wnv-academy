import React, { Component } from 'react';
import '../../assets/homepage.scss';
import { Col, Row, Card, Button, Carousel } from 'react-bootstrap';
import { FaYoutube, FaMedal, FaHeartbeat, FaClock, FaUserAlt, FaSearch } from 'react-icons/fa';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import NavBarComponent from '../../components/nav-bar';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

import {
    requestApiGetTop10CourseView, 
    requestApiGetTop10CourseNew,
    requestApiGetTopCategoryWeek,
    requestApiGetTopCourseWeek
} from './redux/action';

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isGetTop10CourseView: true,
            isGetTop10CourseNew: true,
            isGetTopCategoryWeek: true,
            isGetTopCourseWeek: true,
            top10CourseView: [],
            top10CourseNew: [],
            topCategoryWeek: [],
            topCourseWeek: []
        }
    }

    componentDidMount() {
        this.props.requestApiGetTop10CourseView();
        this.props.requestApiGetTop10CourseNew();
        this.props.requestApiGetTopCategoryWeek();
        this.props.requestApiGetTopCourseWeek();
    }

    componentDidUpdate() {
        var { isGetTop10CourseView } = this.state;
        if (isGetTop10CourseView && Array.isArray(this.props.top10CourseView)) {

            this.setState(
                {
                    top10CourseView: this.props.top10CourseView,
                    isGetTop10CourseView: false,
                }
            )
        }

        var { isGetTop10CourseNew } = this.state;
        if (isGetTop10CourseNew && Array.isArray(this.props.top10CourseNew)) {
            this.setState(
                {
                    top10CourseNew: this.props.top10CourseNew,
                    isGetTop10CourseNew: false,
                }
            )
        }

        var { isGetTopCategoryWeek } = this.state;
        if (isGetTopCategoryWeek && Array.isArray(this.props.topCategoryWeek)) {
            this.setState(
                {
                    topCategoryWeek: this.props.topCategoryWeek,
                    isGetTopCategoryWeek: false,
                }
            )
        }

        var { isGetTopCourseWeek } = this.state;
        if (isGetTopCourseWeek && Array.isArray(this.props.topCourseWeek)) {
            this.setState(
                {
                    topCourseWeek: this.props.topCourseWeek,
                    isGetTopCourseWeek: false,
                }
            )
        }
    }


    chunk(arr, size) {
        const newArr = [...arr];
        const result = [];
      
        while (newArr.length) {
          result.push(newArr.splice(0, size));
        }
      
        return result;
    };


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
                        <h4>Top categories enroll last week</h4>
                    </div>
                    {this.renderTopCategories()}
                    <div className="border-bottom row-margin-top"></div>
                    <div className="row-margin-top" style={{ textAlign: "center" }}>
                        <h4>Top 10 most viewed courses</h4>
                    </div>
                    {this.renderTop10CourseView()}
                    <div className="border-bottom row-margin-top"></div>
                    <div className="row-margin-top" style={{ textAlign: "center" }}>
                        <h4>Top 10 latest courses</h4>
                    </div>
                    {this.renderTop10CourseNew()}
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
            { this.chunk(this.state.topCategoryWeek, 4).map((items) =>
                    <Carousel.Item>
                        <div className="d-flex flex-wrap" style={{ justifyContent: "center" }}>
                            { items.map((item) =>
                                <div class="p-2">
                                    <Card style={{ width: '18rem', marginTop: "2%", marginLeft: "2%", textAlign: "left" }}>
                                        <Card.Body>
                                            <Card.Text>
                                                <Link to={`/search?category=${item.id}`}>
                                                    <div class="alert alert-warning" role="alert" style={{ marginTop: "3%", textAlign: "center" }}>
                                                        <strong>{item.name}</strong>
                                                    </div>
                                                </Link>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )}
                        </div>
                    </Carousel.Item>
                )}
            </Carousel>
        </div >
    }

    renderThreeOutstandingCourses() {
        return <div className="d-flex flex-wrap" style={{ justifyContent: "center" }}>
            { this.state.topCourseWeek.map(item => 
                <Link class="p-2" to={`/details?id=${item.id}` }>
                    <Card style={{ width: '18rem', marginTop: "2%", marginLeft: "2%", textAlign: "left" }}>
                        <Card.Img variant="top" src="https://img-a.udemycdn.com/course/240x135/567828_67d0.jpg?aOSheI8E79KhllxbQda1eg1a6lT6i-WlEB_gSXpjQ-4BIwGR7zKNwLpJ2HmhEqtreyigHpKjGMwyAkWmS0yG9dWGhZBH8sRnRPBduXdI_Q2iKJD9tcoKn5fv5gur" />
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                            <Card.Text>
                                <div style={{ fontSize: "12px" }}>{item.teacher.name}</div>
                                <div style={{ fontSize: "20px", fontWeight: "bold", marginTop: "3%" }}>{item.price} VND</div>
                                <div class="alert alert-warning" role="alert" style={{ marginTop: "3%", textAlign: "center" }}>
                                    <strong>Best Seller</strong>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Link>    
            ) }    
        </div>
    }

    renderTop10CourseView() {
        return <div className="row-margin-top" style={{ backgroundColor: "#17a2b8", width: "195%", marginLeft: "-47%" }}>
            <Carousel>
                { this.chunk(this.state.top10CourseView, 4).map((items) =>
                    <Carousel.Item>
                        <div className="d-flex flex-wrap" style={{ justifyContent: "center" }}>
                            { items.map((item) =>
                                <Link class="p-2" to={`/details?id=${item.id}` }>
                                    <Card style={{ width: '18rem', marginTop: "2%", marginLeft: "2%", textAlign: "left" }}>
                                        <Card.Img variant="top" src="https://img-a.udemycdn.com/course/240x135/567828_67d0.jpg?aOSheI8E79KhllxbQda1eg1a6lT6i-WlEB_gSXpjQ-4BIwGR7zKNwLpJ2HmhEqtreyigHpKjGMwyAkWmS0yG9dWGhZBH8sRnRPBduXdI_Q2iKJD9tcoKn5fv5gur" />
                                        <Card.Body>
                                            <Card.Title>{ item.name }</Card.Title>
                                            <Card.Text>
                                                <div style={{ fontSize: "12px" }}>{ item.teacher.name }</div>
                                                <div style={{ fontSize: "20px", fontWeight: "bold", marginTop: "3%" }}>{item.price} VND</div>
                                                <div class="alert alert-warning" role="alert" style={{ marginTop: "3%", textAlign: "center" }}>
                                                    <strong>Top View</strong>
                                                </div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            )}
                        </div>
                    </Carousel.Item>
                )}
            </Carousel>
        </div >
    }

    renderTop10CourseNew() {
        return <div className="row-margin-top" style={{ backgroundColor: "#17a2b8", width: "195%", marginLeft: "-47%" }}>
            <Carousel>
                { this.chunk(this.state.top10CourseNew, 4).map((items) =>
                    <Carousel.Item>
                        <div className="d-flex flex-wrap" style={{ justifyContent: "center" }}>
                            { items.map((item) =>
                                <Link class="p-2" to={`/details?id=${item.id}` }>
                                    <Card style={{ width: '18rem', marginTop: "2%", marginLeft: "2%", textAlign: "left" }}>
                                        <Card.Img variant="top" src="https://img-a.udemycdn.com/course/240x135/567828_67d0.jpg?aOSheI8E79KhllxbQda1eg1a6lT6i-WlEB_gSXpjQ-4BIwGR7zKNwLpJ2HmhEqtreyigHpKjGMwyAkWmS0yG9dWGhZBH8sRnRPBduXdI_Q2iKJD9tcoKn5fv5gur" />
                                        <Card.Body>
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Text>
                                                <div style={{ fontSize: "12px" }}>{item.teacher.name}</div>
                                                <div style={{ fontSize: "20px", fontWeight: "bold", marginTop: "3%" }}>{item.price.toLocaleString()} VND</div>
                                                <div class="alert alert-warning" role="alert" style={{ marginTop: "3%", textAlign: "center" }}>
                                                    <strong>Newest</strong>
                                                </div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Link>
                            )}
                        </div>
                    </Carousel.Item>
                )}
            </Carousel>
        </div >
    }
}



const mapDispatchToProps = dispatch => {
    return {
        requestApiGetTop10CourseView: () => dispatch(requestApiGetTop10CourseView()),
        requestApiGetTop10CourseNew: () => dispatch(requestApiGetTop10CourseNew()),
        requestApiGetTopCategoryWeek: () => dispatch(requestApiGetTopCategoryWeek()),
        requestApiGetTopCourseWeek: () => dispatch(requestApiGetTopCourseWeek()),
    };
}

const mapStateToProps = state => ({
    top10CourseView: state.requestGetTop10CourseViewReducer,
    top10CourseNew: state.requestGetTop10CourseNewReducer,
    topCategoryWeek: state.requestGetTopCategoryWeekReducer,
    topCourseWeek: state.requestGetTopCourseWeekReducer
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
