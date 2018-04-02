import React, { Component } from 'react';
import { Card, CardActions, CardHeader, CardTitle, CardMedia, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { connect } from 'react-redux';
import { deletePost, addWishlist } from '../actions/posts';
import { sendMessage, listenToMessage, getMessageList } from '../actions/message';


const buttonStyle = {
    margin: 10,
    marginTop: 5
}
const styles = {
    card: {
        height: "100vh",
        width: "100%",
        margin: 0,
        marginBottom: 20,
        textAlign: 'center',
    },
    headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
    },
    buttonStyle: {
        margin: "10 0 auto auto"
    },
    inputText: {
        marginTop: "60vh"
    },
    formStyle: {
        width: '100%',
        height: '400px',
        overflow: 'scroll'
    }
};

class ItemPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: this.props.posts[this.props.match.params.id],
            content: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState(
            Object.assign({}, this.state, {
                content: e.target.value
            })
        );
    }
    onSubmit(e) {
        e.preventDefault();
        this.props.sendMessage(this.state.content, this.props.match.params.id, this.state.item.uid);
        this.setState(
            Object.assign({}, this.state, {
                content: "",
            })
        );
    }

    render() {
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
                            <RaisedButton style={buttonStyle} label="Wishlist" primary={true} onClick={this.addWishlist} />
                        </CardActions>
                    </Card>
                    <div className="col-sm-12">
                        <form onSubmit={this.onSubmit}>
                            <TextField
                                fullWidth={true}
                                floatingLabelText="Message"
                                name="title"
                                onChange={this.onChange}
                                value={this.state.content}
                            />
                            <RaisedButton label="Submit" type="submit" primary={true} fullWidth={true} style={styles.buttonStyle} />
                        </form>
                    </div>
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
    deletePost, addWishlist, listenToMessage, sendMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemPage);
