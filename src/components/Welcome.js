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
  margin:0,
  marginBottom: 20,
  marginTop: 20,
  textAlign: 'center',
};

class Welcome extends Component {
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
                  <div className="background">
                    <div className="row wellcome">
                      <div className="col-md-6">
                          <div className="container wellcome">
                              <Card>
                              <CardHeader

                                children={
                                  <div>
                                    <Link to={`/posts`}>Main Page </Link>
                                    <h3 className ="wellcome">
                                    Welcome to SpartanTrade
                                    </h3>

                                     <CardMedia>
                                     <img src="https://image.flaticon.com/icons/svg/53/53554.svg"height ="50" width = "50" alt="" />
                                     </CardMedia>

                                  </div>
                                }
                              />
                              </Card>
                          </div>
                      </div>
                    <div className="col-md-4">
                    <CardHeader
                    title={"Creat a new account"}
                    />
                    <form>
                      <div class="form-row">
                        <div class="form-group col-md-6">
                          <label for="last name">Last Name</label>
                          <input type="last name" class="form-control" id="lastname" placeholder="Last name"></input>
                        </div>
                        <div class="form-group col-md-6">
                          <label for="inputFirstname">First Name</label>
                          <input type="firstname" class="form-control" id="inputFirstname" placeholder="First Name"></input>
                        </div>
                      </div>
                      <div class="form-group">
                        <label for="inputEmail">Email</label>
                        <input type="text" class="form-control" id="inputEmail" placeholder="email"></input>
                      </div>
                      <div class="form-group">
                      <label for="inputPassword">Password</label>
                      <input type="text" class="form-control" id="inputPassword" placeholder="should have at least 8 characters/numbers"></input>
                      </div>
                      <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="inputSchool">School name</label>
                        <input type="text" class="form-control" id="inputSchool"></input>
                      </div>
                      </div>
                      <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="inputSchool">Major</label>
                        <input type="text" class="form-control" id="inputSchool" placeholder="Optional"></input>
                      </div>



                      </div>
                      <div class="form-group">
                      <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="gridCheck"></input>
                        <label class="form-check-label" for="gridCheck">
                          I agree with all the conditions and terms
                        </label>
                      </div>
                      </div>
                      <button type="submit" class="btn btn-primary">Sign up</button>
                      </form>

                    </div>
                  </div>
                </div>

                      // <Card>
                      //   <CardHeader
                      //       //title={"Welcome"}
                      //       title={"Creat a new account"}
                      //       //children={<Link to={`/posts`}>Continue</Link>}
                      //   />
                      //   <TextField
                      //     fullWidth = {true}
                      //     hintText="Enter your last name"
                      //     floatingLabelText="Last Name"
                      //     name="last name"
                      //   /><br />
                      //   <TextField
                      //     fullWidth = {true}
                      //     hintText="Enter your first name"
                      //     floatingLabelText="First Name"
                      //     name="first name"
                      //   /><br />
                      //   <TextField
                      //     fullWidth = {true}
                      //     hintText="Enter your email name"
                      //     floatingLabelText="email"
                      //     name="email"
                      //   /><br />
                      //   <TextField
                      //     fullWidth = {true}
                      //     hintText="Enter your school name"
                      //     floatingLabelText="school"
                      //     name="school"
                      //   /><br />
                      //   <TextField
                      //     fullWidth = {true}
                      //     hintText="Enter your major(Optional)"
                      //     floatingLabelText="major"
                      //     name="major"
                      //   /><br />
                      // <RaisedButton label="Sign up" width={50} onClick={this.onSubmit} primary = {true}/>
                      //
                      // </Card>

              );
    }
}
export default Welcome;
