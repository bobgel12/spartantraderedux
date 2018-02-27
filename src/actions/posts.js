import C from '../constants';
import { database } from '../firebaseApp';

const postsRef = database.ref('books');


export const listenToPosts = () => {
	return (dispatch) => {
		postsRef.off();
		postsRef.on('value', (snapshot) => {
			dispatch({
				type: C.POSTS_RECEIVE_DATA,
				data: snapshot.val()
			});
		}, (error) => {
			dispatch({
				type: C.POSTS_RECEIVE_DATA_ERROR,
				message: error.message
			});
		});
	};
};

export const submitPost = (contents) => {
	return (dispatch, getState) => {
		const state = getState();
		var currentdate = new Date();
		var datetime = currentdate.getDate() + "/"
			                + (currentdate.getMonth()+1)  + "/"
			                + currentdate.getFullYear() + " @ "
			                + currentdate.getHours() + ":"
			                + currentdate.getMinutes() + ":"
			                + currentdate.getSeconds();
		const post = {
			title: contents.title,
			major: contents.major,
			description: contents.description,
			price: contents.price,
			date: datetime,
			userPhoto: state.auth.photo,
			username: state.auth.username,
			uid: state.auth.uid,
		};
    //
		// postsRef.push(post, (error) =>{
		// 	if (error) {
		// 		console.log(error)
		// 	}
		// })

		dispatch({ type: C.POST_AWAIT_CREATION_RESPONSE });
		postsRef.push(post, (error) => {
			dispatch({ type: C.POST_RECEIVE_CREATION_RESPONSE });
			if (error) {
				dispatch({
					type: C.FEEDBACK_DISPLAY_ERROR,
					error: `Submission failed! ${error}`
				});
			} else {
				dispatch({
					type: C.FEEDBACK_DISPLAY_MESSAGE,
					message: 'Submission successfully saved!'
				});
			}
		});
	};
};

export const startPostEdit = (qid) => {
	return (dispatch) => {
		dispatch({ type: C.POST_EDIT, qid });
	};
};

export const cancelPostEdit = (qid) => {
	return (dispatch) => {
		dispatch({ type: C.POST_EDIT_FINISH, qid });
	};
};

export const submitPostEdit = (qid, contents) => {
	return (dispatch, getState) => {
		const state = getState();
		const post = {
			contents,
			username: state.auth.username,
			uid: state.auth.uid
		};
		dispatch({ type: C.POST_EDIT_SUBMIT, qid });
		postsRef.child(qid).set(post, (error) => {
			dispatch({ type: C.POST_EDIT_FINISH, qid });
			if (error) {
				dispatch({
					type: C.FEEDBACK_DISPLAY_ERROR,
					error: `Update failed! ${error}`
				});
			} else {
				dispatch({
					type: C.FEEDBACK_DISPLAY_MESSAGE,
					message: 'Update successfully saved!'
				});
			}
		});
	};
};

export const deletePost = (qid) => {
	return (dispatch) => {
		dispatch({ type: C.POST_EDIT_SUBMIT, qid });
		postsRef.child(qid).remove((error) => {
			dispatch({ type: C.POST_EDIT_FINISH, qid });
			if (error) {
				dispatch({
					type: C.FEEDBACK_DISPLAY_ERROR,
					error: `Deletion failed! ${error}`
				});
			} else {
				dispatch({
					type: C.FEEDBACK_DISPLAY_MESSAGE,
					message: 'Post successfully deleted!'
				});
			}
		});
	};
};
