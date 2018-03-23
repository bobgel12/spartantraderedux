import React, { Component } from 'react';
import { Card, CardHeader, CardTitle, CardText, CardActions } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';


import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import { deletePost, listenToWishList, deleteWishlist } from '../actions/posts';
import { sendMessage } from '../actions/message';
import { getUser } from '../actions/auth';


import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import { grey400, darkBlack, lightBlack } from 'material-ui/styles/colors';
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
        this.state = {
            uid: this.props.uid
        };
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
                        <List style>
                                <CardHeader
                                    title="Nhi Le"
                                    subtitle="ItemName"
                                    avatar={this.props.auth.photo}
                                />
                                <p> What's up man! </p>
                                <TextField
                                    style = {styles.inputText}
                                    hintText="Text"
                                    fullWidth={true}
                                />
                                <RaisedButton onClick={() => { this.props.sendMessage("I am a test", this.props.match.params.toid)}} label="Primary" primary={true} style = {styles.buttonStyle} />
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
    };
};

const mapDispatchToProps = {
    deletePost, sendMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);