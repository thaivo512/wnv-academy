import React, { Component } from 'react';
import { Button, Form } from 'react-bootstrap';
import '../assets/authen.scss';
import { requestApiVerify, requestApiOPT } from './redux/action';
import { connect } from 'react-redux';

class VerifyEmail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            OPT: "",
            time: {},
            seconds: 60,
            isClicked: false
        }
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    componentDidMount() {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });
    }

    //todo - User can change email in this page.
    render() {
        return (
            <Form className="auth-form verify">
                <h2 className="text-align-center">Verify Your Email</h2>
                <h5 className="text-align-center">We sent OTP to your Email.</h5>
                <Form.Group>
                    <Form.Control onChange={(e) => this.onChangeOPT(e)} type="text" placeholder="Enter OPT" />
                </Form.Group>
                <Button className="styling-of-button" variant="primary" type="button" onClick={() => this.onVerifyEmail()}> Verify </Button>
                {
                    this.state.isClicked && this.state.seconds > 0 ?
                        <Button className="styling-of-button" variant="success" type="button" disabled="true"> {this.state.seconds}</Button> :
                        <Button className="styling-of-button" variant="success" type="button" onClick={() => this.onSendOptToEmail()}> Send Again </Button>

                }

                { this.props.verifyInformation && this.props.verifyInformation.is_success ?
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Resigter is successfuly, back to <a href="/login">login</a>.</Form.Label>
                    </Form.Group>
                    :
                    <></>
                }
            </Form>
        );
    }

    onChangeOPT(e) {
        this.setState({ OPT: e.target.value })
    }

    onVerifyEmail() {
        var email = atob(this.props.match.params.emailHashed);
        var opt = this.state.OPT;
        this.props.requestApiVerify({ email, opt });
    }

    onSendOptToEmail() {
        var email = atob(this.props.match.params.emailHashed);
        this.props.requestApiOPT(email);
        this.startTimer();
        this.setState({ isClicked: true })
    }

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    startTimer() {
        if (this.timer == 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });

        if (seconds == 0) {
            clearInterval(this.timer);
            this.setState({ isClicked: false })
        }
    }
};

const mapDispatchToProps = dispatch => {
    return {
        requestApiVerify: (payload) => dispatch(requestApiVerify(payload)),
        requestApiOPT: (payload) => dispatch(requestApiOPT(payload)),
    }
}

const mapStateToProps = state => ({
    verifyInformation: state.verifyEmailReducer,
    optInformation: state.requestOPTReducer,
});

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);