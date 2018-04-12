import React, { Component } from 'react';
import { Card, CardHeader } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom';
import Chip from 'material-ui/Chip';
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
<<<<<<< HEAD
    displayMessage: {
        width: '100%',
        height: '500px',
        overflow: 'scroll',
=======
    formStyle:{
        width: '100%',
        height: '400px',
        overflow: 'scroll'
    },
    chip: {
        margin: 4,
    },
    chipright: {
        margin: 4,
        float: "right"
>>>>>>> master
    }
};

function MesItem(props) {
    return (
            <ListItem
                key={props.qid}
                disabled={true}
                leftAvatar={<Avatar size={30} src={props.photo} />}
            >
            {props.mes}
            </ListItem>
    )
}


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
<<<<<<< HEAD
        this.props.sendMessage(this.state.content, this.props.match.params.qid, this.props.match.params.toid);
        this.setState(
            {
                content: ""
            }
        );
    }
    
    handleChange(){

    }

    componentWillMount(){
        this.props.getMessageList();
        if (this.props.match){
=======
        if(this.state.content != ""){
            this.props.sendMessage(this.state.content, this.state.qid, this.state.uid);
>>>>>>> master
            this.setState(Object.assign({}, this.state, {
                content:""
            }));
        }
    }

    updateCurrentConversation(newqid, newuid){
        this.setState(Object.assign({}, this.state, {
            uid: newuid,
            qid: newqid,
        }), () => {
            this.props.listenToMessage(this.state.qid, this.state.uid);
        })
    }
<<<<<<< HEAD



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
                                                <Link  key={qid} to={`/message/${this.props.message.messageList[qid].itemId}/${this.props.auth.uid}/${this.props.message.messageList[qid].uid}`}>
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
                        <List style = {styles.displayMessage}>
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
                            <RaisedButton type="submit" label="Submit" primary={true} style = {styles.buttonStyle} />
                        </form>
                    </div>
=======
    
    componentWillMount(){
        this.props.getMessageList();
    }
    
    render(){
        if (this.props.auth.uid){
            return (
                <div>
                    <Card style={styles.card}>
                        <div className="row">
                            <div className="col-2 col-sm-2 col-md-2 col-lg-2 col-xl-2">
                                <List >
                                <Subheader>Messages</Subheader>
                                    {
                                        this.props.message.messageList ?
                                            Object.keys(this.props.message.messageList).map((qid) => {
                                                return (
                                                    <div key={qid}>
                                                        <div className="hidden-md-up">
                                                            <ListItem
                                                                style={{margin: "10px"}}
                                                                leftAvatar={<Avatar src={this.props.message.messageList[qid].UserPhoto} />}
                                                                onClick={() => { this.updateCurrentConversation(this.props.message.messageList[qid].itemId, this.props.message.messageList[qid].uid) }}
                                                            />
                                                        </div>
                                                        <div className="hidden-sm-down">
                                                            <ListItem
                                                                key={qid}
                                                                leftAvatar={<Avatar src={this.props.message.messageList[qid].UserPhoto} />}
                                                                primaryText={this.props.message.messageList[qid].Username}
                                                                onClick={() => { this.updateCurrentConversation(this.props.message.messageList[qid].itemId, this.props.message.messageList[qid].uid) }}
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            })
                                            : null
                                    }
                                </List>
                            </div>
                            <div className="col-10 col-sm-10 col-md-10 col-lg-10 col-xl-10">
                                <List style={styles.formStyle}>
                                    {
                                        this.props.message.data ?
                                            Object.keys(this.props.message.data).map((qid) => {
                                                if(this.props.message.data[qid].senderUid === this.props.auth.uid){
                                                    return(
                                                        <div>
                                                            <Chip
                                                                key={qid}
                                                                style={styles.chipright}
                                                                >
                                                                <Avatar src={this.props.message.data[qid].sendUserPhoto} />
                                                                {this.props.message.data[qid].content}
                                                            </Chip>
                                                            <div style={{clear:"both"}}></div>
                                                        </div>
                                                    )
                                                } else {
                                                    return (
                                                        <Chip
                                                            key={qid}
                                                            style={styles.chip}
                                                            >
                                                            <Avatar src={this.props.message.data[qid].sendUserPhoto} />
                                                            {this.props.message.data[qid].content}
                                                        </Chip>
                                                    );
                                                }
                                            })
                                            : null
                                    }
                                </List>
                                <form onSubmit={this.onSubmit}>
                                    <TextField
                                        style={{width: "90%"}}
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
                    </Card>
>>>>>>> master
                </div>
            )
        } else{
            return(
                null
            )
        }
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