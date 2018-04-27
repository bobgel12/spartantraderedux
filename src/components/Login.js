import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import {RaisedButton , FlatButton} from 'material-ui';
import Card from 'material-ui/Card';
import {connect} from 'react-redux';
import {loginWithFaceBook, loginWithGoogle, logoutUser} from '../actions/auth';
import {Link} from 'react-router-dom';


class Login extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="container loginFrame">
                <div className="row">
                    <div className="loginPic col-sm-12 col-md-4">
                    </div>
                    <div className="loginBottom col-sm-12 col-md-6">
                        <h2>Spartan Trade</h2>
                        <div style={{marginTop: '30px'}}>
                            <Link to={`/`}>
                                <RaisedButton
                                target="_blank"
                                label = "Continue with Facebook"
                                secondary={true}
                                icon={<i className="fab fa-facebook-f fa-lg"></i>}
                                onClick = {this.props.loginWithFaceBook}
                                />
                            </Link>
                        </div>
                        <div style={{marginTop: '30px'}}>
                            <Link to={`/`}>
                                <RaisedButton
                                target="_blank"
                                label = "Continue with Google"
                                secondary={true}
                                icon={<i className="fab fa-google fa-lg"></i>}
                                onClick = {this.props.loginWithGoogle}
                                />
                            </Link>
                        </div>
                        <div>
                            <Link to={`/`}>
                                <RaisedButton primary = {true} label="Login with email"/>
                            </Link>
                            <Link to={`/register`}>
                                <RaisedButton style={{marginLeft: '20px', marginTop: '20px'}}primary = {true} label="Register"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {auth: state.auth};
}

const mapDispatchToProps = {
    loginWithGoogle, loginWithFaceBook
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
