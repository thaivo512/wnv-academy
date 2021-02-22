import React, { Component } from 'react';
import '../../assets/admin.scss';
import { Card, Button, Row, Col, Table } from 'react-bootstrap';
import { FaEdit, FaTrash, FaCheck, FaPlay, FaArrowLeft } from 'react-icons/fa';
import { Editor } from "react-draft-wysiwyg";
import EsolModal from '../../components/modal';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { connect } from 'react-redux';
import {
    requestApiGetAllCourses, requestApiGetAllSlides,
    requestApiGetAllLessons, requestApiGetAllFeedbacks
} from './redux/action';

class ManagedCourses extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isGetCourses: true,
            isShowModalSlide: false,
            isShowModalLesson: false,
            isShowModalFeedBack: false,
            isEditingMode: false,
            isPreviewMode: false,
            selectedVideoUrl: "",
            shortDetail: EditorState.createEmpty(),
            detailDes: EditorState.createEmpty(),
            feedbacks: [],
            selected_course: {},
            courses: []
        }
    }

    componentDidMount() {
        this.props.requestApiGetAllCourses();
    }

    componentDidUpdate() {
        var { isGetCourses } = this.state;
        if (isGetCourses) {
            this.setState({ courses: this.props.allCourses, isGetCourses: false })
        }
    }

    render() {
        return (
            <div className="managed-teacher-container">
                <Row>
                    <Col>
                        <h3 className="title-page-admin">Courses Management</h3>
                    </Col>
                </Row>
                <br></br>
                <Row>
                    <Col className="col-3" style={{ overflowY: 'scroll', height: '80vh' }}>
                        {this.onRenderListCourses()}
                    </Col>
                    <Col>
                        {this.onShowCoursesDetail()}
                    </Col>
                </Row>
            </div>
        )
    }

    onRenderListCourses() {
        var elements = [];
        var courses = this.state.courses;
        for (let item of courses) {
            let className = "md-2 " + item.status;
            elements.push(
                <Card onClick={() => this.onSelectedCourse(item)} style={{ width: '95%', marginBottom: "1%" }} className="button-icon">
                    <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Subtitle className={className}>{item.status}</Card.Subtitle>
                    </Card.Body>
                </Card>
            )
        }

        return elements;
    }

    onSelectedCourse(course) {
        this.props.requestApiGetAllSlides(course.id);
        this.props.requestApiGetAllLessons(course.id);
        this.props.requestApiGetAllFeedbacks(course.id);
        this.setState({
            selected_course: course,
            shortDetail: EditorState.createWithContent(ContentState.createFromText(course.short_description)),
            detailDes: EditorState.createWithContent(ContentState.createFromText(course.detail_description))
        })
    }

    onEditPage() {
        var { isEditingMode } = this.state;
        this.setState({ isEditingMode: !isEditingMode })
    }

    onChangeNameCourse(value) {
        var { selected_course } = this.state;
        selected_course.name = value;
        this.setState({ selected_course: selected_course })
    }

    onChangePrice(value) {
        var { selected_course } = this.state;
        selected_course.price = value;
        this.setState({ selected_course: selected_course })
    }

    onEditorShortDetailStateChange = (editorState) => {
        this.setState({
            shortDetail: editorState,
        });
    }

    onEditorDetailStateChange = (editorState) => {
        this.setState({
            detailDes: editorState,
        });
    }

    onShowManagedLesson() {
        var { isShowModalLesson } = this.state;
        this.setState({ isShowModalLesson: !isShowModalLesson })
    }

    onShowViewFeedBack() {
        var { isShowModalFeedBack } = this.state;
        this.setState({ isShowModalFeedBack: !isShowModalFeedBack })
    }

    onShowCoursesDetail() {
        var { isEditingMode, selected_course, isShowModalSlide, isShowModalLesson, isShowModalFeedBack } = this.state;
        var className = "md-2 ";
        var isPublic = false;
        if (selected_course != null) {
            className += selected_course.status;
            isPublic = selected_course.status == "PUBLIC" ? true : false;
        }
        return <>
            <EsolModal isShow={isShowModalSlide}
                title="Managed Slide"
                onHide={() => this.onShowOrCloseModalSlide()}
                body={this.renderManagedSlide(isPublic)}
                size="lg" />
            <EsolModal isShow={isShowModalLesson}
                title="Managed Lesson"
                onHide={() => this.onShowManagedLesson()}
                body={this.renderManagedLesson(isPublic)}
                size="lg" />
            <EsolModal isShow={isShowModalFeedBack}
                title="View Feedback"
                onHide={() => this.onShowViewFeedBack()}
                body={this.renderViewFeedBack(isPublic)}
                size="lg" />
            {selected_course == null ?
                <div style={{ textAlign: "center" }}>
                    <h4>Select Courses To See Detail</h4>
                </div> :
                <div style={{ marginLeft: "1%", overflowY: 'scroll', height: '80vh' }} >
                    <Row>
                        <Card style={{ width: '95%', marginBottom: "1%" }}>
                            <div style={{ textAlign: "center" }}>
                                {isEditingMode ?
                                    <input onChange={(e) => this.onChangeNameCourse(e.target.value)} type="text" class="form-control" value={selected_course.name} /> :
                                    <h2><strong>{selected_course.name}</strong></h2>
                                }
                            </div>
                            <Card.Body>
                                <Row>
                                    <Col className="col-5">
                                        <Card.Img style={{ width: "350px", height: "250px" }} src={selected_course.image_avatar} />
                                    </Col>
                                    <Col className="col-7">
                                        <Row style={{ textAlign: "left" }}>
                                            <Col className="col-3">Status:</Col>
                                            <Col className="col-4">
                                                <Card.Title className={className} style={{ textAlign: "left", marginLeft: "5%" }}>
                                                    {selected_course.status}
                                                </Card.Title>
                                            </Col>
                                            <Col>
                                                {isPublic ? <></> :
                                                    <div style={{ textAlign: "right" }}>
                                                        {isEditingMode ?
                                                            <FaCheck onClick={() => this.onEditPage()} style={{ width: "30px", height: "30px", marginRight: "10%" }} className="button-icon" /> :
                                                            <FaEdit onClick={() => this.onEditPage()} style={{ width: "30px", height: "30px", marginRight: "10%" }} className="button-icon" />
                                                        }
                                                    </div>
                                                }
                                            </Col>
                                        </Row>
                                        <Row style={{ textAlign: "left" }}>
                                            <Col className="col-3">Price:</Col>
                                            <Col className="col-4">
                                                <Card.Title style={{ textAlign: "left", marginLeft: "5%" }}>
                                                    {isEditingMode ?
                                                        <input onChange={(e) => this.onChangePrice(e.target.value)} type="text" class="form-control" value={selected_course.price} /> :
                                                        selected_course.price
                                                    }
                                                </Card.Title>
                                            </Col>
                                        </Row>
                                        <Row style={{ textAlign: "left" }}>
                                            <Col className="col-3">Vews:</Col>
                                            <Col className="col-4">
                                                <Card.Title style={{ textAlign: "left", marginLeft: "5%" }}>
                                                    {selected_course.view_count}
                                                </Card.Title>
                                            </Col>
                                        </Row>
                                        <Row style={{ textAlign: "left" }}>
                                            <Col className="col-3">Erols:</Col>
                                            <Col className="col-4">
                                                <Card.Title style={{ textAlign: "left", marginLeft: "5%" }}>
                                                    {selected_course.total_erol}
                                                </Card.Title>
                                            </Col>
                                        </Row>
                                        <Row style={{ textAlign: "left" }}>
                                            <Col className="col-3">Feedback:</Col>
                                            <Col className="col-4">
                                                <Card.Title style={{ textAlign: "left", marginLeft: "5%" }}>
                                                    {selected_course.total_feedback}
                                                </Card.Title>
                                            </Col>
                                        </Row>
                                        <Row style={{ textAlign: "left" }}>
                                            <Col className="col-3">Type:</Col>
                                            <Col className="col-5">
                                                <Card.Title style={{ textAlign: "left", marginLeft: "5%" }}>
                                                    {selected_course.type}
                                                </Card.Title>
                                            </Col>
                                        </Row>
                                        <Row style={{ textAlign: "left" }}>
                                            <Col className="col-4">
                                                <Card.Title>
                                                    {this.renderStars(selected_course.avg_feedback)}
                                                </Card.Title>
                                            </Col>
                                        </Row>
                                        <Button style={{ width: "30%", fontSize: "12px" }} onClick={() => this.onShowOrCloseModalSlide()} variant="primary">View Slide</Button>
                                        <Button style={{ width: "30%", fontSize: "12px" }} onClick={() => this.onShowManagedLesson()} variant="primary">View Lesson</Button>
                                        <Button style={{ width: "30%", fontSize: "12px" }} onClick={() => this.onShowViewFeedBack()} variant="primary">View FeedBack</Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '95%', marginBottom: "1%" }}>
                            <Card.Body>
                                <Card.Title>
                                    Short Detail
                                </Card.Title>
                                <Card.Text>
                                    {isEditingMode ?
                                        <Editor
                                            EditorState={this.state.shortDetail}
                                            toolbarClassName="toolbarClassName"
                                            wrapperClassName="wrapperClassName"
                                            editorClassName="editorClassName"
                                            onEditorStateChange={this.onEditorShortDetailStateChange}
                                        /> :
                                        draftToHtml(convertToRaw(this.state.shortDetail.getCurrentContent()))
                                    }
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card style={{ width: '95%', marginBottom: "1%" }}>
                            <Card.Body>
                                <Card.Title>
                                    Detail
                            </Card.Title>
                                <Card.Text>
                                    {isEditingMode ?
                                        <Editor
                                            EditorState={this.state.detailDes}
                                            toolbarClassName="toolbarClassName"
                                            wrapperClassName="wrapperClassName"
                                            editorClassName="editorClassName"
                                            onEditorStateChange={this.onEditorDetailStateChange}
                                        /> :
                                        draftToHtml(convertToRaw(this.state.detailDes.getCurrentContent()))
                                    }
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Row >
                </ div >
            }
        </>
    }

    renderStars(avg_feedbacks) {
        var elements = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= avg_feedbacks) {
                elements.push(
                    <span class="fa fa-star checked"></span>
                )
            }
            else {
                elements.push(<span class="fa fa-star"></span>)
            }
        }

        return elements;
    }

    onShowOrCloseModalSlide() {
        var isShowModalSlide = this.state.isShowModalSlide;
        this.setState({ isShowModalSlide: !isShowModalSlide });
    }

    renderBodyTable(isPublic) {
        var elements = []
        var slides = this.props.allSlides && this.props.allSlides.length > 0 ? this.props.allSlides : [];
        for (let item of slides) {
            elements.push(
                <tr style={{ textAlign: "left" }}>
                    <td>{item.id}</td>
                    <td>{item.slide_name}</td>
                    <td>{item.is_allow_preview ? "True" : "False"}</td>
                    <td><a href="#">{item.file_url}</a></td>
                    {isPublic ? <></> :
                        <td><FaTrash className="button-icon" style={{ color: "red", width: "20px", height: "20px" }} /></td>
                    }
                </tr>
            )
        }
        return elements;
    }

    onPreviewVideo(url) {
        var { isPreviewMode, selectedVideoUrl } = this.state;
        this.setState({ isPreviewMode: !isPreviewMode, selectedVideoUrl: url })
    }

    renderBodyLessonTable(isPublic) {
        var elements = []
        var lessons = this.props.allLessons && this.props.allLessons.length > 0 ? this.props.allLessons : [];
        for (let item of lessons) {
            elements.push(
                <tr style={{ textAlign: "left" }}>
                    <td>{item.id}</td>
                    <td>{item.lesson_name}</td>
                    <td>{item.file_name}</td>
                    <td><FaPlay className="button-icon" style={{ color: "blueviolet", width: "20px", height: "20px" }} onClick={() => this.onPreviewVideo(item.file_url)} /></td>
                    {isPublic ? <></> :
                        <td><FaTrash className="button-icon" style={{ color: "red", width: "20px", height: "20px" }} /></td>
                    }
                </tr>
            )
        }
        return elements;
    }

    renderManagedLesson(isPublic) {
        var { isPreviewMode, selectedVideoUrl } = this.state;
        return <>
            {isPreviewMode ?
                <>
                    <Row>
                        <Col className="col-4">
                            <FaArrowLeft className="button-icon" onClick={() => this.onPreviewVideo()} />
                        </Col>
                        <Col style={{ textAlign: "left" }}>
                            <h3>Preview Video</h3>
                        </Col>
                    </Row>
                    {selectedVideoUrl == "" ? <></> :
                        <div style={{ marginTop: "5%" }}>
                            <iframe style={{ width: "100%", height: "60vh" }} src={selectedVideoUrl}
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen>
                            </iframe>
                            {/* <video style={{ width: "100%" }} controls>
                                <source src={selectedVideoUrl} type="video/mp4" />
                            </video> */}
                        </div>
                    }
                </>
                :
                <>
                    <div className="table-wrapper-scroll-y my-custom-scrollbar" style={{ maxHeight: "30vh" }}>
                        <Table responsive="sm">
                            <thead>
                                <tr>
                                    <th><div>ID</div></th>
                                    <th><div>Name</div></th>
                                    <th><div>File Name</div></th>
                                    <th><div>Preview</div></th>
                                    {isPublic ? <></> :
                                        <th><div>Delete</div></th>
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderBodyLessonTable(isPublic)}
                            </tbody>
                        </Table>
                    </div>
                    <br></br>
                    {isPublic ? <></> :
                        <div>
                            <h4><strong>Add New Lesson</strong></h4>
                            <div style={{ paddingBottom: "2%" }}>
                                <label for="exampleForm2">Lesson Name</label>
                                <input type="text" class="form-control" />
                            </div>
                            <div style={{ paddingBottom: "2%" }}>
                                <label for="exampleForm2">Lesson URL</label>
                                <input type="text" class="form-control" />
                            </div>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
                                </div>
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="inputGroupFile01"
                                        aria-describedby="inputGroupFileAddon01" />
                                    <label class="custom-file-label" for="inputGroupFile01">Choose video</label>
                                </div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <Button style={{ marginTop: "5%" }} type="button" >Add</Button>
                            </div>
                        </div>
                    }
                </>
            }
        </>
    }

    renderManagedSlide(isPublic) {
        return <>
            <div className="table-wrapper-scroll-y my-custom-scrollbar" style={{ maxHeight: "30vh" }}>
                <Table responsive="sm">
                    <thead>
                        <tr>
                            <th><div>ID</div></th>
                            <th><div>Name</div></th>
                            <th><div>Is preview</div></th>
                            <th><div>Download</div></th>
                            {isPublic ? <></> :
                                <th><div>Delete</div></th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderBodyTable(isPublic)}
                    </tbody>
                </Table>
            </div>
            <br></br>
            {isPublic ? <></> :
                <div>
                    <h4><strong>Add New Slide</strong></h4>
                    <div style={{ paddingBottom: "2%" }}>
                        <label for="exampleForm2">Slide Name</label>
                        <input type="text" class="form-control" />
                    </div>
                    <div style={{ paddingBottom: "2%" }}>
                        <label for="exampleForm2">Slide URL</label>
                        <input type="text" class="form-control" />
                    </div>
                    <div class="form-check mb-2 mr-sm-2" style={{ paddingBottom: "2%" }}>
                        <input class="form-check-input" type="checkbox" id="inlineFormCheckMD" />
                        <label class="form-check-label" for="inlineFormCheckMD">
                            Is Preview
                    </label>
                    </div>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
                        </div>
                        <div class="custom-file">
                            <input type="file" class="custom-file-input" id="inputGroupFile01"
                                aria-describedby="inputGroupFileAddon01" />
                            <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                        </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <Button style={{ marginTop: "5%" }} type="button" >Add</Button>
                    </div>
                </div>
            }
        </>
    }

    renderViewFeedBack() {
        var feedbacks = this.props.allFeedbacks && this.props.allFeedbacks.length > 0 ? this.props.allFeedbacks : [];
        var elements = []
        for (let item of feedbacks) {
            elements.push(
                <Card style={{ width: '97%', marginBottom: "2%" }}>
                    <Card.Body>
                        <Card.Title>{item.user.name}</Card.Title>
                        <Card.Subtitle>
                            {this.renderStars(item.rate)}
                        </Card.Subtitle>
                        <Card.Text>
                            {item.review}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )
        }
        return <>
            <div style={{ overflowY: 'scroll', height: '80vh' }}>
                {elements}
            </div>
        </>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        requestApiGetAllCourses: () => dispatch(requestApiGetAllCourses()),
        requestApiGetAllSlides: (id) => dispatch(requestApiGetAllSlides(id)),
        requestApiGetAllLessons: (id) => dispatch(requestApiGetAllLessons(id)),
        requestApiGetAllFeedbacks: (id) => dispatch(requestApiGetAllFeedbacks(id)),
    };
}

const mapStateToProps = state => ({
    allCourses: state.requestGetAllCoursesReducer,
    allSlides: state.requestGetAllSlidesReducer,
    allLessons: state.requestGetAllLessonsReducer,
    allFeedbacks: state.requestGetAllFeedbacksReducer
})

export default connect(mapStateToProps, mapDispatchToProps)(ManagedCourses)

