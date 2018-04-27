import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Card from 'material-ui/Card';
import Snackbar from 'material-ui/Snackbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import { deletePost, addWishlist, listenToWishList, editPost } from '../actions/posts';
import { sendMessage, listenToMessage, getMessageList } from '../actions/message';
import { Link } from 'react-router-dom';


const style = {
    height: 300,
    width: "100%",
    margin: 0,
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
};


class EditPost extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.state = {
            contents: {
                title: this.props.posts[this.props.match.params.id].title,
                isbn: this.props.posts[this.props.match.params.id].isbn,
                price: this.props.posts[this.props.match.params.id].price,
                major: this.props.posts[this.props.match.params.id].major,
                description: this.props.posts[this.props.match.params.id].description
            },
            item: this.props.posts[this.props.match.params.id],
            require: '',
            submited: false
        };
    }

    onChange(e) {
        this.setState(
            Object.assign(this.state.contents, {
                [e.target.name]: e.target.value
            })
        )
    }

    handleChangeMajor(event, index, value) {
        this.setState(
            Object.assign(this.state.contents, {
                major: value
            })
        )
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.contents.title !== '' && this.state.contents.price !== '' && this.state.contents.major !== '' && this.state.contents.description !== '' && this.state.contents.isbn !== '') {
            this.props.editPost(this.state.contents, this.props.match.params.id);
            this.setState(
                {
                    contents: {
                        title: '',
                        isbn: '',
                        price: '',
                        major: '',
                        description: ''
                    },
                    submited: true,
                    require: ""
                }
            );
        } else {
            this.setState({
                require: 'Please enter all fields'
            })
        }
    }

    handleRequestClose() {
        this.setState(Object.assign({}, this.state, {
            submited: false
        }));
    }

    render() {
        return (
            <div className="container">
                <Card style={style}>
                    <Snackbar
                        open={this.state.submited}
                        message="Book Edited!"
                        autoHideDuration={4000}
                        onRequestClose={this.handleRequestClose}
                        style={{ color: 'green' }}
                    />
                    <form onSubmit={this.onSubmit}>
                        <TextField
                            hintText="Enter Book Title"
                            name="title"
                            onChange={this.onChange}
                            value={this.state.contents.title}
                            errorText={this.state.require}
                        />
                        <TextField
                            hintText="ISBN"
                            name="isbn"
                            onChange={this.onChange}
                            value={this.state.contents.isbn}
                            errorText={this.state.require}
                        />
                        <TextField
                            hintText="Price"
                            name="price"
                            onChange={this.onChange}
                            value={this.state.contents.price}
                            errorText={this.state.require}
                        />
                        <TextField
                            hintText="Description"
                            name="description"
                            onChange={this.onChange}
                            value={this.state.contents.description}
                            errorText={this.state.require}
                        />
                        <DropDownMenu value={this.state.contents.major} onChange={this.handleChangeMajor} style={{ width: 300 }}
                            autoWidth={false}>
                            <MenuItem value={"Engineering"} primaryText="Engineering" />
                            <MenuItem value={"Business"} primaryText="Business" />
                            <MenuItem value={"Computer Science"} primaryText="Computer Science" />
                            <MenuItem value={"Socialology"} primaryText="Socialology" />
                            <MenuItem value={"Other"} primaryText="Other" />
                        </DropDownMenu>
                        {/* <Link to='/' style={{ textDecoration: "none" }}> */}
                            <RaisedButton style={{ marginBottom: '0', width: '60%' }} label="Save Changes" type="submit" primary={true} />
                        {/* </Link> */}
                    </form>
                </Card>
            </div>
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
    deletePost, addWishlist, listenToMessage, sendMessage, listenToWishList, editPost
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
