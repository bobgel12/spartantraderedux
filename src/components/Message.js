import React, { Component } from 'react';
import { Card, CardHeader } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


import { connect } from 'react-redux';
import { deletePost } from '../actions/posts';
import { sendMessage, listenToMessage } from '../actions/message';
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

const rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Reply</MenuItem>
        <MenuItem>Forward</MenuItem>
        <MenuItem>Delete</MenuItem>
    </IconMenu>
);



class Message extends Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            content: ""
        };
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
        this.props.listenToMessage(this.props.match.params.qid, this.props.match.params.toid);
    }

    render(){
        return(
        <div>
            <Card style={styles.card}>
                <div className="row">
                    <div className="col-sm-12 col-md-4 container1">
                        <List >
                            <Subheader>Messages</Subheader>
                            <ListItem
                                leftAvatar={<Avatar src={this.props.auth.photo} />}
                                rightIconButton={rightIconMenu}
                                primaryText="Brendan Lim"
                                secondaryText={
                                    <p>
                                        <span style={{ color: darkBlack }}>Brunch this weekend?</span><br />
                                        I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?</p>
                                }
                                secondaryTextLines={2}
                            />
                            <Divider inset={true} />
                            <ListItem
                                leftAvatar={<Avatar src={this.props.auth.photo} />}
                                rightIconButton={rightIconMenu}
                                primaryText="me, Scott, Jennifer"
                                secondaryText={
                                    <p>
                                        <span style={{ color: darkBlack }}>Summer BBQ</span><br />
                                        Wish I could come, but I&apos;m out of town this weekend.</p>
                                }
                                secondaryTextLines={2}
                            />
                            <Divider inset={true} />
                            <ListItem
                                leftAvatar={<Avatar src={this.props.auth.photo} />}
                                rightIconButton={rightIconMenu}
                                primaryText="Grace Ng"
                                secondaryText={
                                    <p>
                                        <span style={{ color: darkBlack }}>Oui oui</span><br />
                                        Do you have any Paris recs? Have you ever been? </p>
                                }
                                secondaryTextLines={2}
                            />
                            <Divider inset={true} />
                            <ListItem
                                leftAvatar={<Avatar src={this.props.auth.photo} />}
                                rightIconButton={rightIconMenu}
                                primaryText="Kerem Suer"
                                secondaryText={
                                    <p>
                                        <span style={{ color: darkBlack }}>Birthday gift</span><br />
                                        Do you have any ideas what we can get Heidi for her birthday? How about a pony?</p>
                                }
                                secondaryTextLines={2}
                            />
                            <Divider inset={true} />
                            <ListItem
                                leftAvatar={<Avatar src={this.props.auth.photo} />}
                                rightIconButton={rightIconMenu}
                                primaryText="Raquel Parrado"
                                secondaryText={
                                    <p>
                                        <span style={{ color: darkBlack }}>Recipe to try</span><br />
                                        We should eat this: grated squash. Corn and tomatillo tacos.</p>
                                }
                                secondaryTextLines={2}
                            />
                        </List>
                    </div>
                    <div className= "col-sm-12 col-md-8 ">
                        <List>
                                <CardHeader
                                    title="Nhi Le"
                                    subtitle="ItemName"
                                    avatar={this.props.auth.photo}
                                />
                                {   
                                    this.props.message.data ?
                                    Object.keys(this.props.message.data).map((qid) => {
                                        return (
                                        <div key={qid}>
                                            <p>
                                                    {this.props.message.data[qid].username} : {this.props.message.data[qid].content}
                                            </p>    
                                        </div>
                                        );
                                    })
                                    : null
                                }
                                <TextField
                                    style = {styles.inputText}
                                    // hintText="Text"
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
    deletePost, sendMessage, listenToMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);