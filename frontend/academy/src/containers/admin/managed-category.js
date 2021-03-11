import React, { Component } from 'react';
import { Row, Col, Card, Table, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import '../../assets/admin.scss';
import { FaSearch, FaTrash, FaArrowLeft, FaPlay, FaDownload, FaCheck, FaTimes } from 'react-icons/fa';
import { requestApiGetAllCategories } from '../teacher/redux/action'
import {
    requestApiGetAllCoursesAdmin, requestApiPostAddCategory,
    requestApiDeleteategory, requestApiPutCategory
} from './redux/action';
import EsolModal from '../../components/modal';

class ManagedCategories extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            selectedCaregory: {},
            courses: [],
            categoryName: "",
            isGetCategory: false,
            isShowDeleteModal: false,
            isUpdateMode: false
        }
    }

    componentDidMount() {
        this.props.requestApiGetAllCategories();
        this.props.requestApiGetAllCoursesAdmin();
    }

    componentDidUpdate() {
        var { categories, isGetCategory } = this.state;

        if (isGetCategory) {
            this.props.requestApiGetAllCategories();
        }

        if (JSON.stringify(this.props.allCourses) != JSON.stringify({}) &&
            this.props.allCategories && categories.length != this.props.allCategories.length) {
            this.setState({
                categories: this.props.allCategories,
                selectedCaregory: this.props.allCategories[0],
                courses: this.props.allCourses,
                isGetCategory: false
            })
        }
    }

    onChangeSelectedCategoryName(name) {
        var { selectedCaregory } = this.state;
        selectedCaregory.name = name
        this.setState({
            selectedCaregory: selectedCaregory
        })
    }

    render() {
        var { selectedCaregory, isShowDeleteModal, isUpdateMode } = this.state;
        return (
            <>
                <EsolModal isShow={isShowDeleteModal}
                    title="Confirm Delete Caetegory"
                    onHide={() => this.onHideDeleteCategory()}
                    body={this.onRenderConfirmDelete(selectedCaregory)}
                    size="xs"
                />
                <div className="managed-teacher-container">
                    <Row>
                        <Col>
                            <h3>Category Management</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="col-3" style={{ overflowY: 'scroll', height: '80vh' }}>
                            {this.onRenderListCourses()}
                        </Col>
                        <Col className="col-8" style={{ marginLeft: "1%" }}>
                            {isUpdateMode ?
                                <Form.Group style={{ width: "100%", marginLeft: "0" }}>
                                    <Form.Control onChange={(e) => this.onChangeSelectedCategoryName(e.target.value)} style={{ width: "80%" }} type="text" value={selectedCaregory.name} />
                                </Form.Group> :
                                <h3 style={{ textAlign: "center" }}>{selectedCaregory.name}</h3>
                            }
                            <div className="table-wrapper-scroll-y my-custom-scrollbar" style={{ maxHeight: "80vh" }}>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Category</th>
                                            <th>Courses</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            selectedCaregory.sub_categorys && selectedCaregory.sub_categorys.length > 0 ?
                                                this.onRenderSelectedCategory() :
                                                <></>
                                        }
                                    </tbody>
                                </Table>
                            </div>
                            <div style={{ textAlign: "center" }}>
                                {
                                    isUpdateMode ?
                                        <Button onClick={() => this.onShowUpdateMode()} style={{ height: "50px" }} variant="info">Confirm</Button> :
                                        <Button onClick={() => this.onShowUpdateMode()} style={{ height: "50px" }} variant="info">Update</Button>
                                }
                                <Button onClick={() => this.onHideDeleteCategory()} style={{ height: "50px" }} variant="danger">Delete</Button>
                            </div>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }

    onShowUpdateMode() {
        var { isUpdateMode, selectedCaregory } = this.state;
        if (isUpdateMode) {
            this.props.requestApiPutCategory({
                id: selectedCaregory.id,
                name: selectedCaregory.name
            });
        }
        this.setState({
            isUpdateMode: !isUpdateMode
        })
    }

    onHideDeleteCategory() {
        var { isShowDeleteModal } = this.state;
        this.setState({
            isShowDeleteModal: !isShowDeleteModal
        })
    }

    onRenderConfirmDelete(id) {
        return (
            <Row>
                <Col>
                    <Button onClick={() => this.onDeleteCategory(id)} variant="info">Confirm</Button>
                </Col>
                <Col>
                    <Button onClick={() => this.onHideDeleteCategory()} variant="danger">Cancel</Button>
                </Col>
            </Row>
        )
    }

    onDeleteCategory() {
        var { selectedCaregory, isShowDeleteModal } = this.state;
        this.props.requestApiDeleteategory(selectedCaregory.id)
        this.setState({
            isGetCategory: true,
            isShowDeleteModal: !isShowDeleteModal
        })
    }

    onSelectCategory(cagetory) {
        this.setState({
            selectedCaregory: cagetory
        })
    }

    onChangeCategoryName(name) {
        this.setState({
            categoryName: name
        })
    }

    onRenderSelectedCategory() {
        var { courses, selectedCaregory } = this.state;
        if (JSON.stringify(selectedCaregory) === JSON.stringify({})) {
            selectedCaregory.sub_categorys = []
        }
        var elements = [];
        for (let item of selectedCaregory.sub_categorys) {
            var courseName = []
            for (let course of courses.filter(x => x.category_id == item.id)) {
                courseName.push(<p>{course.name}</p>);
            }
            elements.push(
                <tr>
                    <td>{item.name}</td>
                    <td>{courseName}</td>
                </tr>
            )
        }

        return elements;
    }

    onRenderListCourses() {
        var { categories } = this.state;
        var elements = [];
        if (JSON.stringify(categories) === JSON.stringify({})) {
            categories = []
        }
        for (let item of categories) {
            if (item.name == "") {
                elements.push(
                    <Card style={{ width: '95%', marginBottom: "3%" }} >
                        <Card.Body>
                            <Form.Group style={{ width: "100%", marginLeft: "0" }}>
                                <Row>
                                    <Form.Control onChange={(e) => this.onChangeCategoryName(e.target.value)} style={{ width: "80%" }} type="text" placeholder="Enter category name" />
                                    <FaCheck onClick={() => this.onConfirmAdd()} className="button-icon" style={{ height: "40px", marginLeft: "4%" }} />
                                    <FaTimes onClick={() => this.onCancelAdd()} className="button-icon" style={{ height: "40px", marginLeft: "6%" }} />
                                </Row>
                            </Form.Group>
                        </Card.Body>
                    </Card >
                )
            }
            else {
                elements.push(
                    <Card onClick={() => this.onSelectCategory(item)} style={{ width: '95%', marginBottom: "3%" }} className="button-icon">
                        <Card.Body>
                            <Card.Title>{item.name}</Card.Title>
                        </Card.Body>
                    </Card >
                )
            }
        }
        if (categories.filter(x => x.name == "").length > 0) {
            return elements;
        }
        elements.push(<Button onClick={() => this.onAddEmptyCategoryCard()} style={{ width: "95%", height: "70px" }} variant="success">+ Add New Category</Button>)
        return elements;
    }

    onConfirmAdd() {
        var { categoryName, categories } = this.state;
        if (categoryName != "") {
            categories.pop();
            this.props.requestApiPostAddCategory({ name: categoryName })
            this.setState({ isGetCategory: true, categories: categories })
        }
    }

    onCancelAdd() {
        var { categories } = this.state;
        categories.pop();
        this.setState({ categories: categories })
    }

    onAddEmptyCategoryCard() {
        var { categories } = this.state;
        categories.push({ name: "" })
        this.setState({ categories: categories })
    }
}

const mapDispatchToProps = dispatch => {
    return {
        requestApiGetAllCategories: () => dispatch(requestApiGetAllCategories()),
        requestApiGetAllCoursesAdmin: () => dispatch(requestApiGetAllCoursesAdmin()),
        requestApiPostAddCategory: (name) => dispatch(requestApiPostAddCategory(name)),
        requestApiDeleteategory: (id) => dispatch(requestApiDeleteategory(id)),
        requestApiPutCategory: (category) => dispatch(requestApiPutCategory(category))
    };
}

const mapStateToProps = state => ({
    allCategories: state.requestGetAllCategoriesReducer,
    allCourses: state.requestGetAllCoursesAdminReducer,
})

export default connect(mapStateToProps, mapDispatchToProps)(ManagedCategories)
