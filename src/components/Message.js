import React, { Component } from 'react';
import { Card, CardHeader } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

import { connect } from 'react-redux';
import { deletePost } from '../actions/posts';
import { sendMessage, listenToMessage, getMessageList } from '../actions/message';
import { getUser } from '../actions/auth';


import TextField from 'material-ui/TextField';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
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
    },
    formStyle:{
        width: '100%',
        height: '400px',
        overflow: 'scroll'
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
        this.updateCurrentConversation = this.updateCurrentConversation.bind(this);
        this.state = {
            content: "",
            uid:"",
            qid:"",
        }
    }

    onChange(e) {
        this.setState(Object.assign({}, this.state, {
            content: e.target.value
        }));
    }
    onSubmit(e) {
        e.preventDefault();
        this.props.sendMessage(this.state.content, this.state.qid, this.state.uid);
        this.setState(Object.assign({}, this.state, {
            content:""
        }));
    }

    updateCurrentConversation(newqid, newuid){
        this.setState(Object.assign({}, this.state, {
            uid: newuid,
            qid: newqid,
        }), () => {
            this.props.listenToMessage(this.state.qid, this.state.uid);
        })
    }
    
    componentWillMount(){
        this.props.getMessageList();
    }
    
    render(){
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
                                                <ListItem
                                                    key={qid}
                                                    leftAvatar={<Avatar src={this.props.message.messageList[qid].UserPhoto} />}
                                                    rightIcon={<CommunicationChatBubble />}
                                                    primaryText={this.props.message.messageList[qid].Username}
                                                    onClick={() => { this.updateCurrentConversation(this.props.message.messageList[qid].itemId, this.props.message.messageList[qid].uid)}}
                                                />
                                            );
                                        })
                                        : null
                                }
                        </List>
                    </div>
                    <div className= "col-sm-12 col-md-9 ">
                        <List style={styles.formStyle}>
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
                        </List>
                        <form onSubmit={this.onSubmit}>
                            <TextField
                                fullWidth={true}
                                floatingLabelText="Message"
                                name="title"
                                onChange={this.onChange}
                                value={this.state.content}
                            />
                                <RaisedButton label="Submit" type="submit" primary={true} fullWidth={true} style = {styles.buttonStyle} />
                        </form>
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
        message: state.message,
        conversation: state.conversation
    };
};

const mapDispatchToProps = {
    deletePost, sendMessage, listenToMessage, getMessageList
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);