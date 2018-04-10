import C from '../constants';
import { database } from '../firebaseApp';
import * as firebase from 'firebase';

const postsRef = database.ref('Books');

export const addWishlist = (qid, uid) => {
	return (dispatch) => {
		const wishListRef = database.ref('Users/'+uid+'/wishList');
		let check = false;
		wishListRef.on('value', (snapshot) =>{
			snapshot.val() ?
				Object.keys(snapshot.val()).map((oldQid) =>{
					if (qid === snapshot.val()[oldQid]) {
						check = true;
					}
					return null;
				})
			:
			console.log("There is no wishlist");
		});
		if (!check){
			const itemRef = database.ref(`Books/${qid}/favoritesUser/`).push(uid);
			wishListRef.push((qid), (error) =>{
				if (error) {
					dispatch({
						type: C.WISHLIST_RECEIVE_DATA_ERROR,
						message: error.message
					});
				}
				dispatch({
					type: C.FEEDBACK_DISPLAY_MESSAGE,
					message: 'WishList successfully saved!'
				});
			});
		} else {
			dispatch({
				type: C.WISHLIST_RECEIVE_DATA_ERROR,
				message: "This Item has already in your WishList!"
			});
		}
	}
}

export const listenToWishList = (uid) => {
	return (dispatch) => {
		const wishListRef = database.ref('Users/'+ uid+'/wishList');
		wishListRef.on('value', (snapshot) => {
			dispatch({
				type: C.WISHLIST_RECEIVE_DATA,
				data: snapshot.val()
			});
		}, (error) => {
			dispatch({
				type: C.WISHLIST_RECEIVE_DATA_ERROR,
				message: error.message
			});
		});
	};
};



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
		const post = {
			title: contents.title,
			major: contents.major,
			description: contents.description,
			price: contents.price,
			date: firebase.database.ServerValue.TIMESTAMP,
			userPhoto: state.auth.photo,
			username: state.auth.username,
			uid: state.auth.uid,
		};

		const userRef = database.ref('Users/' + state.auth.uid+ '/data');
		const user = {
			userPhoto: state.auth.photo,
			username: state.auth.username,
			rating: 5,
			uid: state.auth.uid
		}

		dispatch({ type: C.POST_AWAIT_CREATION_RESPONSE });
		postsRef.push(post, (error) => {
			dispatch({ type: C.POST_RECEIVE_CREATION_RESPONSE });
			if (error) {
				dispatch({
					type: C.FEEDBACK_DISPLAY_ERROR,
					error: `Submission failed! ${error}`
				});
			} else {
				userRef.on('value', (snapshot) =>{
					if(!snapshot.val()){
						userRef.push(user, (error) =>{
							if(error){
								dispatch({
									type: C.FEEDBACK_DISPLAY_ERROR,
									error: `Save User Error! ${error}`
								});
							}
						});
					} 
					return null;
				});
				dispatch({
					type: C.FEEDBACK_DISPLAY_MESSAGE,
					message: 'Submission successfully saved!'
				});
			}
		});
	};
};


export const deletePost = (qid) => {
	return (dispatch) => {
		// TODO delete wishlist in the user ref as well
		const itemRef = database.ref(`Books/${qid}/favoritesUser/`);

		itemRef.once('value', (snapshot) => {
			console.log(snapshot.val());
			Object.keys(snapshot.val()).map((item) => {
				let user = snapshot.val()[item];
				let userRef = database.ref('Users/' + user + '/wishList');
				userRef.once('value', (snapshot1)=>{
					Object.keys(snapshot1.val()).map((item)=>{
						if (snapshot1.val()[item] === qid){
							userRef.child(item).remove((error)=>{
								if (error) {
									dispatch({
										type: C.FEEDBACK_DISPLAY_ERROR,
										error: `Deletion failed! ${error}`
									});
								}
								dispatch({
									type: C.FEEDBACK_DISPLAY_MESSAGE,
									message: 'Post successfully deleted!'
								});
							})
							console.log('here1!');
						}
					})
				})
			})
		})

		postsRef.child(qid).remove((error) => {
			if (error) {
				dispatch({
					type: C.FEEDBACK_DISPLAY_ERROR,
					error: `Deletion failed! ${error}`
				});
			}
			dispatch({
				type: C.FEEDBACK_DISPLAY_MESSAGE,
				message: 'Post successfully deleted!'
			});
		});
	};
};


export const deleteWishlist = (qid, uid, qidReal) => {
	return (dispatch) => {
		const wishListRef = database.ref('Users/' + uid + '/wishList');
		const itemRef = database.ref(`Books/${qidReal}/favoritesUser/`);
		console.log(qidReal);
		itemRef.once('value', (snapshot)=>{
			console.log(snapshot.val());
			Object.keys(snapshot.val()).map((item)=>{
				if(snapshot.val()[item] === uid){
					itemRef.child(item).remove((error)=>{
						if (error) {
							dispatch({
								type: C.FEEDBACK_DISPLAY_ERROR,
								error: `Deletion failed! ${error}`
							});
						}
						dispatch({
							type: C.FEEDBACK_DISPLAY_MESSAGE,
							message: 'Wishlist successfully deleted!'
						});
					})
				}
			})
		})
		wishListRef.child(qid).remove((error) => {
			if (error) {
				dispatch({
					type: C.FEEDBACK_DISPLAY_ERROR,
					error: `Deletion failed! ${error}`
				});
			}
			dispatch({
				type: C.FEEDBACK_DISPLAY_MESSAGE,
				message: 'Wishlist successfully deleted!'
			});
		});
	};
};