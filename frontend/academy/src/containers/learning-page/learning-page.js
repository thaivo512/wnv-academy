import React, { Component } from 'react';
import '../../assets/homepage.scss';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import NavBarComponent from '../../components/nav-bar';
import { connect } from 'react-redux';
import queryString from 'query-string';


import {
    requestApiGetCourseLearning,
    requestApiGetSlideLearning,
    requestApiGetLessonLearning
} from './redux/action';


class LearningPage extends Component {
    constructor(props) {
        super(props);

        let params = queryString.parse(this.props.location.search);
        this.state = {
            id: +params.id || 0,
            course: null,
            slides: [],
            lessons: []    
        }
    }

    componentDidMount() {
        this.props.requestApiGetCourseLearning(this.state.id);
        this.props.requestApiGetSlideLearning(this.state.id);
        this.props.requestApiGetLessonLearning(this.state.id);
    }

    componentDidUpdate(prevProps, prevState) {     

        const courseLearningResponse = this.props.courseLearningResponse;
        if(courseLearningResponse && courseLearningResponse.is_success) {
            this.props.courseLearningResponse.is_success = false;
            this.setState(
                {
                    course: courseLearningResponse.data
                }
            )
        }  

        const slideLearningResponse = this.props.slideLearningResponse;
        if(slideLearningResponse && slideLearningResponse.is_success) {
            this.props.slideLearningResponse.is_success = false;
            this.setState(
                {
                    slides: slideLearningResponse.slides
                }
            )
        }  

        
        const lessonLearningResponse = this.props.lessonLearningResponse;
        if(lessonLearningResponse && lessonLearningResponse.is_success) {
            this.props.lessonLearningResponse.is_success = false;
            this.setState(
                {
                    lessons: lessonLearningResponse.lessons
                }
            )
        }  
    }

    render() {
        return (
            <>
                <NavBarComponent />
                <div>

                    <div style={{ padding: 25 }}>
                        {
                            !this.state.course? 
                            <div style={{ padding: '140px 0' }}>Not Found</div> :
                            <div>
                               <div>{JSON.stringify(this.state.course)}</div>
                               <div>{JSON.stringify(this.state.slides)}</div>
                               <div>{JSON.stringify(this.state.lessons)}</div>
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
        requestApiGetCourseLearning: (id) => dispatch(requestApiGetCourseLearning(id)),
        requestApiGetSlideLearning: (id) => dispatch(requestApiGetSlideLearning(id)),
        requestApiGetLessonLearning: (id) => dispatch(requestApiGetLessonLearning(id)),
    };
}

const mapStateToProps = state => ({
    courseLearningResponse : state.requestGetCourseLearningReducer,
    slideLearningResponse : state.requestGetSlideLearningReducer,
    lessonLearningResponse : state.requestGetLessonLearningReducer
})

export default connect(mapStateToProps, mapDispatchToProps)(LearningPage)
