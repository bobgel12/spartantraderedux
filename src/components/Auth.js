import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

import { Link } from 'react-router-dom';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginWithGoogle, logoutUser } from '../actions/auth';
import C from '../constants';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';



class Auth extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let auth  = this.props.auth;
    console.log(auth);
    return (
      <AppBar
        iconElementLeft={
          <div>
            <Link to='/'><IconButton >icon={<i className="material-icons md-18">code</i>}</IconButton></Link>
            <span className="d-none d-sm-inline-flex" style={{marginRight: 10}}>SpartanTrade  </span>
            <TextField
              hintText="Spartan Trade"
              name="search"
            />
          </div>
        }
        iconElementRight={
          auth.status == C.AUTH_LOGGED_IN ?
            <div>
              <div className="d-none d-sm-inline-flex">
                <Link to='/message/'><IconButton >icon={<i className="material-icons">forum</i>}</IconButton></Link>
                <Link to={`/profile/${auth.uid}`}><Avatar src={auth.photo} /></Link>
                <FlatButton onClick={this.props.logoutUser} label="Log Out" />
              </div>
              <div className="d-inline-flex d-sm-none">
                <IconMenu
                  iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                  anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                  targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                > 
                  <Link to='/message/' style={{textDecoration: "none"}}><MenuItem primaryText="Message" /></Link>
                  <MenuItem primaryText="Sign out" onClick={this.props.logoutUser} />
                </IconMenu>
              </div>
            </div>
            :
            <div>
              <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              >
                <Link to='/login' style={{ textDecoration: "none" }}><MenuItem primaryText="Sign In" /></Link>
              </IconMenu>
            </div>
        }
      />
    )
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
}

const mapDispatchToProps = {
  loginWithGoogle,
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
