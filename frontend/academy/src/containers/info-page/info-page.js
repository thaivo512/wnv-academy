import React, { Component } from 'react';
import '../../assets/homepage.scss';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import NavBarComponent from '../../components/nav-bar';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Input } from 'antd';
import { EditOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';

import {
    requestApiGetInfo,
    requestApiChangeName
} from './redux/action';


class InfoPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            name: '',
            onediting: false
        }
    }

    componentDidMount() {
        this.props.requestApiGetInfo();
    }

    componentDidUpdate(prevProps, prevState) {
        
        const getInfoResponse = this.props.getInfoResponse;
        if(getInfoResponse && getInfoResponse.is_success){
            getInfoResponse.is_success = false;
            this.setState(
                {
                    user: getInfoResponse,
                    name: getInfoResponse.name,
                    onediting: false
                }
            )
        }  


        const changeNameResponse = this.props.changeNameResponse;
        if(changeNameResponse && changeNameResponse.is_success) {
            changeNameResponse.is_success = false;

            const token =  changeNameResponse.access_token;
            localStorage.setItem('access_token', token);

            this.props.requestApiGetInfo();
        }
    }

    onChangeName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    onDiscardChange = () => {
        this.setState({
            onediting: false,
            name: this.state.user.name
        })
    }

    onApplyNewName = () => {
        const name = this.state.name.trim();
        if(!name) return this.onDiscardChange();
        if(name == this.state.user.name) return this.onDiscardChange();

        this.props.requestApiChangeName(name);
    }


    render() {
        return (
            <>
                <NavBarComponent />
                <div>
                    <div>
                        {
                            !this.state.user? <div style={{ padding:'160px 0px' }}>Không tìm thấy thông tin</div> :
                            <div style={{ padding: 30 }}>
                                <h3>Thông tin tài khoản Academy của bạn</h3>
                                <div style={{ 
                                    fontSize: '25px',
                                    fontWeight: 'bold',
                                    }}>
                                    <Input placeholder="Ho va ten" 
                                        maxLength='250'
                                        style={{
                                            margin: '25px 10px',
                                            fontSize: '25px',
                                            fontWeight: 'bold',
                                            width: '300px',
                                            textAlign: 'center'
                                        }}
                                        onChange={this.onChangeName}
                                        disabled={!this.state.onediting}
                                        value={this.state.name} />
                                    {
                                        this.state.onediting? 
                                        <>
                                            <a onClick={this.onApplyNewName}>
                                                <CheckOutlined style={{color: 'green', marginLeft: 20 }}/>
                                            </a>
                                            <a onClick={this.onDiscardChange}>
                                                <CloseOutlined style={{color: 'red', marginLeft: 20 }}/>
                                            </a>
                                        </>: 
                                        <a onClick={() => this.setState({ onediting: true })}><EditOutlined /></a>
                                    }
                                </div>
                                <table style={{
                                    textAlign: 'left', 
                                    position: 'relative', 
                                    left: '50%', 
                                    transform: 'translateX(-50%)'
                                }}>
                                    <tr style={{  lineHeight: 2 }}>
                                        <td style={{ fontSize: '20px' }}>Mã tài khoản: </td>
                                        <td style={{ fontSize: '20px', paddingLeft: 20 }}>{ this.state.user.id }</td>
                                    </tr>
                                    <tr style={{  lineHeight: 2 }}>
                                        <td style={{ fontSize: '20px' }}>Địa chỉ Email: </td>
                                        <td style={{ fontSize: '20px', paddingLeft: 20 }}>{ this.state.user.email }</td>
                                    </tr>
                                    <tr style={{  lineHeight: 2 }}>
                                        <td style={{ fontSize: '20px' }}>Loại tài khoản: </td>
                                        <td style={{ fontSize: '20px', paddingLeft: 20 }}>{ this.state.user.role }</td>
                                    </tr>
                                    <tr style={{  lineHeight: 2 }}>
                                        <td style={{ fontSize: '20px' }}>Tình trạng: </td>
                                        <td style={{ fontSize: '20px', paddingLeft: 20 }}>
                                            { this.state.user.is_active? 'Đã kích hoạt': 'Chưa kích hoạt' }
                                        </td>
                                    </tr>
                                    <tr style={{  lineHeight: 2 }}>
                                        <td style={{ fontSize: '20px' }}></td>
                                        <td style={{ paddingLeft: 20 }}>
                                            {
                                                !this.state.user.is_active && 
                                                <Link to={`/verify/${btoa(this.state.user.email)}`}>
                                                    Nhấn để kích hoạt
                                                </Link>
                                            }
                                        </td>
                                    </tr>
                                </table>
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
        requestApiGetInfo: () => dispatch(requestApiGetInfo()),
        requestApiChangeName: (body) => dispatch(requestApiChangeName(body))
    };
}

const mapStateToProps = state => ({
    getInfoResponse: state.requestGetInfoReducer,
    changeNameResponse: state.requestChangeNameReducer
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(InfoPage))
