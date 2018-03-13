import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { listenToAuth } from './actions/auth';
import { listenToPosts, listenToWishList } from './actions/posts';
import Page from './components/Page';
import Auth from './components/Auth';
import Posts from './components/Posts';
import Profile from './components/Profile';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import {
	BrowserRouter,
	Route,
	Link,
	Redirect,
	withRouter, 
	Switch
} from "react-router-dom";




export default class App extends Component {
	componentWillMount() {
		// Check if there is a user logined
		store.dispatch(listenToAuth());
		// Get all the post from the database
		store.dispatch(listenToPosts());
		// store.dispatch(listenToWishList());
	}
	render() {
		return (
			<div>
				<Auth/>
				<Switch>
					<Route exact path='/' component={Posts} />
					<Route path='/profile' component={Profile} />
				</Switch>
			</div>
		);
	}
}

