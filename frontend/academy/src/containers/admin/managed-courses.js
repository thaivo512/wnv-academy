import React, { Component } from 'react';
import '../../assets/admin.scss';
import { Row, Col, Button, Table, Pagination, InputGroup, FormControl, Form } from 'react-bootstrap';
import { FaSearch, FaTrash, FaArrowLeft, FaPlay, FaDownload } from 'react-icons/fa';
import { connect } from 'react-redux';
import { requestApiGetAllSlides, requestApiGetAllLessons, requestApiGetAllFeedbacks } from '../teacher/redux/action';
import { requestApiGetAllCoursesAdmin } from './redux/action';
import { Editor } from '@tinymce/tinymce-react';
import EsolModal from '../../components/modal';

class CoursesManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            courseData: [],
            originCourseData: [],
            isGetLesson: false,
            isGetSlides: false,
            isPreviewMode: false,
            isGetCourses: true,
            isShowCourseDetail: false,
            lessons: [],
            slides: [],
            pageIndex: 0,
            pageNumber: 13,
            selectedCourse: {}
        }
    }

    componentDidMount() {
        this.props.requestApiGetAllCoursesAdmin();
    }

    componentDidUpdate() {
        var { isGetCourses, selectedCourse, isGetLesson, isGetSlides, originCourseData } = this.state;
        if (isGetCourses) {
            this.props.requestApiGetAllCoursesAdmin();
        }

        if (isGetLesson) {
            this.props.requestApiGetAllLessons(selectedCourse.id);
        }

        if (isGetSlides) {
            this.props.requestApiGetAllSlides(selectedCourse.id);
        }

        if (isGetCourses && JSON.stringify(this.props.allCourses) != JSON.stringify({})
            && originCourseData.length != this.props.allCourses.filter(x => x.status == 'PUBLIC').length) {
            for (let item of this.props.allCourses.filter(x => x.status == 'PUBLIC').sort(x => x.id)) {
                originCourseData.push({
                    course: item,
                    search_term: JSON.stringify({ a: item.teacher.name, b: item.name })
                })
            }
            this.setState({ courseData: originCourseData, originCourseData: originCourseData, isGetCourses: false });
        }

        if (isGetLesson && JSON.stringify(this.props.allLessons) != JSON.stringify({}) && selectedCourse.id != this.props.allLessons[0].id) {
            this.setState({
                lessons: this.props.allLessons,
                isGetLesson: false
            })
        }


        if (isGetSlides && JSON.stringify(this.props.allSlides) != JSON.stringify({}) && selectedCourse.id != this.props.allSlides[0].id) {
            this.setState({
                slides: this.props.allLessons,
                isGetSlides: false
            })
        }
    }

    render() {
        var { isShowCourseDetail, isPreviewMode } = this.state;
        return (
            <>
                <EsolModal isShow={isPreviewMode}
                    title="Preview Video"
                    onHide={() => this.onHidePreviewVideo()}
                    body={this.onRenderBodyPreviewVideo()}
                    size="lg" />
                <div className="managed-teacher-container">
                    {isShowCourseDetail ?
                        <>
                            <Row>
                                <Col className="col-3">
                                    <h3>Course details</h3>
                                </Col>
                                <Col className="col-9" style={{ textAlign: "right" }}>
                                    <FaArrowLeft onClick={() => this.onShowCourseDetail({})} className="button-icon" /> :
                            </Col>
                            </Row>
                            <Row>
                                {this.onRenderCourseDetails()}
                            </Row>
                        </> :
                        <>
                            <Row>
                                <Col className="col-3">
                                    <h3>Courses Management</h3>
                                </Col>
                                <Col className="col-9">
                                    <InputGroup className="mb-3">
                                        <FormControl type="text" placeholder="Search" onChange={(e) => this.onSearching(e.target.value)} />
                                    </InputGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Table striped bordered hover style={{ textAlign: "center" }}>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Teacher</th>
                                            <th>Price</th>
                                            <th>Detail</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.onRenderBodyTable()}
                                    </tbody>
                                </Table>
                            </Row>
                            <Row>
                                {this.renderPagination()}
                            </Row>
                        </>
                    }
                </div>
            </>
        )
    }

    onSearching(value) {
        var { originCourseData } = this.state;
        var courseData = originCourseData.filter(x => x.search_term.toLowerCase().includes(value.toLowerCase()))
        this.setState({ courseData: courseData })
    }

    onRenderBodyTable() {
        var { pageIndex, courseData, pageNumber } = this.state;
        var courses = courseData.slice(pageIndex * pageNumber, pageIndex * pageNumber + pageNumber);
        var elements = [];
        for (let temp of courses) {
            let item = temp.course
            elements.push(
                <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.teacher.name}</td>
                    <td>{item.price}</td>
                    <td>
                        <FaSearch onClick={() => this.onShowCourseDetail(item)} className="button-icon" style={{ marginRight: "3%", color: "green" }} />
                    </td>
                    <td>
                        <FaTrash className="button-icon" style={{ marginRight: "3%", color: "red" }} />
                    </td>
                </tr>)
        }

        return elements;
    }

    renderPagination() {
        var { pageIndex, courseData, pageNumber } = this.state;
        var elements = [];
        var totalPages = parseInt(courseData.length / pageNumber);
        var pageNumber = courseData.length % pageNumber != 0 ? totalPages + 1 : totalPages;
        for (let i = 0; i < pageNumber; i++) {
            if (pageIndex == i) {
                elements.push(<Pagination.Item active>{i}</Pagination.Item>)
            }
            else {
                elements.push(<Pagination.Item onClick={() => this.onSelectPage(i)}>{i}</Pagination.Item>)
            }
        }

        return (
            totalPages == 0 ? <></> :
                <Pagination size="lg">
                    {elements}
                </Pagination >
        )
    }

    onSelectPage(pageIndex) {
        this.setState({ pageIndex: pageIndex })
    }

    onShowCourseDetail(course) {
        var { isShowCourseDetail } = this.state;
        this.setState(
            {
                isShowCourseDetail: !isShowCourseDetail,
                isGetLesson: true,
                isGetSlides: true,
                selectedCourse: course
            })
    }

    onRenderCourseDetails() {
        var { selectedCourse } = this.state;
        return (
            <div style={{ overflowY: 'scroll', height: '80vh' }}>
                <Row >
                    <Col className="col-5" style={{ left: "3%" }}>
                        <img style={{ width: "95%", height: "60vh" }} src={selectedCourse.image_avatar} />
                    </Col>
                    <Col>
                        <div className="add-course-container">
                            <Row>
                                <Form.Group >
                                    <Form.Label>Course Name </Form.Label>
                                    <Form.Control style={{ width: "97%" }} type="text" disabled value={selectedCourse.name} />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Col className="col-4">
                                    <Form.Group>
                                        <Form.Label>Status</Form.Label>
                                        <Form.Control style={{ width: "90%" }} type="text" disabled value={selectedCourse.status} />
                                    </Form.Group>
                                </Col>
                                <Col className="col-4">
                                    <Form.Group>
                                        <Form.Label>Teacher</Form.Label>
                                        <Form.Control style={{ width: "90%" }} type="text" disabled value={selectedCourse.teacher.name} />
                                    </Form.Group>
                                </Col>
                                <Col className="col-4">
                                    <Form.Group>
                                        <Form.Label>Rates</Form.Label>
                                        <Row>
                                            {this.renderStars(selectedCourse.avg_feedbacks)}
                                        </Row>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-4">
                                    <Form.Group>
                                        <Form.Label>Price (VND)</Form.Label>
                                        <Form.Control style={{ width: "90%" }} type="text" disabled value={selectedCourse.price} />
                                    </Form.Group>
                                </Col>
                                <Col className="col-4">
                                    <Form.Group>
                                        <Form.Label>Promote Rate (%)</Form.Label>
                                        <Form.Control style={{ width: "90%" }} type="text" disabled value={((selectedCourse.price - selectedCourse.price_promote) / selectedCourse.price) * 100} />
                                    </Form.Group>
                                </Col>
                                <Col className="col-4">
                                    <Form.Group>
                                        <Form.Label>Category</Form.Label>
                                        <Form.Control style={{ width: "90%" }} type="text" disabled value={selectedCourse.category.name} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="col-4">
                                    <Form.Group>
                                        <Form.Label>Views</Form.Label>
                                        <Form.Control style={{ width: "90%" }} type="text" disabled value={selectedCourse.view_count} />
                                    </Form.Group>
                                </Col>
                                <Col className="col-4">
                                    <Form.Group>
                                        <Form.Label>Erols</Form.Label>
                                        <Form.Control style={{ width: "90%" }} type="text" disabled value={selectedCourse.total_enrol} />
                                    </Form.Group>
                                </Col>
                                <Col className="col-4">
                                    <Form.Group>
                                        <Form.Label>Feedbacks</Form.Label>
                                        <Form.Control style={{ width: "90%" }} type="text" disabled value={selectedCourse.total_feedback} />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Form.Group style={{ width: "97%", marginLeft: "0%" }}>
                                    <Form.Label>Short Description</Form.Label>
                                    <Form.Control style={{ height: "30vh" }} as="textarea" disabled value={selectedCourse.short_description} />
                                </Form.Group>
                            </Row>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Form.Group style={{ width: "97%", marginLeft: "0%" }}>
                        <Form.Label>Description</Form.Label>
                        <Editor
                            apiKey='vnv0h8lv17ek5lg9pci17owmqylg8xnvucvdc5d8hkgqbhwr'
                            value={selectedCourse.detail_description}
                            disabled
                            init={{
                                height: 300,
                                menubar: true,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar: 'undo redo | formatselect | bold italic backcolor | \
                                    alignleft aligncalignright alignjustify | \
                                    bullist numlist outdent indent | removeformat | help'
                            }}
                        />
                    </Form.Group>
                    <Form.Group style={{ width: "97%", marginLeft: "0%" }}>
                        <Form.Label>Lessons</Form.Label>
                        <div className="table-wrapper-scroll-y my-custom-scrollbar" style={{ maxHeight: "30vh" }}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th><div>Name</div></th>
                                        <th><div>File Name</div></th>
                                        <th><div>Preview</div></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderBodyLessonTable()}
                                </tbody>
                            </Table>
                        </div>
                    </Form.Group>
                    <Form.Group style={{ width: "97%", marginLeft: "0%" }}>
                        <Form.Label>Slides</Form.Label>
                        <div className="table-wrapper-scroll-y my-custom-scrollbar" style={{ maxHeight: "30vh" }}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th><div>Name</div></th>
                                        <th><div>Is preview</div></th>
                                        <th><div>Download</div></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderBodySlidesTable()}
                                </tbody>
                            </Table>
                        </div>
                    </Form.Group>
                </Row>
            </div >
        )
    }

    renderBodyLessonTable() {
        var elements = []
        var lessons = this.props.allLessons && this.props.allLessons.length > 0 ? this.props.allLessons : [];
        for (let item of lessons) {
            elements.push(
                <tr style={{ textAlign: "left" }}>
                    <td>{item.lesson_name}</td>
                    <td>{item.file_name}</td>
                    <td><FaPlay className="button-icon" style={{ color: "blueviolet", width: "20px", height: "20px" }} onClick={() => this.onPreviewVideo(item.file_url)} /></td>
                </tr>
            )
        }
        return elements;
    }

    renderBodySlidesTable() {
        var elements = []
        var slides = this.props.allSlides && this.props.allSlides.length > 0 ? this.props.allSlides : [];
        for (let item of slides) {
            elements.push(
                <tr style={{ textAlign: "left" }}>
                    <td>{item.slide_name}</td>
                    <td>{item.is_allow_preview ? "True" : "False"}</td>
                    <td><FaDownload variant="info" className="button-icon" s onClick={() => this.onDownloadFile(item.file_url)} /></td>
                </tr>
            )
        }
        return elements;
    }

    onDownloadFile(url) {
        window.open(url);
    }

    onPreviewVideo(url) {
        this.setState({ isPreviewMode: true, selectedVideoUrl: url })
    }

    onHidePreviewVideo() {
        this.setState({ isPreviewMode: false })
    }

    onRenderBodyPreviewVideo() {
        var { selectedVideoUrl } = this.state;
        return <>
            <Row>
                <Col className="col-4">
                    <FaArrowLeft className="button-icon" onClick={() => this.onPreviewVideo()} />
                </Col>
                <Col style={{ textAlign: "left" }}>
                    <h3>Preview Video</h3>
                </Col>
            </Row>
            { selectedVideoUrl == "" ? <></> :
                <div style={{ marginTop: "5%" }}>
                    <iframe style={{ width: "100%", height: "60vh" }} src={selectedVideoUrl}
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                    </iframe>
                </div>
            }
        </>
    }

    renderStars(avg_feedbacks) {
        var elements = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= avg_feedbacks) {
                elements.push(
                    <span style={{ fontSize: "30px" }} class="fa fa-star checked"></span>
                )
            }
            else {
                elements.push(<span style={{ fontSize: "30px" }} class="fa fa-star"></span>)
            }
        }

        return elements;
    }
}


const mapDispatchToProps = dispatch => {
    return {
        requestApiGetAllCoursesAdmin: () => dispatch(requestApiGetAllCoursesAdmin()),
        requestApiGetAllSlides: (id) => dispatch(requestApiGetAllSlides(id)),
        requestApiGetAllLessons: (id) => dispatch(requestApiGetAllLessons(id)),
        requestApiGetAllFeedbacks: (id) => dispatch(requestApiGetAllFeedbacks(id))
    };
}

const mapStateToProps = state => ({
    allCourses: state.requestGetAllCoursesAdminReducer,
    allSlides: state.requestGetAllSlidesReducer,
    allLessons: state.requestGetAllLessonsReducer,
    allFeedbacks: state.requestGetAllFeedbacksReducer,
})

export default connect(mapStateToProps, mapDispatchToProps)(CoursesManagement)
