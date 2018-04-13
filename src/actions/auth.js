import * as firebase from 'firebase';
import C from '../constants';
import { auth } from '../firebaseApp';
import { database } from '../firebaseApp';

import { listenToPosts } from './posts';

export const getUser = (uid) => {
	return (dispatch) => {
		const userRef = database.ref('Users/' + uid + '/data');
		userRef.on('value', (snapshot) => {
			console.log(snapshot.val());
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

export const logoutUser = () => {
	return (dispatch) => {
		dispatch({ type: C.AUTH_LOGOUT });
		auth.signOut();
	};
};
