import React, { Component } from 'react';
import '../../assets/homepage.scss';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import NavBarComponent from '../../components/nav-bar';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Pagination } from 'antd';
import { withRouter } from 'react-router-dom';
import { Radio } from 'antd';
import { Rate } from 'antd';

import { Link} from 'react-router-dom';
import { Card } from 'react-bootstrap';

import {
    requestApiSearchCourse
} from './redux/action';



class SearchPage extends Component {
    constructor(props) {
        super(props);

        let params = queryString.parse(this.props.location.search)

        this.state = {
            courses: [],
            page: params.page || 1,
            category: params.category || '',
            q: params.q || '',
            sort: params.sort || 'price',
            direct: params.direct || 'asc',
            total: 0,
            size: 20
        }
    }

    componentDidMount() {
        this.props.requestApiSearchCourse({
            page: this.state.page,
            category: this.state.category,
            q: this.state.q,
            size: this.state.size,
            sort: this.state.sort,
            direct: this.state.direct,
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.location.search != this.props.location.search){

            let params = queryString.parse(this.props.location.search);
            this.setState({
                page: params.page || 1,
                category: params.category || '',
                q: params.q || '',
                sort: params.sort || 'price',
                direct: params.direct || 'asc',
            })

            this.props.requestApiSearchCourse({
                page: params.page || 1,
                category: params.category || '',
                q: params.q || '',
                sort: params.sort || 'price',
                direct: params.direct || 'asc',
                size: this.state.size
            });
        }

        const searchResponse = this.props.searchResponse;
        if(searchResponse && searchResponse.is_success){
            this.props.searchResponse.is_success = false;
            this.setState(
                {
                    courses: searchResponse.data,
                    total: searchResponse.total,
                }
            )
        }  
    }

    onChangePage = (page, pageSize) => {
        this.props.history.push(
            `/search?page=${page}&category=${this.state.category}&q=${this.state.q}&sort=${this.state.sort}&direct=${this.state.direct}`);
    }

    handleChangeSort = (e) => {
        const value = e.target.value.split('|');
        this.props.history.push(
            `/search?page=${this.state.page}&category=${this.state.category}&q=${this.state.q}&sort=${value[0]}&direct=${value[1]}`);
    }

    render() {
        return (
            <>
                <NavBarComponent />
                <div>
                    <div>
                        {
                            !this.state.courses.length? <div style={{ padding:'160px 0px' }}>Không tìm thấy khóa học nào</div> :
                            <>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom:'25px' }}>
                                <Radio.Group value={this.state.sort + '|' + this.state.direct} onChange={this.handleChangeSort}>
                                    <Radio.Button value="price|asc">Giá tăng dần</Radio.Button>
                                    <Radio.Button value="price|desc">Giá giảm dần</Radio.Button>
                                    <Radio.Button value="avg_feedback|asc">Đánh giá tăng dần</Radio.Button>
                                    <Radio.Button value="avg_feedback|desc">Đánh giá giảm dần</Radio.Button>
                                </Radio.Group>
                            </div>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                                {
                                    this.state.courses
                                        .map(item => {
                                            let className = 'p-2 ';
                                            if(item.total_enrol > 0) className += 'best-seller ';
                                            if(+new Date() - +item.last_update < 1000*60*60*24*100) className += 'newest ';

                                            item.className = className;
                                            return item;
                                        })
                                        .map(item => 
                                        <div className="d-flex flex-wrap" style={{ justifyContent: "center" }}>
                                            <Link class={item.className}  
                                                style={{ position: 'relative' }}
                                                to={`/details?id=${item.id}` }>
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
                                        </div>
                                    )
                                }
                            </div>

                            <Pagination
                                style={{ marginTop:30 }}
                                pageSize={this.state.size}
                                onChange={this.onChangePage}
                                total={this.state.total} 
                                current={this.state.page - 1 + 1} />
                            </>
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
        requestApiSearchCourse: (params) => dispatch(requestApiSearchCourse(params))
    };
}

const mapStateToProps = state => ({
    searchResponse: state.requestSearchCourseReducer
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchPage))
