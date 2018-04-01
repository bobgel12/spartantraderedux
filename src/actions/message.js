import C from '../constants';
import { database } from '../firebaseApp';
import * as firebase from 'firebase';

const conversationRef = database.ref('Conversations');

export const sendMessage = (message, qid, touid) => {
    return (dispatch, getState) => {
        const state = getState();
        const sendRef = database.ref(`Users/${touid}/conversation/${state.auth.uid}/${qid}`);
        const recieveRef = database.ref(`Users/${state.auth.uid}/conversation/${touid}/${qid}`);
        const sendRefUser = database.ref(`Users/${state.auth.uid}/conversationList`);
        const receiveRefUser = database.ref(`Users/${touid}/conversationList`);
        const itemRef = database.ref(`Books/${qid}`);

        var item
        itemRef.once('value', (snapshot)=>{
            item = snapshot.val();
        })

        console.log(item);
        
        dispatch({ type: C.MESSAGE_AWAIT_CREATION_RESPONSE});

        const mesItem = {
            content: message,
            date: firebase.database.ServerValue.TIMESTAMP,
            senderUid: state.auth.uid,
            senderUsername: state.auth.username,
            sendUserPhoto: state.auth.photo
        }
        const conversation = {
            details:{
                users: {
                    user1: {
                        uid: state.auth.uid,
                        Username: state.auth.username,
                        UserPhoto: state.auth.photo
                    },
                    user2: {
                        uid: touid,
                        Username: item.username,
                        UserPhoto: item.userPhoto
                    },
                },
                itemId: qid
            },
            messages:[]
        }

        let check = false;
        var conversationRefkey = null;

        sendRef.once("value",(snapshot)=>{
            if(snapshot.exists()){
                snapshot.forEach((a) => {
                    console.log(a.key);
                    update(a.key, true);
                });
            }
            else{
                update("", false);
            }
        });

        function update(key, check2) {
            if (check2){
                conversationRef.child(key).child('messages').push(mesItem, (error) => {
                    if (error) {
                        dispatch({
                            type: C.MESSAGE_RECEIVE_DATA_ERROR,
                            error: `Send failed! ${error}`
                        });
                    } else {
                        dispatch({
                            type: C.FEEDBACK_DISPLAY_MESSAGE,
                            message: 'Message successfully sent!'
                        });
                    }
                });
            } else {
                // Get a key for a new Post.
                var newPostKey = conversationRef.push(conversation).key;
                var conversation2 = {
                    details: {
                        users: {
                            user1: {
                                uid: state.auth.uid,
                                Username: state.auth.username,
                                UserPhoto: state.auth.photo
                            },
                            user2: {
                                uid: touid,
                                Username: item.username,
                                UserPhoto: item.userPhoto
                            },
                        },
                        itemId: qid
                    },
                    conversationKey: newPostKey
                }
                receiveRefUser.push({
                    conversationKey: newPostKey,
                    itemId: qid,
                    uid: state.auth.uid,
                    Username: state.auth.username,
                    UserPhoto: state.auth.photo
                }, (error) =>{
                    if (error) {
                        dispatch({
                            type: C.MESSAGE_RECEIVE_DATA_ERROR,
                            error: `Send failed! ${error}`
                        });
                    } else {
                        dispatch({
                            type: C.FEEDBACK_DISPLAY_MESSAGE,
                            message: 'Message successfully sent!'
                        });
                    }
                })
                sendRefUser.push({
                    conversationKey: newPostKey,
                    itemId: qid,
                    uid: touid,
                    Username: item.username,
                    UserPhoto: item.userPhoto
                }, (error) =>{
                    if (error) {
                        dispatch({
                            type: C.MESSAGE_RECEIVE_DATA_ERROR,
                            error: `Send failed! ${error}`
                        });
                    } else {
                        dispatch({
                            type: C.FEEDBACK_DISPLAY_MESSAGE,
                            message: 'Message successfully sent!'
                        });
                    }
                })
                conversationRef.child(newPostKey).child('messages').push(mesItem, (error) => {
                    if (error) {
                        dispatch({
                            type: C.MESSAGE_RECEIVE_DATA_ERROR,
                            error: `Send failed! ${error}`
                        });
                    } else {
                        dispatch({
                            type: C.FEEDBACK_DISPLAY_MESSAGE,
                            message: 'Message successfully sent!'
                        });
                    }
                });
                // Write the new post's data simultaneously in the posts list and the user's post list.
                sendRef.child(newPostKey).set(conversation2, (error)=>{
                    if (error) {
                        dispatch({
                            type: C.MESSAGE_RECEIVE_DATA_ERROR,
                            error: `Send failed! ${error}`
                        });
                    } else {
                        dispatch({
                            type: C.FEEDBACK_DISPLAY_MESSAGE,
                            message: 'Message successfully sent!'
                        });
                    }
                });
                recieveRef.child(newPostKey).set(conversation2, (error)=>{
                    if (error) {
                        dispatch({
                            type: C.MESSAGE_RECEIVE_DATA_ERROR,
                            error: `Send failed! ${error}`
                        });
                    } else {
                        dispatch({
                            type: C.FEEDBACK_DISPLAY_MESSAGE,
                            message: 'Message successfully sent!'
                        });
                    }
                });
            }
        }
    }
}

export const getMessageList = () => {
    return (dispatch, getState) => {
        const state = getState();
        const conRef = database.ref(`Users/${state.auth.uid}/conversationList/`);
        var userList = ""; 
        conRef.on('value', (snapshot) => {
            dispatch({
                type: C.MESSAGE_LIST_RECEIVE_DATA,
                data: snapshot.val()
            });
        }, (error) => {
            dispatch({
                type: C.MESSAGE_RECEIVE_DATA_ERROR,
                message: error.message
            });
        });     
    }
}

export const listenToMessage = (qid, touid) => {
    return (dispatch, getState) => {
        console.log(qid)
        console.log(touid)
        const state = getState();
        const mesRef = database.ref(`Users/${state.auth.uid}/conversation/${touid}/${qid}`);
        mesRef.once('value', (snapshot) => {
            console.log(snapshot.val());
            snapshot.forEach((a) => {
                console.log(a.val().conversationKey);
                getMes(a.val().conversationKey)
            });
        });
        function getMes(id){
            conversationRef.child(id).child('messages').on('value', (snapshot)=>{
                dispatch({
                    type: C.MESSAGE_RECEIVE_DATA,
                    data: snapshot.val()
                });
            }, (error) =>{
                dispatch({
                    type: C.MESSAGE_RECEIVE_DATA_ERROR,
                    message: error.message
                });
            });
        }
    }
}
