import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardTitle, CardMedia, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';


import { connect } from 'react-redux';
import { deletePost, addWishlist } from '../actions/posts';

const styles = {
    fonts: 'Pacifico',
    fontSize: 100,
}

const buttonStyle = {
    margin: 10,
    marginTop: 5
}

const style = {
    height: 150,
    width: 50,
    margin: 0,
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
};

class Register extends Component {
    constructor(props) {
        super(props);
    }
    handleMessage = () => {
        console.log("Handle message!!");
    }
    doneWelcome = () => {
    }

    render() {
        return (
            //left side
            <div className="container" style={{marginTop: 20}}>
                <div class="form-row">
                    <div class="form-group col-xl-12">
                        <label for="last name">Last Name</label>
                        <input type="last name" class="form-control" id="lastname" placeholder="Enter your last name"></input>
                    </div>
                    <div class="form-group col-xl-12">
                        <label for="inputFirstname">First Name</label>
                        <input type="firstname" class="form-control" id="inputFirstname" placeholder="Enter your first Name"></input>
                    </div>
                    <div class="form-group col-xl-12">
                        <label for="inputEMail">Email</label>
                        <input type="email" class="form-control" id="inputEmail" placeholder="abcd@email.com"></input>
                    </div>
                    <div class="form-group col-xl-12">
                        <label for="inputPassword">Password</label>
                        <input type="password" class="form-control" id="inputPassword" placeholder="8 characters or more "></input>
                    </div>
                    <div class="form-group col-xl-12">
                        <label for="inputPasswords">Confirm Password</label>
                        <input type="passwords" class="form-control" id="inputPasswords" placeholder="re enter your password"></input>
                    </div>
                    <div class="form-group col-xl-12">
                        <label for="inputSchool">School(Optional)</label>
                        <input type="school" class="form-control" id="inputSchool" placeholder="Enter your school name"></input>
                    </div>
                    <div class="form-group col-xl-12">
                        <label for="inputMajor">Major(Optional)</label>
                        <input type="major" class="form-control" id="inputMajor" placeholder="Enter your major"></input>
                    </div>
                    <div class="fform-group col-xl-12">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="gridCheck"></input>
                            <label class="form-check-label" for="gridCheck">
                                I agree with all the conditions and terms
                            </label>
                        </div>
                    </div>
                    <div class="form-group col-xl-12">
                        <button type="submit" class="btn btn-primary">Sign up</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    };
};

const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
