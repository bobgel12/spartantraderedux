import C from '../constants';
import { database } from '../firebaseApp';
import * as firebase from 'firebase';

export const sendMessage = (message, qid, touid) => {
    return (dispatch, getState) => {
        const state = getState();
        console.log(touid);
        console.log(state.auth.uid);
        let conversationID = touid + state.auth.uid;
        console.log(conversationID);
        const mesRef = database.ref('Users/' + state.auth.uid + '/message/' + qid + "/" + touid);
        const consRef = database.ref('Users/' + state.auth.uid + '/conservations/');
        const consOtherRef = database.ref('Users/' + touid + '/conservations/');
        dispatch({ type: C.MESSAGE_AWAIT_CREATION_RESPONSE});
        const myconversation = {
            itemID: qid,
            toUserID: touid
        }
        const otherconversation = {
            itemID: qid,
            toUserID: state.auth.uid
        }
        const mesItem = {
            itemID: qid,
            content: message,
            date: firebase.database.ServerValue.TIMESTAMP,
            from: state.auth.uid,
            username: state.auth.username,
            to: touid
        }
        mesRef.push(mesItem, (error) =>{
            dispatch({ type: C.MESSAGE_RECEIVE_CREATION_RESPONSE});
            if (error){
                dispatch({
                    type: C.MESSAGE_RECEIVE_DATA_ERROR,
                    error: `Send failed! ${error}`
                });
            } else {
                consRef.push(myconversation, (error) =>{
                    if(error){
                        console.log(error);
                    }
                });
                consOtherRef.push(otherconversation, (error) =>{
                    if(error){
                        console.log(error);
                    }
                });
                dispatch({
                    type: C.FEEDBACK_DISPLAY_MESSAGE,
                    message: 'Message successfully sent!'
                });
            }
        });
    }
}

export const listenToMessage = (qid, touid) => {
    return (dispatch, getState) => {
        const state = getState();
        const mymesRef = database.ref('Users/' + state.auth.uid + '/message/' + qid + "/" + touid);
        const yourmesRef = database.ref('Users/' + touid + '/message/' + qid + "/" + state.auth.uid);
        let mes = [];
        mymesRef.on('value', (snapshot) => {
            mes = snapshot.val();
        }, (error) => {
            dispatch({
                type: C.MESSAGE_RECEIVE_DATA_ERROR,
                message: error.message
            });
        });
        yourmesRef.on('value', (snapshot) => {
            mes = mes + snapshot.val();
        }, (error) => {
            dispatch({
                type: C.MESSAGE_RECEIVE_DATA_ERROR,
                message: error.message
            });
        });
        console.log(mes);
        dispatch({
            type: C.MESSAGE_RECEIVE_DATA,
            data: mes
        });
    };
};
