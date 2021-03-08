import React, { Component } from 'react';
import '../../assets/homepage.scss';
import NavBarComponent from '../../components/nav-bar';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { PageHeader, Modal, Button, Menu } from 'antd';
import { YoutubeOutlined, FileDoneOutlined } from '@ant-design/icons';
import ReactPlayer from 'react-player'



import {
    requestApiGetCourseLearning,
    requestApiGetSlideLearning,
    requestApiGetLessonLearning,
    requestApiMarkDoneLesson,
    requestApiTrackingLesson
} from './redux/action';


class LearningPage extends Component {
    constructor(props) {
        super(props);

        let params = queryString.parse(this.props.location.search);
        this.state = {
            id: +params.id || 0,
            course: null,
            slides: [],
            lessons: [],
            isShowSlide: false,
            lesson: null    
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
        
        const markDoneLessonResponse = this.props.markDoneLessonResponse;
        if(markDoneLessonResponse && markDoneLessonResponse.is_success) {
            this.props.markDoneLessonResponse.is_success = false;
            
            this.props.requestApiGetLessonLearning(this.state.id);
            this.setState(
                {
                    lesson: {
                        ...this.state.lesson,
                        is_done: true
                    }
                }
            )
        } 
    }

    onBackCourse = () => {
        this.props.history.push('/details?id=' + this.state.course.id);
    }

    onToggleSlide = () => {
        this.setState({
            isShowSlide: !this.state.isShowSlide
        })
    }

    onSelectLesson = (e) => {
        this.setState({
            lesson: e.item.props.context
        })
    }

    onDoneLesson = () => {
        this.props.requestApiMarkDoneLesson(this.state.lesson.id);
    }

    onTrackingLesson = (e) => {
        const curent = parseInt(e.playedSeconds);

        this.state.lessons.filter(x => x.id == this.state.lesson.id)
                        .forEach(item => item.progress_time = curent);

        this.props.requestApiTrackingLesson({
            lesson_id: this.state.lesson.id,
            process_time: curent
        })
    }

    ref = player => {
        this.player = player;
    }

    onStartVideo = () => {
        this.player.seekTo(this.state.lesson.progress_time || 0 , 'seconds');
    }


    render() {
        return (
            <>
                <div>
                    <div>
                        {
                            !this.state.course? 
                            <div>
                                 <NavBarComponent />
                                 <div style={{ paddingTop: 200 }}> Not Found </div>
                            </div>
                            :
                            <div>
                               <PageHeader className="site-page-header-responsive"
                                    onBack={this.onBackCourse} title={this.state.course.name}
                                    extra={<Button type="primary" onClick={this.onToggleSlide}>Tài liệu môn học</Button>}
                                />
                                <Modal title="Tài liệu được sử dụng trong khóa học" footer={null}
                                    visible={this.state.isShowSlide} onCancel={this.onToggleSlide}>
                                    {
                                        this.state.slides.map((item, i) => 
                                            <div style={{ fontSize: "15px", padding: 10}}>
                                                <a href={item.file_url} target="_blank">{item.file_name}</a>
                                            </div>
                                        )
                                    }
                                </Modal>
                               
                                <div style={{ display: 'flex', alignItems: 'left', justifyContent: 'left' }}>
                                    <div style={{ }}>
                                        <Menu mode="inline"
                                            onClick={this.onSelectLesson}
                                            style={{  minHeight: 570 }}>
                                            {
                                                this.state.lessons.map(item => 
                                                    <Menu.Item key={item.id}
                                                        context={item}
                                                        icon={item.is_done? 
                                                        <FileDoneOutlined style={{ color: 'green' }}/> : 
                                                        <YoutubeOutlined style={{ color: 'red' }}/>}>
                                                        {item.lesson_name}
                                                    </Menu.Item>
                                                )
                                            }
                                        </Menu>
                                    </div>

                                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                    {
                                        this.state.lesson &&
                                        <div>
                                            <h5>{this.state.lesson.lesson_name}</h5>
                                            <hr style={{ marginBottom: 30 }}/>
                                            

                                            <ReactPlayer
                                                ref={this.ref}
                                                playing
                                                onStart={this.onStartVideo}
                                                controls="true"
                                                className='react-player'
                                                progressInterval="10000"
                                                onProgress={this.onTrackingLesson}
                                                url={this.state.lesson.file_url}
                                                />
                                            
                                            {
                                                !this.state.lesson.is_done &&
                                                <Button type="primary"
                                                    onClick={this.onDoneLesson}
                                                    style={{ marginTop: 20 }}>
                                                    Đánh dấu hoàn thành
                                                </Button>
                                            }
                                        </div>
                                    }
                                    </div>
                                </div>
                                
                            </div>
                        }
                    </div>

                </div>
            </>
        )
    }

}



const mapDispatchToProps = dispatch => {
    return {
        requestApiGetCourseLearning: (id) => dispatch(requestApiGetCourseLearning(id)),
        requestApiGetSlideLearning: (id) => dispatch(requestApiGetSlideLearning(id)),
        requestApiGetLessonLearning: (id) => dispatch(requestApiGetLessonLearning(id)),
        requestApiMarkDoneLesson: (id) => dispatch(requestApiMarkDoneLesson(id)),
        requestApiTrackingLesson: (body) => dispatch(requestApiTrackingLesson(body))
    };
}

const mapStateToProps = state => ({
    courseLearningResponse : state.requestGetCourseLearningReducer,
    slideLearningResponse : state.requestGetSlideLearningReducer,
    lessonLearningResponse : state.requestGetLessonLearningReducer,
    markDoneLessonResponse : state.requestMarkDoneLessonReducer,
})

export default connect(mapStateToProps, mapDispatchToProps)(LearningPage)
