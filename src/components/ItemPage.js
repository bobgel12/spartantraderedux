import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
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
        super(props)
    }

    render() {
        if (this.props.id === 'mini') {
            return (
                <CardText>
                    {this.props.item.title}
                </CardText>
            );
        }
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
                    <img src="images/nature-600-337.jpg" alt="" />
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
        auth: state.auth
    };
};

const mapDispatchToProps = {
    deletePost, addWishlist
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
