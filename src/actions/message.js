import C from '../constants';
import { database } from '../firebaseApp';
import * as firebase from 'firebase';

export const sendMessage = (message, qid, touid) => {
    return (dispatch, getState) => {
        const state = getState();
        const fromRef = database.ref('Users/' + state.auth.uid + '/conservations/'+qid);
        const toRef = database.ref('Users/' + touid + '/conservations/'+qid);
        dispatch({ type: C.MESSAGE_AWAIT_CREATION_RESPONSE});

        const mesItem = {
            itemID: qid,
            content: message,
            date: firebase.database.ServerValue.TIMESTAMP,
            from: state.auth.uid,
            username: state.auth.username,
            to: touid
        }
        const conversation = {
            buyer: state.auth.uid,
            seller: touid
        }

        let getsnapshot = null;
        fromRef.on('value', (snapshot) =>{
            if (snapshot.val()) {
                console.log(snapshot.val());
                Object.keys(snapshot.val()).map((item) => {
                    getsnapshot = snapshot.val()[item]
                })
                console.log(getsnapshot.key);
            }
        })

        if (getsnapshot){
            const mesRef = database.ref('Messages/conservations/'+ getsnapshot.key+'/contents');
            mesRef.push(mesItem, (error) =>{
                if (error) {
                    dispatch({
                        type: C.MESSAGE_RECEIVE_DATA_ERROR,
                        error: `Send failed! ${error}`
                    });
                } else{
                    dispatch({
                        type: C.FEEDBACK_DISPLAY_MESSAGE,
                        message: 'Message successfully sent!'
                    });
                }
            })
        } else {
            const conRef = database.ref('Messages/conservations/');
            let newCon = conRef.push(conversation, (error) =>{
                if (error){
                    dispatch({
                        type: C.MESSAGE_RECEIVE_DATA_ERROR,
                        error: `Send failed! ${error}`
                    });
                } else {
                    let conservationKey = newCon.key;
                    console.log(conservationKey);
                    const mesRef = database.ref('Messages/conservations/' + conservationKey + '/contents');
                    mesRef.push(mesItem, (error)=>{
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
                            let conversation = {
                                key: conservationKey,
                                with: touid,
                                qid: qid
                            }

                            fromRef.push({
                                key: conservationKey,
                                with: touid,
                                qid: qid
                            }, (error) => {
                                if (error) {
                                    dispatch({
                                        type: C.MESSAGE_RECEIVE_DATA_ERROR,
                                        error: `Save failed! ${error}`
                                    });
                                }
                            });
                            toRef.push({
                                key: conservationKey,
                                with: state.auth.uid,
                                qid: qid
                            }, (error) => {
                                if (error) {
                                    dispatch({
                                        type: C.MESSAGE_RECEIVE_DATA_ERROR,
                                        error: `Save failed! ${error}`
                                    });
                                }
                            });
                        }
                    })
                }
            });
        }
    }
}

export const getMessageList = () => {
    return (dispatch, getState) => {
        const state = getState();
        const conRef = database.ref('Users/' + state.auth.uid + '/conservations/');
        var conversation = "";
        conRef.once('value', (snapshot) => {
            if(snapshot.val()){
                console.log(snapshot.val());
                Object.keys(snapshot.val()).map((qid) => {
                    Object.keys(snapshot.val()[qid]).map((cid)=>{
                        console.log(snapshot.val()[qid][cid].key);
                        conversation = snapshot.val()[qid][cid].key;
                    })
                })
            }
        })
        console.log(conversation);
        
    }
}

export const listenToMessage = (qid, touid) => {
    return (dispatch, getState) => {
        const state = getState();
        dispatch({
            type: C.MESSAGE_RECEIVE_DATA,
            data: "hello"
        });
    };
};
