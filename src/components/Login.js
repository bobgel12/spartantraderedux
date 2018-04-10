import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import {RaisedButton , FlatButton} from 'material-ui';
import Card from 'material-ui/Card';
import {connect} from 'react-redux';
import {openAuth, logoutUser} from '../actions/auth';


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
                        <p style={{marginTop: '30px'}}>
                            <FlatButton
                            target="_blank"
                            label = "Continue with Facebook"
                            secondary={true}
                            icon={<i class="fab fa-facebook-f fa-lg"></i>}
                            />
                        </p>
                        <p style={{marginTop: '30px'}}>
                            <FlatButton
                            target="_blank"
                            label = "Continue with Google"
                            secondary={true}
                            icon={<i class="fab fa-google fa-lg"></i>}
                            />
                        </p>
                        <p><RaisedButton primary = {true} label="Login"/><RaisedButton style={{marginLeft: '20px'}}primary = {true} label="Register"/></p>
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
    openAuth
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
