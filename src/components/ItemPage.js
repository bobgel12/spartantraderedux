import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardTitle, CardMedia, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { withRouter, Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { deletePost, addWishlist } from '../actions/posts';
import { Divider } from 'material-ui';

const style = {
    height: 324,
    width: "100%",
    margin: 0,
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
};

const buttonStyle = {
    margin: 10,
    marginTop: 5
}

class ItemPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.posts[this.props.match.params.id]
        }
        this.handleMessage = this.handleMessage.bind(this);
    }

    handleMessage = () => {
        console.log("Handle message!!");
    }

    render() {
        console.log(this.state.item)
        if (this.state.item) {
        return (
                <div className="container">
                    <Card>
                        <CardHeader
                            title={this.state.item.username}
                            subtitle="SJSU"
                            avatar={this.state.item.userPhoto}
                        />
                        <CardMedia
                            overlay={<CardTitle title={this.state.item.title} subtitle={this.state.item.price} />}
                        >
                            <img src="https://images.unsplash.com/photo-1499161033200-caf4960b7252?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d2f8580f23f2f7d06c64fab5a02dc362&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb" alt="" />
                        </CardMedia>
                        <CardText>
                            {this.state.item.description}
                        </CardText>
                        <CardActions>
                            <RaisedButton style={buttonStyle} label="Messages" primary={true} onClick ={this.handleMessage}/>
                            <RaisedButton style={buttonStyle} label="Wishlist" primary={true} onClick={this.addWishlist} />
                        </CardActions>
                    </Card>
                </div>
            
            )
        } else {
            return (null)
        }
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        posts: state.posts.data
    };
};

const mapDispatchToProps = {
    deletePost, addWishlist
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemPage);
