import React, { Component } from 'react';
import store from './store';
import { listenToAuth } from './actions/auth';
import { listenToPosts } from './actions/posts';
import Auth from './components/Auth';
import ItemPage from './components/ItemPage';
import Posts from './components/Posts';
import Profile from './components/Profile';

import {
	Route,
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
					<Route path="/posts/:id" component={ItemPage} />
				</Switch>
			</div>
		);
	}
}

