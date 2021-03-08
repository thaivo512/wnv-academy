import React, { Component } from 'react';
import '../../assets/homepage.scss';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import NavBarComponent from '../../components/nav-bar';
import { connect } from 'react-redux';
import { Link} from 'react-router-dom';
import { Card } from 'react-bootstrap';

import { Rate } from 'antd';

import {
    requestApiGetWatchlist
} from './redux/action';


class WatchlistPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            watchlist: []    
        }
    }

    componentDidMount() {
        this.props.requestApiGetWatchlist();
    }

    componentDidUpdate(prevProps, prevState) {     

        const watchlistResponse = this.props.watchlistResponse;
        if(watchlistResponse && watchlistResponse.is_success) {
            this.props.watchlistResponse.is_success = false;
            this.setState(
                {
                    watchlist: watchlistResponse.data
                }
            )
        }  

    }

    render() {
        return (
            <>
                <NavBarComponent />
                <div>

                    <div style={{ padding: 25 }}>
                        {
                            !this.state.watchlist || !this.state.watchlist.length? 
                            <div style={{ padding: '140px 0' }}>Bạn chưa thêm khóa học nào vào watchlist</div> :
                            <div>
                                <h3> Danh sách khóa học bạn thêm vào watchlist</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', marginTop:'50px' }}>
                                        { this.state.watchlist.map((item) =>
                                            <div className="d-flex flex-wrap" style={{ justifyContent: "center" }}>
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
                                            </div>
                                        )}
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
        requestApiGetWatchlist: () => dispatch(requestApiGetWatchlist()),
    };
}

const mapStateToProps = state => ({
    watchlistResponse : state.requestGetWatchlistReducer
})

export default connect(mapStateToProps, mapDispatchToProps)(WatchlistPage)
