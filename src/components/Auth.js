import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openAuth, logoutUser } from '../actions/auth';
import C from '../constants';

class Auth extends Component {
  getJSX(props) {
    switch (props.auth.status) {
      case C.AUTH_LOGGED_IN: return (
        <AppBar
          title="SpartanTrade"
          iconElementRight={
            <List>
              <ListItem
                disabled={true}
                children={
                  <div>
                    <Avatar src={props.auth.photo} />
                    <FlatButton onClick={props.logoutUser} label="Log Out" />
                  </div>
                }
                />
            </List>
          }
          user={props.auth}
        />
      )
      case C.AUTH_AWAITING_RESPONSE: return (
        <AppBar
          title="SpartanTrade"
          iconElementRight={<FlatButton onClick={props.openAuth} label="Log in" />}
          />
      );
      default: return(
        <AppBar
          title="SpartanTrade"
          iconElementRight={<FlatButton onClick={props.openAuth} label="Log in" />}
          />
      );
    }
  }
  render() {
    return this.getJSX(this.props);
  }
}

const mapStateToProps = (state) => {
  return {auth: state.auth};
}

const mapDispatchToProps = {
	openAuth,
	logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
