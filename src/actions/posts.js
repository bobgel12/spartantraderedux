import C from '../constants';
import { database } from '../firebaseApp';
import * as firebase from 'firebase';

const postsRef = database.ref('Books');

// #4.1 Add a item into a user wishlist given the user's ID and the item's ID
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
			null
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

// #4.2 Function to get the wishlist of the given user's ID
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

// #4.3 Function to rate a user given the message, rate value, target user's ID
export const rate = (rateNum, rateMes, uid) => {
	return (dispatch, getState) => {
		dispatch({ type: C.POST_AWAIT_CREATION_RESPONSE });
		const state = getState();
		const rateRef = database.ref('Users/' +uid+ "/rateDetails/");
		const rateRef2 = database.ref('Users/' +uid+ "/data");

		const rate = {
			rate: rateNum,
			user: state.auth.uid,
			message: rateMes
		}
		rateRef.push(rate, (error) =>{
			if (error) {
				dispatch({
					type: C.FEEDBACK_DISPLAY_ERROR,
					error: `Rate failed! ${error}`
				});
			} else{
				dispatch({
					type: C.FEEDBACK_DISPLAY_MESSAGE,
					message: 'Rate Done!'

				});
			}
		});

		var average = 0;

		rateRef.once("value", (snapshot)=>{
			let sum = 0;
			let count = 0;
			Object.keys(snapshot.val()).map((rateObject)=>{
				console.log(snapshot.val()[rateObject]);
				sum += snapshot.val()[rateObject].rate;
				count++;
			});
			average = (sum/count).toFixed(1);
			rateRef2.update({
				"rating": average
			});
		});

	};
}

// #4.4 Function to get the posts given condition.
export const listenToPosts = () => {
	return (dispatch, getState) => {
		postsRef.off();
		const state = getState();
		if(state.filter.searchValue != ''){
			// set the value to lower case when posting must set to lower case as well
			// let searchValue = state.filter.searchValue.toLowerCase();
			let searchValue = state.filter.searchValue;
			postsRef.orderByChild('title').startAt(searchValue).endAt(searchValue + "uf8ff").once("value", (snapshot) => {
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
		} else if(state.filter.filter != C.FILTER_BY_NONE){
			postsRef.off();
			switch(state.filter.filter){
				case C.FILTER_BY_HIGH_LOW:
					null;
				case C.FILTER_BY_LOW_HIGH:
					null;
				case C.FILTER_BY_OLD_NEW:
					postsRef.orderByChild("date").once('value', (snapshot) => {
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
				case C.FILTER_BY_NEW_OLD:
					postsRef.orderByChild("reverseDate").once('value', (snapshot) => {
						// Use snapshot.forEach because javascript object doesnt have order. Put them in a different object.
						console.log(snapshot.val());
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
				case C.FILTER_BY_ENGINEERING:
					null;
				case C.FILTER_BY_BUSINESS:
					null;
				case C.FILTER_BY_BIOLOGY:
					null;
				case C.FILTER_BY_SOCIOLOGY:
					null;
				case C.FILTER_BY_ENGLISH:
					null;
				case C.FILTER_BY_ACCOUNTING:
					null;
				case C.FILTER_BY_OTHER:
					null;
				case C.FILTER_BY_ISBN:
					null;
			}
		} else {
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
		}
	};
};

// #4.5 Function to submit a new book given the contents of the newly created book
export const submitPost = (contents) => {
	return (dispatch, getState) => {
		const state = getState();
		let timestamp = firebase.database.ServerValue.TIMESTAMP
		const post = {
			title: contents.title,
			major: contents.major,
			isbn: contents.isbn,
			description: contents.description,
			price: contents.price,
			date: timestamp,
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
		let newPostKey = postsRef.push(post, (error) => {
			dispatch({ type: C.POST_RECEIVE_CREATION_RESPONSE });
			if (error) {
				dispatch({
					type: C.FEEDBACK_DISPLAY_ERROR,
					error: `Submission failed! ${error}`
				});
			} else {
				userRef.on('value', (snapshot) =>{
					if(!snapshot.val()){
						userRef.set(user, (error) =>{
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
		})
		// Get the inverse date for reverse search.
		newPostKey.then(()=>{
			console.log(newPostKey.key);
			postsRef.child(newPostKey.key).once("value", (snapshot)=>{
				console.log(snapshot.val().date*-1);
				newPostKey.update({ reverseDate: snapshot.val().date * -1 })
			})
		})
	};
};

// #4.6 Function to edit a post given the key of id of the post being edited
export const editPost = (contents, key) => {
	return (dispatch, getState) => {
		const state = getState();
		const post = {
			title: contents.title,
			major: contents.major,
			isbn: contents.isbn,
			description: contents.description,
			price: contents.price,
			date: firebase.database.ServerValue.TIMESTAMP,
			userPhoto: state.auth.photo,
			username: state.auth.username,
			uid: state.auth.uid,
		};

		const editBookRef = database.ref(`Books/${key}`);

		dispatch({ type: C.POST_AWAIT_CREATION_RESPONSE });
		editBookRef.update(post, (error)=>{
			if (error) {
				dispatch({
					type: C.FEEDBACK_DISPLAY_ERROR,
					error: `Edit failed! ${error}`
				});
			} else {
				dispatch({
					type: C.FEEDBACK_DISPLAY_MESSAGE,
					message: 'Post successfully changed!'
				});
			}
		});
	};
};

// #4.7 Function to delete a post given the post's ID
export const deletePost = (qid) => {
	return (dispatch) => {
		const itemRef = database.ref(`Books/${qid}/favoritesUser/`);
		itemRef.once('value', (snapshot) => {
			if(snapshot.val()){
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
			}
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

// #4.8 Functon to delete an item in the user's wishlist given the item's id and the user's ID
export const deleteWishlist = (qid, uid, qidReal) => {
	return (dispatch) => {
		const wishListRef = database.ref('Users/' + uid + '/wishList');
		const itemRef = database.ref(`Books/${qidReal}/favoritesUser/`);
		console.log(qidReal);
		itemRef.once('value', (snapshot)=>{
			if(snapshot.val()){
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
			}
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
