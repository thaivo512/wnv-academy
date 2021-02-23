import React, { Component } from 'react';
import { Card, Button, Row, Col, Table, Form } from 'react-bootstrap';
import '../../assets/admin.scss';
import { Editor } from '@tinymce/tinymce-react';

class AddNewCourse extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
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
                            <Form.Control style={{ width: "97%" }} type="text" placeholder="Enter course name" />
                        </Form.Group>
                        <Row>
                            <Col className="col-6">
                                <Form.Group>
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control style={{ width: "95%" }} type="text" placeholder="Enter Price" />
                                </Form.Group>
                            </Col>
                            <Col className="col-6">
                                <Form.Group>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control style={{ width: "95%" }} as="select" defaultValue="Select Category">
                                        <option>Web</option>
                                        <option>AI</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Form.Group >
                                <Form.Label>Short Description</Form.Label>
                                <Form.Control style={{ width: "97%" }} as="textarea" placeholder="Enter short description" />
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
}

export default AddNewCourse;
