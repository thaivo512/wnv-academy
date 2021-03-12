import React, { Component } from 'react';
import '../../assets/homepage.scss';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import NavBarComponent from '../../components/nav-bar';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Link} from 'react-router-dom';
import { Carousel, Card } from 'react-bootstrap';
import * as moment from 'moment'
import { Comment, Rate, Avatar, Form, Input, Button, Divider } from 'antd';



import {
    requestApiGetCourseDetail,
    requestApiGetCourseSimilar,
    requestApiGetSlidePreview,
    requestApiGetFeedback,
    requestApiPostFeedback,
    requestApiRemoveWatchlist,
    requestApiAddWatchlist,
    requestApiEnrolCourse,
    requestApiGetLessonPreivew
} from './redux/action';
import { toast } from 'react-toastify';

const { TextArea } = Input;


class DetailPage extends Component {
    constructor(props) {
        super(props);

        let params = queryString.parse(this.props.location.search)

        this.state = {
            course: null,
            coursesSimilar: [],
            slidesPreview: [],
            lessonsPreview: [],
            feedbacks: [],
            id: params.id || 0,
            comment: '',
            rate: 4
        }
    }

    componentDidMount() {
        this.props.requestApiGetCourseDetail(this.state.id);
        this.props.requestApiGetCourseSimilar(this.state.id);
        this.props.requestApiGetSlidePreview(this.state.id);
        this.props.requestApiGetFeedback(this.state.id);
        this.props.requestApiGetLessonPreivew(this.state.id);
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.location.search != this.props.location.search){

            let params = queryString.parse(this.props.location.search);
            this.setState({
                id: params.id || 0
            })

            this.props.requestApiGetCourseDetail(params.id || 0);
            this.props.requestApiGetCourseSimilar(params.id || 0);
            this.props.requestApiGetSlidePreview(params.id || 0);
            this.props.requestApiGetFeedback(params.id || 0);
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

        const slidePreviewResponse = this.props.slidePreviewResponse;
        if(slidePreviewResponse && slidePreviewResponse.is_success) {
            this.props.slidePreviewResponse.is_success = false;
            this.setState(
                {
                    slidesPreview: slidePreviewResponse.slides
                }
            )
        }  

        const feedbackResponse = this.props.feedbackResponse;
        if(feedbackResponse && feedbackResponse.is_success) {
            this.props.feedbackResponse.is_success = false;
            this.setState(
                {
                    feedbacks: feedbackResponse.data
                }
            )
        }  


        const postFeedbackResponse = this.props.postFeedbackResponse;
        if(postFeedbackResponse && postFeedbackResponse.is_success) {
            this.props.postFeedbackResponse.is_success = false;
            this.setState(
                {
                    comment: ''
                }
            )

            this.props.requestApiGetFeedback(this.state.id);
        }  

        const removeWatchlistResponse = this.props.removeWatchlistResponse;
        if(removeWatchlistResponse && removeWatchlistResponse.is_success) {
            this.props.removeWatchlistResponse.is_success = false;
            this.props.requestApiGetCourseDetail(this.state.id);
        }  

        const addWatchlistResponse = this.props.addWatchlistResponse;
        if(addWatchlistResponse && addWatchlistResponse.is_success) {
            this.props.addWatchlistResponse.is_success = false;
            this.props.requestApiGetCourseDetail(this.state.id);
        }  

        const enrolCourseResponse = this.props.enrolCourseResponse;
        if(enrolCourseResponse && enrolCourseResponse.is_success) {
            this.props.enrolCourseResponse.is_success = false;
            this.props.requestApiGetCourseDetail(this.state.id);
        }  
        

        const lessonPreviewResponse = this.props.lessonPreviewResponse;
        if(lessonPreviewResponse && lessonPreviewResponse.is_success) {
            this.props.lessonPreviewResponse.is_success = false;
            this.setState({
                lessonsPreview: lessonPreviewResponse.lessons
            })
        } 
    }

    onClickRemoveWatchlist = () => {
        this.props.requestApiRemoveWatchlist(this.state.id);
    }

    onClickAddWatchlist = () => {
        const isLogin = localStorage.getItem('is_success');
        if(!isLogin) {
            this.props.history.push('/login');
            return;
        }
        this.props.requestApiAddWatchlist(+this.state.id);
    }

    onClickEnrolCourse = () => {
        const isLogin = localStorage.getItem('is_success');
        if(!isLogin) {
            this.props.history.push('/login');
            return;
        }
        this.props.requestApiEnrolCourse(+this.state.id);
    }
    
