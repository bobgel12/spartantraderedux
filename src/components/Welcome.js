import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardTitle, CardMedia, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';


import { connect } from 'react-redux';
import { deletePost, addWishlist } from '../actions/posts';

const buttonStyle = {
    margin: 10,
    marginTop: 5
}

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
                  <div className="container">
                      <Card>
                          <CardHeader

                              //title={"Welcome"}


                              children={<Link to={`/posts`}>Continue</Link>}
                          />
                          <CardMedia>
                          <img src="http://www.pngmart.com/files/3/Welcome-PNG-Clipart.png" alt="" />


                        </CardMedia>
                      </Card>

                  </div>

              );
    }
}
export default Welcome;
