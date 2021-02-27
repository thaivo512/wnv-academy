import React, { Component } from 'react';
import '../../assets/homepage.scss';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import NavBarComponent from '../../components/nav-bar';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Link} from 'react-router-dom';
import { Carousel, Card } from 'react-bootstrap';



import {
    requestApiGetCourseDetail,
    requestApiGetCourseSimilar
} from './redux/action';



class DetailPage extends Component {
    constructor(props) {
        super(props);

        let params = queryString.parse(this.props.location.search)

        this.state = {
            course: null,
            coursesSimilar: [],
            id: params.id || 0
        }
    }

    componentDidMount() {
        this.props.requestApiGetCourseDetail(this.state.id);
        this.props.requestApiGetCourseSimilar(this.state.id);
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.location.search != this.props.location.search){

            let params = queryString.parse(this.props.location.search);
            this.setState({
                id: params.id || 0
            })

            this.props.requestApiGetCourseDetail(params.id || 0);
            this.props.requestApiGetCourseSimilar(params.id || 0);
            window.scrollTo(0, 0)
        }


        const courseResponse = this.props.courseResponse;
        if(courseResponse && courseResponse.is_success) {
            this.props.courseResponse.is_success = false;
            this.setState(
                {
                    course: courseResponse.data
                }
            )
        }  
        


        const coursesSimilarResponse = this.props.coursesSimilarResponse;
        if(coursesSimilarResponse && coursesSimilarResponse.is_success) {
            this.props.coursesSimilarResponse.is_success = false;
            this.setState(
                {
                    coursesSimilar: coursesSimilarResponse.data
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
                <div>

                    <div style={{ padding: 25 }}>
                        {
                            !this.state.course? <div>Not Found</div> :
                            <div>
                                <div>
                                    <p>Course Name: {this.state.course.name}</p>
                                    <p>Course Price: {this.state.course.price}</p>
                                </div>

                                <div style={{ marginTop: 100 }}>
                                    <hr/>
                                    <h4>Similar Courses</h4>
                                    <div style={{ marginTop: 20}}>
                                        <Carousel>
                                        { this.chunk(this.state.coursesSimilar, 4).map((items) =>
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
                                                                    </Card.Text>
                                                                </Card.Body>
                                                            </Card>
                                                        </Link>
                                                    )}
                                                </div>
                                            </Carousel.Item>
                                        )}
                                        </Carousel>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

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

}



const mapDispatchToProps = dispatch => {
    return {
        requestApiGetCourseDetail: (id) => dispatch(requestApiGetCourseDetail(id)),
        requestApiGetCourseSimilar: (id) => dispatch(requestApiGetCourseSimilar(id)),
    };
}

const mapStateToProps = state => ({
    courseResponse: state.requestGetCourseDetailReducer,
    coursesSimilarResponse: state.requestGetCourseSimilarReducer
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage)