    onSubmitFeedback = () => {
        if(!this.state.comment.trim()) return;

        const enroled = this.state.course.is_enrolled;
        if(!enroled) {
            toast.error(`Bạn chưa tham gia khóa học`);
            return;
        }

        this.props.requestApiPostFeedback({
            course_id: +this.state.id,
            review: this.state.comment,
            rate: this.state.rate
        });
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
                            !this.state.course? <div style={{ padding: '140px 0' }}>Not Found</div> :
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                                    <div style={{ flex: 1,}}>
                                        <img style={{ width: 'auto', height: '300px', marginBottom: 20 }}
                                            src={this.state.course.image_avatar}/>
                                        <div>
                                            { 
                                                this.state.course.is_watchlisted? 
                                                <Button danger onClick={this.onClickRemoveWatchlist}>Xóa khỏi Watchlist</Button>: 
                                                <Button onClick={this.onClickAddWatchlist}>Thêm vào Watchlist</Button>
                                                
                                            }
                                            <Divider type="vertical"/>
                                            {
                                                this.state.course.is_enrolled? 
                                                <Button type='primary' onClick={() => this.props.history.push(`/course?id=${this.state.course.id}`)}>Đi đến khóa học</Button> : 
                                                <Button type='primary' onClick={this.onClickEnrolCourse}>Đăng ký tham gia</Button>
                                            }
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'left', flex: 1 }}>
                                        <p style={{ fontSize: 23, color: 'teal', fontWeight: 'bold' }}>{this.state.course.name}</p>
                                        <p>{this.state.course.short_description}</p>
                                        <p>{!+this.state.course.total_feedback? 'Chưa có lượt đánh giá' :  
                                            <>
                                                {`${this.state.course.total_feedback} đánh giá: `} 
                                                <Rate value={+this.state.course.avg_feedback} disabled allowHalf/>     
                                            </> }
                                        </p>
                                        <p><span style={{ color: 'seagreen', fontWeight:'bold' }}>Danh mục: </span> {this.state.course.category.name}</p>
                                        <p><span style={{ color: 'seagreen', fontWeight:'bold' }}>Giảng viên: </span> {this.state.course.teacher.name}</p>
                                        <p><span style={{ color: 'seagreen', fontWeight:'bold' }}>Số lượng học viên: </span> {this.state.course.total_enrol}</p>
                                        <p><span style={{ color: 'seagreen', fontWeight:'bold' }}>Học phí: </span> {this.state.course.price}</p>
                                        <p style={{ color: 'red', fontWeight:'bold' }}><span style={{ color: 'seagreen', fontWeight:'bold' }}>Giá khuyến mãi: </span> {this.state.course.price_promote}</p>
                                        <p><span style={{ color: 'seagreen', fontWeight:'bold' }}>Lần cập nhật cuối: </span> {moment(new Date(+this.state.course.last_update)).format('DD/MM/YYYY HH:mm:ss') }</p>
                                    </div>
                                </div>
                                <div style={{ textAlign: "left" }}>
                                    <hr />
                                    <h5>Mô tả chi tiết:</h5>
                                    <p style={{ paddingLeft: 30 }} 
                                        dangerouslySetInnerHTML={{__html: this.state.course.detail_description}}></p>
                                </div>
                                <div style={{ textAlign: "left" }}>
                                    <hr />
                                    <h5>Đề cương khóa học:</h5>
                                    <p>{this.state.slidesPreview.map((item, index) => 
                                        <div style={{ paddingLeft: 30 }}>
                                            {
                                                item.is_allow_preview?
                                                <a href={item.file_url} target="_blank">
                                                    {index + 1}.  {item.slide_name} {item.file_name}
                                                </a>
                                                :
                                                <a>
                                                    {index + 1}.  {item.slide_name} {item.file_name}
                                                </a>
                                            }
                                        </div>
                                    )}</p>
                                </div><div style={{ textAlign: "left" }}>
                                    <hr />
                                    <h5>Bài giảng khóa học:</h5>
                                    <p>{this.state.lessonsPreview.map((item, index) => 
                                        <div style={{ paddingLeft: 30 }}>
                                            {
                                                <a>
                                                    {index + 1}.  {item.lesson_name}
                                                </a>
                                            }
                                        </div>
                                    )}</p>
                                </div>
                                <div style={{ textAlign: "left" }}>
                                    <hr />
                                    <h5>Phản hồi từ học viên:</h5>
                                    <div style={{ paddingLeft: 30 }}>
                                    <Comment
                                        avatar={ <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" /> }
                                        content={
                                            <>
                                                <Form.Item>
                                                    <Rate onChange={(value) => this.setState({ rate: value })} value={this.state.rate} />
                                                </Form.Item>
                                                <Form.Item> 
                                                    <TextArea rows={4} 
                                                        onChange={(e) => this.setState({comment: e.target.value})} 
                                                        value={this.state.comment} 
                                                        />
                                                </Form.Item>
                                                <Form.Item> 
                                                    <Button htmlType="submit" 
                                                        onClick={this.onSubmitFeedback} 
                                                        type="primary"> 
                                                            Gửi phản hồi 
                                                    </Button> 
                                                </Form.Item>
                                            </>    
                                        }
                                    />
                                        <div>
                                            {
                                                this.state.feedbacks.map(item => <div>
                                                    <Comment  author={item.user.name}
                                                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo"/>}
                                                        content={
                                                            <div>
                                                                <Rate disabled value={item.rate}/>
                                                                <div> {item.review} </div>
                                                            </div>
                                                        }
                                                        datetime={moment(new Date(+item.last_update)).format('DD/MM/YYYY HH:mm:ss') }
                                                    />
                                                </div>)
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div style={{ marginTop: 100 }}>
                                    <hr/>
                                    <h4>Khóa học cùng thể loại được đăng ký nhiều nhất</h4>
                                    <div style={{ marginTop: 20}}>
                                        <Carousel>
                                        { this.chunk(this.state.coursesSimilar, 5).map((items) =>
                                            <Carousel.Item>
                                                <div className="d-flex flex-wrap" style={{ justifyContent: "center" }}>
                                                    { items.map((item) =>
                                                        <Link class="p-2" to={`/details?id=${item.id}` }>
                                                            <Card style={{ width: '18rem', marginTop: "2%", marginLeft: "2%", textAlign: "left" }}>
                                                            <Card.Img variant="top" src={item.image_avatar} style={{ height: '200px' }} />
                                                                <Card.Body>
                                                                    <Card.Title>{item.name}</Card.Title>
                                                                    <Card.Text>
                                                                    <div style={{ fontSize: "15px" }}>Danh mục: {item.category.name}</div>
                                                            <div style={{ fontSize: "15px" }}>Giảng viên: {item.teacher.name}</div>
                                                            <div style={{ fontSize: "15px", color: "seagreen"}}>
                                                                {!+item.total_feedback? 
                                                                    'Chưa có lượt đánh giá' :  
                                                                    <>
                                                                    {`${item.total_feedback} đánh giá: `} <Rate value={+item.avg_feedback} disabled allowHalf/>
                                                                    </> 
                                                                } 
                                                            </div>
                                                            <div style={{ fontSize: "15px", marginTop: "3%", textDecoration: "line-through" }}>{item.price.toLocaleString()} VND</div>
                                                            <div style={{ fontSize: "20px", fontWeight: "bold", marginTop: "3%", color: "red"}}>{item.price_promote.toLocaleString()} VND</div>
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
        requestApiGetSlidePreview: (id) => dispatch(requestApiGetSlidePreview(id)),
        requestApiGetFeedback: (id) => dispatch(requestApiGetFeedback(id)),
        requestApiPostFeedback: (body) => dispatch(requestApiPostFeedback(body)),
        requestApiRemoveWatchlist: (id) => dispatch(requestApiRemoveWatchlist(id)),
        requestApiAddWatchlist: (id) => dispatch(requestApiAddWatchlist(id)),
        requestApiEnrolCourse: (id) => dispatch(requestApiEnrolCourse(id)),
        requestApiGetLessonPreivew: (id) => dispatch(requestApiGetLessonPreivew(id)),
    };
}

const mapStateToProps = state => ({
    courseResponse: state.requestGetCourseDetailReducer,
    coursesSimilarResponse: state.requestGetCourseSimilarReducer,
    slidePreviewResponse: state.requestGetSlidePreviewReducer,
    feedbackResponse: state.requestGetFeedbackReducer,
    postFeedbackResponse: state.requestPostFeedbackReducer,
    removeWatchlistResponse: state.requestRemoveWatchlistReducer,
    addWatchlistResponse: state.requestAddWatchlistReducer,
    enrolCourseResponse: state.requestEnrolCourseReducer,
    lessonPreviewResponse: state.requestGetLessonPreviewReducer
})

export default connect(mapStateToProps, mapDispatchToProps)(DetailPage)
