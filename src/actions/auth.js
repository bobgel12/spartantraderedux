import * as firebase from 'firebase';
import C from '../constants';
import { auth } from '../firebaseApp';
import { database } from '../firebaseApp';

import { listenToPosts } from './posts';

// #1.1 Function to get the current User to the store
export const getUser = (uid) => {
	return (dispatch) => {
		const userRef = database.ref('Users/' + uid + '/data');
		userRef.on('value', (snapshot) => {
			if (snapshot.val()){
				dispatch({
					type: C.PROFILE_USER,
					data: snapshot.val()
				})
			} 
			return null;
		});
	}
}
// #1.2 Function to check if there is a user logged in
export const listenToAuth = () => {
	return (dispatch, getState) => {
		auth.onAuthStateChanged((authData) => {
			if (authData) {
				dispatch({
					type: C.AUTH_LOGIN,
					uid: authData.uid,
					username: authData.providerData[0].displayName,
					photo: authData.providerData[0].photoURL,
				});
				const listenToPostsDispatcher = listenToPosts();
				listenToPostsDispatcher(dispatch, getState);
			} else {
				if (getState().auth.status !== C.AUTH_ANONYMOUS) {
					dispatch({ type: C.AUTH_LOGOUT });
				}
			}
		});
	};
};

// #1.3 Function to log in with Google
export const loginWithGoogle = () => {
	return (dispatch) => {
		dispatch({ type: C.AUTH_OPEN });
		const provider = new firebase.auth.GoogleAuthProvider();
		auth.signInWithPopup(provider)
			.catch((error) => {
				dispatch({
					type: C.FEEDBACK_DISPLAY_ERROR,
					error: `Login failed! ${error}`
				});
				dispatch({ type: C.AUTH_LOGOUT });
			});
	};
};

// #1.4 Function to log in with Facebook
export const loginWithFaceBook = () => {
	return (dispatch) => {
		dispatch({ type: C.AUTH_OPEN });
		const provider = new firebase.auth.FacebookAuthProvider();
		auth.signInWithPopup(provider)
			.catch((error) => {
				dispatch({
					type: C.FEEDBACK_DISPLAY_ERROR,
					error: `Login failed! ${error}`
				});
				dispatch({ type: C.AUTH_LOGOUT });
			});
	};
};

// #1.5 Function to log out
export const logoutUser = () => {
	return (dispatch) => {
		dispatch({ type: C.AUTH_LOGOUT });
		auth.signOut();
	};
};
