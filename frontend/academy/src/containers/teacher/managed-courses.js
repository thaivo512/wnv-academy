import React, { Component } from 'react';
import '../../assets/admin.scss';
import { Card, Button, Row, Col, Table } from 'react-bootstrap';
import { FaEdit, FaTrash, FaCheck, FaPlay, FaArrowLeft, FaDownload } from 'react-icons/fa';
import EsolModal from '../../components/modal';
import { connect } from 'react-redux';
import {
    requestApiGetAllCourses, requestApiGetAllSlides,
    requestApiGetAllLessons, requestApiGetAllFeedbacks,
    requestApiGetAllCategories, requestApiPostAddSlide,
    requestApiPostAddLesson, requestApiPostUploadFile,
    requestApiPostUpdateCourse, requestApiPublishCourse,
    requestApiDeleteSlide, requestApiDeleteLesson
} from './redux/action';
import AddNewCourse from './add-new-course';
import { Editor } from '@tinymce/tinymce-react';

class ManagedCourses extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isShowAddCourse: false,
            isGetCourses: true,
            isShowModalSlide: false,
            isShowModalLesson: false,
            isShowModalFeedBack: false,
            isEditingMode: false,
            isPreviewMode: false,
            lesson_name: "",
            selectedVideoUrl: "",
            shortDetail: "",
            detailDes: "",
            feedbacks: [],
            selected_course: {},
            courses: [],
            slide_name: "",
            isPreview: false,
            slides: [],
            isGetSlide: false,
            isGetLesson: false,
            allLessons: [],
            avatar: "",
            fileInfo: {
                file_name: "",
                file_url: ""
            }
        }
    }

    componentDidMount() {
        this.props.requestApiGetAllCourses();
        this.props.requestApiGetAllCategories();
    }

    componentDidUpdate() {
        var { fileInfo, slides, courses, selected_course, isGetCourses, isGetSlide, isGetLesson, allLessons } = this.state;

        if (isGetSlide) {
            this.props.requestApiGetAllSlides(selected_course.id);
        }

        if (isGetLesson) {
            this.props.requestApiGetAllLessons(selected_course.id);
        }

        if (isGetCourses) {
            this.props.requestApiGetAllCourses();
        }

        if (this.props.allCourses && JSON.stringify(courses) != JSON.stringify({}) &&
            (courses.length != this.props.allCourses.length || courses.filter(x => x.status == "PUBLIC").length != this.props.allCourses.filter(x => x.status == "PUBLIC").length)) {
            var course = this.props.allCourses[0] ? this.props.allCourses[0] : {};
            course.promoteRate = ((course.price - course.price_promote) / course.price) * 100;
            this.setState(
                {
                    courses: this.props.allCourses,
                    selected_course: course,
                    shortDetail: course.short_description,
                    detailDes: course.detail_description,
                    isGetCourses: false
                }
            )
        }

        if (this.props.fileResult && fileInfo.file_name != this.props.fileResult.file_name) {
            this.setState({
                fileInfo: {
                    file_name: this.props.fileResult.file_name,
                    file_url: this.props.fileResult.url
                }
            })
        }

        if (isGetSlide || this.props.allSlides.length > 0 && this.props.allSlides.length != slides.length) {
            this.setState({ slides: this.props.allSlides, isGetSlide: false })
        }

        if (isGetLesson || this.props.allLessons && this.props.allLessons.length != allLessons.length) {
            this.setState({ allLessons: this.props.allLessons, isGetLesson: false })
        }
    }

    render() {
        var { isShowAddCourse } = this.state;
        return (
            <div className="managed-teacher-container">
                <Row>
                    <Col>
                        <h3 className="title-page-admin">Courses Management</h3>
                    </Col>
                    <Col className="col-2" style={{ textAlign: "right" }} >
                        {
                            isShowAddCourse ?
                                <FaArrowLeft onClick={() => this.onShowAddCourse()} className="button-icon" /> :
                                <Button onClick={() => this.onShowAddCourse()} variant="success">+ Add Course</Button>
                        }
                    </Col>
                </Row>
                <br></br>
                <Row>
                    {isShowAddCourse ? <AddNewCourse /> : this.onRenderViewCourses()}
                </Row>

            </div >
        )
    }

    onShowAddCourse() {
        var { isShowAddCourse } = this.state;
        this.setState({ isShowAddCourse: !isShowAddCourse, isGetCourses: true })
    }

    onRenderViewCourses() {
        return (
            <>
                <Col className="col-3" style={{ overflowY: 'scroll', height: '80vh' }}>
                    {this.onRenderListCourses()}
                </Col>
                <Col>
                    {this.onShowCoursesDetail()}
                </Col>
            </>
        )
    }

    onRenderListCourses() {
        var elements = [];
        var courses = this.state.courses;
        if (JSON.stringify(courses) === JSON.stringify({})) {
            courses = []
        }
        for (let item of courses) {
            let className = "md-2 " + item.status;
            elements.push(
                <Card onClick={() => this.onSelectedCourse(item)} style={{ width: '95%', marginBottom: "3%" }} className="button-icon">
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
        course.promoteRate = ((course.price - course.price_promote) / course.price) * 100;
        this.setState({
            selected_course: course,
            shortDetail: course.short_description,
            detailDes: course.detail_description,
            avatar: "",
            isGetLesson: true,
            isGetSlide: true
        })
    }

    onEditPage() {
        var { isEditingMode, selected_course, avatar } = this.state;
        avatar = avatar == "" ? selected_course.image_avatar : this.props.fileResult.url;
        if (isEditingMode) {
            this.props.requestApiPostUpdateCourse({
                id: selected_course.id,
                courseName: selected_course.name,
                price: selected_course.price,
                category: selected_course.category.id,
                detail: selected_course.detail_description,
                shortDetail: selected_course.short_description,
                avatar: avatar,
                pricePromote: selected_course.price_promote
            });
        }
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

    onChangePromoteRate(value) {
        var { selected_course } = this.state;
        selected_course.promoteRate = value;
        selected_course.price_promote = parseInt(selected_course.price - (selected_course.price * (selected_course.promoteRate / 100)));
        this.setState({ selected_course: selected_course })
    }

    onEditorShortDetailStateChange = (shortDetail) => {
        this.setState({ shortDetail: shortDetail })
    }

    onEditorDetailStateChange = (detail) => {
        this.setState({ detailDes: detail })
    }

    onShowManagedLesson() {
        var { isShowModalLesson } = this.state;
        this.setState({ isShowModalLesson: !isShowModalLesson })
    }

    onShowViewFeedBack() {
        var { isShowModalFeedBack } = this.state;
        this.setState({ isShowModalFeedBack: !isShowModalFeedBack })
    }

    upload() {
        document.getElementById("selectImage").click()
    }

    onChangeImage(e) {
        var { avatar } = this.state;
        this.props.requestApiPostUploadFile(e.target.files[0])
        avatar = URL.createObjectURL(e.target.files[0])
        this.setState({ avatar: avatar })
    }

    onShowCoursesDetail() {
        var { isEditingMode, selected_course, isShowModalSlide, isShowModalLesson, isShowModalFeedBack, shortDetail, detailDes, avatar } = this.state;
        avatar = avatar == "" ? selected_course.image_avatar : avatar;
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
                <>
                    <div style={{ marginLeft: "1%", overflowY: 'scroll', height: '76vh' }} >
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
                                            {isEditingMode ?
                                                <>
                                                    <Card.Img className="button-icon" onClick={() => this.upload()} style={{ width: "350px", height: "250px" }} src={avatar} />
                                                    <input id="selectImage" hidden type="file" onChange={(e) => this.onChangeImage(e)} />
                                                </> : <Card.Img style={{ width: "350px", height: "250px" }} src={avatar} />
                                            }
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
                                                <Col className="col-3">Price(VND):</Col>
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
                                                <Col className="col-3">Promote Rate(%):</Col>
                                                <Col className="col-4">
                                                    <Card.Title style={{ textAlign: "left", marginLeft: "5%" }}>
                                                        {isEditingMode ?
                                                            <input onChange={(e) => this.onChangePromoteRate(e.target.value)} type="text" class="form-control" value={selected_course.promoteRate} />
                                                            : selected_course.promoteRate
                                                        }
                                                    </Card.Title>
                                                </Col>
                                            </Row>
                                            <Row style={{ textAlign: "left" }}>
                                                <Col className="col-3">Promote Price(VND):</Col>
                                                <Col className="col-4">
                                                    <Card.Title style={{ textAlign: "left", marginLeft: "5%" }}>
                                                        {selected_course.price_promote}
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
                                                        {selected_course.total_erol ? selected_course.total_erol : 0}
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
                                    <Editor
                                        apiKey='vnv0h8lv17ek5lg9pci17owmqylg8xnvucvdc5d8hkgqbhwr'
                                        value={shortDetail}
                                        disabled={!isEditingMode}
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
                                        onChange={(e) => this.onEditorShortDetailStateChange(e.target.value)}
                                    />
                                </Card.Body>
                            </Card>
                            <Card style={{ width: '95%', marginBottom: "1%" }}>
                                <Card.Body>
                                    <Card.Title>
                                        Detail
                            </Card.Title>
                                    <Editor
                                        apiKey='vnv0h8lv17ek5lg9pci17owmqylg8xnvucvdc5d8hkgqbhwr'
                                        value={detailDes}
                                        disabled={!isEditingMode}
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
                                        onChange={(e) => this.onEditorDetailStateChange(e.target.value)}
                                    />
                                </Card.Body>
                            </Card>
                        </Row >
                    </ div >
                    {!isPublic ?
                        <Row>
                            <Col className="col-5">
                            </Col>
                            <Col className="col-6">
                                <Button onClick={() => this.onPublishCourse()} variant="info">Publish</Button>
                            </Col>
                        </Row> : <></>
                    }

                </>
            }
        </>
    }

    onPublishCourse() {
        var { selected_course } = this.state;

        this.props.requestApiPublishCourse({
            id: selected_course.id
        });

        this.setState({ isGetCourses: true })
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

    onDownloadFile(url) {
        window.open(url);
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
                    <td><FaDownload variant="info" className="button-icon" s onClick={() => this.onDownloadFile(item.file_url)} /></td>
                    {isPublic ? <></> :
                        <td><FaTrash onClick={() => this.onDeleteSlide(item.id)} className="button-icon" style={{ color: "red", width: "20px", height: "20px" }} /></td>
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

    onDeleteSlide(id) {
        var { selected_course } = this.state;
        this.props.requestApiDeleteSlide({
            id: id,
            course_id: selected_course.id
        });

        this.setState({ isGetSlide: true });
    }

    onDeleteLesson(id) {
        var { selected_course } = this.state;
        this.props.requestApiDeleteLesson({
            id: id,
            course_id: selected_course.id
        });

        this.setState({ isGetLesson: true });
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
                        <td><FaTrash onClick={() => this.onDeleteLesson(item.id)} className="button-icon" style={{ color: "red", width: "20px", height: "20px" }} /></td>
                    }
                </tr>
            )
        }
        return elements;
    }

    renderManagedLesson(isPublic) {
        var { isPreviewMode, selectedVideoUrl, fileInfo } = this.state;
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
                                <input type="text" onChange={(e) => this.onChangeLessonName(e.target.value)} class="form-control" />
                            </div>
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
                                </div>
                                <div class="custom-file">
                                    <input onChange={(e) => this.onChangeSelectFile(e)} type="file" class="custom-file-input" id="inputGroupFile01"
                                        aria-describedby="inputGroupFileAddon01" />
                                    <label class="custom-file-label" for="inputGroupFile01">{fileInfo.file_name != "" ? fileInfo.file_name : "Choose file"}</label>
                                </div>
                            </div>
                            <div style={{ textAlign: "right" }}>
                                <Button style={{ marginTop: "5%" }} onClick={() => this.onAddLesson()} type="button" >Add</Button>
                            </div>
                        </div>
                    }
                </>
            }
        </>
    }

    onAddLesson() {
        var { lesson_name, fileInfo, lesson_name, selected_course } = this.state;

        this.props.requestApiPostAddLesson({
            lesson_name: lesson_name,
            course_id: selected_course.id,
            file_name: fileInfo.file_name,
            file_url: fileInfo.file_url,
        });

        this.setState({ isGetLesson: true })
    }

    onChangeLessonName(lessonName) {
        this.setState({ lesson_name: lessonName })
    }

    onChangeSlideName(slideName) {
        this.setState({ slide_name: slideName })
    }

    onChecked() {
        var { isPreview } = this.state;
        this.setState({ isPreview: !isPreview })
    }

    onChangeSelectFile(e) {
        this.props.requestApiPostUploadFile(e.target.files[0])
    }

    renderManagedSlide(isPublic) {
        var { fileInfo } = this.state;
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
                        <input onChange={(e) => this.onChangeSlideName(e.target.value)} type="text" class="form-control" />
                    </div>
                    <div class="form-check mb-2 mr-sm-2" style={{ paddingBottom: "2%" }}>
                        <input onChange={() => this.onChecked()} class="form-check-input" type="checkbox" id="inlineFormCheckMD" />
                        <label class="form-check-label" for="inlineFormCheckMD">
                            Is Preview
                        </label>
                    </div>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
                        </div>
                        <div class="custom-file">
                            <input onChange={(e) => this.onChangeSelectFile(e)} type="file" class="custom-file-input" id="inputGroupFile01"
                                aria-describedby="inputGroupFileAddon01" />
                            <label class="custom-file-label" for="inputGroupFile01">{fileInfo.file_name != "" ? fileInfo.file_name : "Choose file"}</label>
                        </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <Button onClick={() => this.onAddSlide()} style={{ marginTop: "5%" }} type="button" >Add</Button>
                    </div>
                </div>
            }
        </>
    }

    onAddSlide() {
        var { slide_name, isPreview, fileInfo, selected_course } = this.state;
        this.props.requestApiPostAddSlide(
            {
                slide_name: slide_name,
                file_name: fileInfo.file_name,
                file_url: fileInfo.file_url,
                is_allow_preview: isPreview,
                course_id: selected_course.id
            });
        this.setState({
            isGetSlide: true
        });
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
        requestApiGetAllCategories: () => dispatch(requestApiGetAllCategories()),
        requestApiGetAllSlides: (id) => dispatch(requestApiGetAllSlides(id)),
        requestApiGetAllLessons: (id) => dispatch(requestApiGetAllLessons(id)),
        requestApiGetAllFeedbacks: (id) => dispatch(requestApiGetAllFeedbacks(id)),
        requestApiPostAddLesson: (lesson) => dispatch(requestApiPostAddLesson(lesson)),
        requestApiPostAddSlide: (slide) => dispatch(requestApiPostAddSlide(slide)),
        requestApiPostUploadFile: (file) => dispatch(requestApiPostUploadFile(file)),
        requestApiPostUpdateCourse: (course) => dispatch(requestApiPostUpdateCourse(course)),
        requestApiPublishCourse: (course) => dispatch(requestApiPublishCourse(course)),
        requestApiDeleteSlide: (slide) => dispatch(requestApiDeleteSlide(slide)),
        requestApiDeleteLesson: (lesson) => dispatch(requestApiDeleteLesson(lesson)),
    };
}

const mapStateToProps = state => ({
    allCourses: state.requestGetAllCoursesReducer,
    allSlides: state.requestGetAllSlidesReducer,
    allLessons: state.requestGetAllLessonsReducer,
    allFeedbacks: state.requestGetAllFeedbacksReducer,
    allCategories: state.requestGetAllCategoriesReducer,
    slideResult: state.requestAddSlideReducer,
    lessonResult: state.requestAddLessonReducer,
    fileResult: state.requestUploadFileReducer,
})

export default connect(mapStateToProps, mapDispatchToProps)(ManagedCourses)

