import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { listenToAuth } from './actions/auth';
import { listenToPosts } from './actions/posts';
import Page from './components/Page';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default class App extends Component {
	componentWillMount() {
		// Check if there is a user logined
		store.dispatch(listenToAuth());
		// Get all the post from the database
		store.dispatch(listenToPosts());
	}
	render() {
		return (
		<MuiThemeProvider>
			<Provider store={store}>
					<Page />
			</Provider>
		</MuiThemeProvider>
		);
	}
}
