import React, { Component } from 'react';
import { Card, Button, Row, Col, Table, Form } from 'react-bootstrap';
import '../../assets/admin.scss';
import { Editor } from '@tinymce/tinymce-react';
import { connect } from 'react-redux';
import {
    requestApiGetAllCategories,
    requestApiPostAddCourse,
    requestApiPostUploadFile
} from './redux/action';

class AddNewCourse extends Component {
    constructor(props) {
        super(props);

        this.state = {
            courseName: "",
            price: 0,
            category: 0,
            shortDetail: "",
            detail: "",
            promoteRate: 1,
            isGetCategories: true,
            categories: [],
            avatar: "https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image-620x600.jpg"
        }
    }

    componentDidMount() {
        this.props.requestApiGetAllCategories();
    }

    componentDidUpdate() {
        var { isGetCategories, avatar } = this.state;
        if (isGetCategories) {
            var temp = []
            for (let item of this.props.allCategories) {
                temp = temp.concat(item.sub_categorys);
            }
            this.setState(
                {
                    categories: temp,
                    category: temp[0].id,
                    isGetCategories: false,
                }
            )
        }
        if (avatar != this.props.fileResult.url) {
            this.setState({ avatar: this.props.fileResult.url })
        }
    }

    onChangeCourseName(name) {
        this.setState({ courseName: name })
    }

    onChangeCoursePrice(price) {
        this.setState({ price: price })
    }

    onChangeCourseCategory(category) {
        this.setState({ category: category })
    }

    onChangeCourseShortDetail(shortDetail) {
        this.setState({ shortDetail: shortDetail })
    }

    onChangePromoteRate(promoteRate) {
        this.setState({ promoteRate: promoteRate })
    }

    onChangeSelectedFile(e) {
        this.props.requestApiPostUploadFile(e.target.files[0])
    }

    handleEditorChange = (content, editor) => {
        this.setState({ detail: content })
    }

    upload() {
        document.getElementById("selectImage").click()
    }

    render() {
        var url = this.state.avatar;
        console.log(url)
        return (
            <>
                <Col className="col-5" style={{ left: "3%", marginTop: "3%" }}>
                    <img style={{ width: "95%", height: "60vh" }} onClick={() => this.upload()} className="button-icon" src={url} />
                    <input id='selectImage' hidden type="file" onChange={(e) => this.onChangeSelectedFile(e)} />
                </Col>
                <Col>
                    <div style={{ textAlign: "center" }}>
                        <h3>Add New Course</h3>
                    </div>
                    <div className="add-course-container">
                        <Form.Group >
                            <Form.Label>Course Name </Form.Label>
                            <Form.Control onChange={(e) => this.onChangeCourseName(e.target.value)} style={{ width: "97%" }} type="text" placeholder="Course name" />
                        </Form.Group>
                        <Row>
                            <Col className="col-4">
                                <Form.Group>
                                    <Form.Label>Price (VNĐ)</Form.Label>
                                    <Form.Control onChange={(e) => this.onChangeCoursePrice(e.target.value)} style={{ width: "90%" }} type="text" placeholder="Price" />
                                </Form.Group>
                            </Col>
                            <Col className="col-4">
                                <Form.Group>
                                    <Form.Label>Promote Rate (%)</Form.Label>
                                    <Form.Control onChange={(e) => this.onChangePromoteRate(e.target.value)} style={{ width: "90%" }} type="text" placeholder="Promote Rate" />
                                </Form.Group>
                            </Col>
                            <Col className="col-4">
                                <Form.Group>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control onChange={(e) => this.onChangeCourseCategory(e.target.value)} style={{ width: "90%" }} as="select" defaultValue="Select Category">
                                        {this.renderCategories()}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Form.Group >
                                <Form.Label>Short Description</Form.Label>
                                <Form.Control onChange={(e) => this.onChangeCourseShortDetail(e.target.value)} style={{ width: "97%" }} as="textarea" placeholder="Short description" />
                            </Form.Group>
                            <Form.Group style={{ width: "97%", height: "35vh" }}>
                                <Form.Label>Description</Form.Label>
                                <Editor
                                    apiKey='vnv0h8lv17ek5lg9pci17owmqylg8xnvucvdc5d8hkgqbhwr'
                                    initialValue=""
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
                                    onEditorChange={this.handleEditorChange}
                                />
                            </Form.Group>
                            <Col className="col-5"></Col>
                            <Col className="col-5">
                                <Button variant="success" onClick={() => this.onAddCourse()}>Confirm</Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </>
        )
    }

    onAddCourse() {
        var { courseName, price, category, detail, shortDetail, promoteRate, avatar } = this.state;
        this.props.requestApiPostAddCourse(
            {
                courseName: courseName,
                price: price,
                category: category,
                detail: detail,
                shortDetail: shortDetail,
                avatar: avatar,
                promoteRate: promoteRate
            });
        this.setState({
            courseName: "",
            price: 0,
            category: 0,
            shortDetail: "",
            detail: "",
            promoteRate: 1,
            avatar: "https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image-620x600.jpg"
        })
    }

    renderCategories() {
        var elements = [];
        var temp = this.state.categories;
        var categories = temp && temp.length > 0 ? temp : [];
        for (let item of categories) {
            elements.push(<option value={item.id}>{item.name}</option>)
        }

        return elements;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        requestApiGetAllCategories: () => dispatch(requestApiGetAllCategories()),
        requestApiPostAddCourse: (course) => dispatch(requestApiPostAddCourse(course)),
        requestApiPostUploadFile: (file) => dispatch(requestApiPostUploadFile(file)),
    };
}

const mapStateToProps = state => ({
    allCategories: state.requestGetAllCategoriesReducer,
    fileResult: state.requestUploadFileReducer,
})

export default connect(mapStateToProps, mapDispatchToProps)(AddNewCourse)

