import React, { Component } from 'react';
import { Card, Button, Row, Col, Table, Form } from 'react-bootstrap';
import '../../assets/admin.scss';
import { Editor } from '@tinymce/tinymce-react';
import { connect } from 'react-redux';
import {
    requestApiGetAllCategories
} from './redux/action';

class AddNewCourse extends Component {
    constructor(props) {
        super(props);

        this.state = {
            courseName: "",
            price: 0,
            category: "",
            shortDetail: "",
            detail: "",
            isGetCategories: true,
            categories: []
        }
    }


    componentDidMount() {
        this.props.requestApiGetAllCategories();
    }

    componentDidUpdate() {
        var { isGetCategories } = this.state;
        if (isGetCategories) {
            this.setState(
                {
                    categories: this.props.allCategories,
                    isGetCategories: false,
                }
            )
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

    handleEditorChange = (content, editor) => {
        this.setState({ detail: content })
    }

    render() {

        return (
            <>
                <Col className="col-5" style={{ left: "3%", marginTop: "3%" }}>
                    <img className="button-icon" src="https://martialartsplusinc.com/wp-content/uploads/2017/04/default-image-620x600.jpg"></img>
                </Col>
                <Col>
                    <div style={{ textAlign: "center" }}>
                        <h3>Add New Course</h3>
                    </div>
                    <div className="add-course-container">
                        <Form.Group >
                            <Form.Label>Course Name </Form.Label>
                            <Form.Control onChange={(e) => this.onChangeCourseName(e.target.value)} style={{ width: "97%" }} type="text" placeholder="Enter course name" />
                        </Form.Group>
                        <Row>
                            <Col className="col-6">
                                <Form.Group>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control onChange={(e) => this.onChangeCoursePrice(e.target.value)} style={{ width: "95%" }} type="text" placeholder="Enter Price" />
                                </Form.Group>
                            </Col>
                            <Col className="col-6">
                                <Form.Group>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control onChange={(e) => this.onChangeCourseCategory(e.target.value)} style={{ width: "95%" }} as="select" defaultValue="Select Category">
                                        {this.renderCategories()}
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Form.Group >
                                <Form.Label>Short Description</Form.Label>
                                <Form.Control onChange={(e) => this.onChangeCourseShortDetail(e.target.value)} style={{ width: "97%" }} as="textarea" placeholder="Enter short description" />
                            </Form.Group>
                            <Form.Group style={{ width: "97%", height: "35vh" }}>
                                <Form.Label>Description</Form.Label>
                                <Editor
                                    apiKey='vnv0h8lv17ek5lg9pci17owmqylg8xnvucvdc5d8hkgqbhwr'
                                    initialValue="<p>This is the initial content of the editor</p>"
                                    init={{
                                        height: 300,
                                        menubar: true,
                                        plugins: [
                                            'advlist autolink lists link image charmap print preview anchor',
                                            'searchreplace visualblocks code fullscreen',
                                            'insertdatetime media table paste code help wordcount'
                                        ],
                                        toolbar: 'undo redo | formatselect | bold italic backcolor | \
                                        alignleft aligncenter alignright alignjustify | \
                                        bullist numlist outdent indent | removeformat | help'
                                    }}
                                    onEditorChange={this.handleEditorChange}
                                />
                            </Form.Group>
                            <Col className="col-5"></Col>
                            <Col className="col-5">
                                <Button variant="success">Confirm</Button>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </>
        )
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
    };
}

const mapStateToProps = state => ({
    allCategories: state.requestGetAllCategoriesReducer
})

export default connect(mapStateToProps, mapDispatchToProps)(AddNewCourse)

