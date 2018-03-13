import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardTitle, CardMedia, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { deletePost, addWishlist } from '../actions/posts';

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
        console.log(this.props.posts);
        console.log(this.props.posts[this.props.match.params]);
    }
    


    render() {
        return (
            <Card>
                <CardHeader
                    title="URL Avatar"
                    subtitle="Subtitle"
                    avatar="images/jsa-128.jpg"
                />
                <CardMedia
                    overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
                >
                    <img src="https://images.unsplash.com/photo-1499161033200-caf4960b7252?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d2f8580f23f2f7d06c64fab5a02dc362&dpr=1&auto=format&fit=crop&w=1000&q=80&cs=tinysrgb" alt="" />
                </CardMedia>
                <CardTitle title="Card title" subtitle="Card subtitle" />
                <CardText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </CardText>
                <CardActions>
                    <FlatButton label="Action1" />
                    <FlatButton label="Action2" />
                </CardActions>
            </Card>
        )
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
