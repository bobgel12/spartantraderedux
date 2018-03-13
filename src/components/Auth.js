import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import { BrowserRouter, Route, Link } from 'react-router-dom';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { openAuth, logoutUser, toggleProfile } from '../actions/auth';
import C from '../constants';

class Auth extends Component {
  getJSX(props) {
    switch (props.auth.status) {
      case C.AUTH_LOGGED_IN: return (
        <AppBar
          title="SpartanTrade"
          iconElementLeft={
            <Link to='/'><IconButton >icon={<i className="material-icons md-18">code</i>}</IconButton></Link>
          }
          iconElementRight={
                  <div>
                    <Link to='/profile'><Avatar src={props.auth.photo}/></Link>
                    {/* <Avatar src={props.auth.photo} onClick={() => {history.push('/profile')}} /> */}
                    <FlatButton onClick={props.logoutUser} label="Log Out"/>
                  </div>
          }
          user={props.auth}
        />
      )
      case C.AUTH_AWAITING_RESPONSE: return (
        <AppBar
          title="SpartanTrade"
          iconElementLeft={<IconButton>icon={<i className="material-icons md-18">code</i>}</IconButton>}
          iconElementRight={<FlatButton onClick={props.openAuth} label="Log in" />}
          />
      );
      default: return(
        <AppBar
          title="SpartanTrade"
          iconElementLeft={<IconButton>icon={<i className="material-icons md-18">code</i>}</IconButton>}
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
  toggleProfile
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
