import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

class ModalPage extends Component {
    state = {
      modal: false
    }
    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
      }
    render() {
      var { userName } = this.props;
        return (
                    <MDBContainer>
                    <MDBBtn onClick={this.toggle}>Remove</MDBBtn>
                    <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                        <MDBModalBody>
                        Bạn có chắc muốn xóa {userName}?
                        </MDBModalBody>
                        <MDBModalFooter>
                        <MDBBtn color="secondary" onClick={this.toggle}>Không</MDBBtn>
                        <MDBBtn color="primary">Xóa</MDBBtn>
                        </MDBModalFooter>
                    </MDBModal>
                    </MDBContainer>
                );
        }
}
      
export default ModalPage;