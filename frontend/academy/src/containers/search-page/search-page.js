import React, { Component } from 'react';
import '../../assets/homepage.scss';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import NavBarComponent from '../../components/nav-bar';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Pagination } from 'antd';
import { withRouter } from 'react-router-dom';

import { Link} from 'react-router-dom';
import { Card } from 'react-bootstrap';

import {
    requestApiSearchCourse
} from './redux/action';



class SearchPage extends Component {
    constructor(props) {
        super(props);

        let params = queryString.parse(this.props.location.search)

        this.state = {
            courses: [],
            page: params.page || 1,
            category: params.category || '',
            q: params.q || '',
            total: 0,
            size: 20
        }
    }

    componentDidMount() {
        this.props.requestApiSearchCourse({
            page: this.state.page,
            category: this.state.category,
            q: this.state.q,
            size: this.state.size
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.location.search != this.props.location.search){

            let params = queryString.parse(this.props.location.search);
            this.setState({
                page: params.page || 1,
                category: params.category || '',
                q: params.q || '',
            })

            this.props.requestApiSearchCourse({
                page: params.page || 1,
                category: params.category || '',
                q: params.q || '',
                size: this.state.size
            });
        }

        const searchResponse = this.props.searchResponse;
        if(searchResponse && searchResponse.is_success){
            this.props.searchResponse.is_success = false;
            this.setState(
                {
                    courses: searchResponse.data,
                    total: searchResponse.total,
                }
            )
        }  
    }

    onChangePage = (page, pageSize) => {
        this.props.history.push(`/search?page=${page}&category=${this.state.category}&q=${this.state.q}`);
    }


    render() {
        return (
            <>
                <NavBarComponent />
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {
                            this.state.courses.map(item => 
                                <div className="d-flex flex-wrap" style={{ justifyContent: "center" }}>
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
                                </div>
                            )
                        }
                    </div>

                    <Pagination
                        style={{ marginTop:30 }}
                        pageSize={this.state.size}
                        onChange={this.onChangePage}
                        total={this.state.total} 
                        current={this.state.page - 1 + 1} />
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
        requestApiSearchCourse: (params) => dispatch(requestApiSearchCourse(params))
    };
}

const mapStateToProps = state => ({
    searchResponse: state.requestSearchCourseReducer
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchPage))
