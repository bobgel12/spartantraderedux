import React, { Component } from 'react';
import { Card, CardHeader } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router-dom';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

import { connect } from 'react-redux';
import { deletePost } from '../actions/posts';
import { sendMessage, listenToMessage, getMessageList } from '../actions/message';
import { getUser } from '../actions/auth';


import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { grey400, darkBlack } from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';


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
        margin:  "10 0 auto auto"
    },
    inputText:{
        marginTop: "60vh"
    }
};


const iconButtonElement = (
    <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
    >
        <MoreVertIcon color={grey400} />
    </IconButton>
);


class Message extends Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        if (this.props.match) {
            this.state = {
                content: "",
                qid: this.props.match.params.qid,
                toid: this.props.match.params.toid
            };
        } else{
            this.state = {
                content: ""
            }
        }
    }

    onChange(e) {
        this.setState(
            {
                content: e.target.value
            }
        );
    }
    onSubmit(e) {
        e.preventDefault();
        this.props.sendMessage(this.state.content, this.props.match.params.qid, this.props.match.params.toid);
        this.setState(
            {
                content: ""
            }
        );
    }
    
    componentWillMount(){
        this.props.getMessageList();
        if (this.props.match){
            this.setState(Object.assign({}, this.state, {
                qid: this.props.match.params.qid,
                toid: this.props.match.params.toid
            }))
            this.props.listenToMessage(this.state.qid, this.state.toid);
        }
    }

    componentWillUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.onRouteChanged();
        }
    }

    onRouteChanged() {
        console.log("ROUTE CHANGED");
        if(this.props.match){
            this.setState(Object.assign({}, this.state, {
                qid: this.props.match.params.qid,
                toid: this.props.match.params.toid
            }))
            this.props.listenToMessage(this.state.qid, this.state.toid);
        }
    }
    
    render(){
        console.log(this.props.message.data)
        return(
        <div>
            <Card style={styles.card}>
                <div className="row">
                    <div className="col-sm-12 col-md-3 container1">
                        <Subheader>Messages</Subheader>
                        <List >
                                {
                                    this.props.message.messageList ?
                                        Object.keys(this.props.message.messageList).map((qid) => {
                                            return (
                                                <Link key={qid} to={`/message/${this.props.message.messageList[qid].itemId}/${this.props.auth.uid}/${this.props.message.messageList[qid].uid}`}>
                                                    <Divider inset={true} />
                                                    <ListItem
                                                        leftAvatar={<Avatar src={this.props.message.messageList[qid].UserPhoto} />}
                                                        rightIcon={<CommunicationChatBubble />}
                                                        primaryText={this.props.message.messageList[qid].Username}
                                                    />
                                                </Link>
                                            );
                                        })
                                        : null
                                }
                        </List>
                    </div>
                    <div className= "col-sm-12 col-md-9 ">
                        <List>
                                {   
                                    this.props.message.data ?
                                    Object.keys(this.props.message.data).map((qid) => {
                                        return (
                                                <ListItem
                                                    key = {qid}
                                                    disabled={true}
                                                    leftAvatar={<Avatar src={this.props.message.data[qid].sendUserPhoto} />}
                                                    primaryText={ this.props.message.data[qid].content }
                                                >
                                                </ListItem>
                                            );
                                        })  
                                   : null
                                }

                                <TextField
                                    style = {styles.inputText}
                                    fullWidth={true}
                                    floatingLabelText="Message"
                                    name="title"
                                    onChange={this.onChange}
                                    value={this.state.content}
                                />
                                <RaisedButton onClick={this.onSubmit} label="Primary" primary={true} style = {styles.buttonStyle} />
                        </List>
                    </div>
                </div>
            </Card>
        </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.auth,
        message: state.message
    };
};

const mapDispatchToProps = {
    deletePost, sendMessage, listenToMessage, getMessageList
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);