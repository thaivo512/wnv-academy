import React, { Component } from 'react';
import '../../assets/homepage.scss';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import NavBarComponent from '../../components/nav-bar';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Pagination } from 'antd';
import { withRouter } from 'react-router-dom';


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
                <div className="home-page-container">
                    <div>
                        {
                            this.state.courses.map(item => 
                            <div style={{ border:"1px solid #000", margin:10, padding:10 }}>
                                <p>{item.name}</p>
                                <p>{item.price}</p>
                            </div>)
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
