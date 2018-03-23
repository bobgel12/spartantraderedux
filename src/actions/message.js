import C from '../constants';
import { database } from '../firebaseApp';

export const sendMessage = (message, touid) => {
    return (dispatch, getState) => {
        const state = getState();
        const currentdate = new Date();
        const userCom = database.ref('Users/' + state.auth.uid + '/message/');
        const mesRef = database.ref('messages/')
        dispatch({ type: C.MESSAGE_AWAIT_CREATION_RESPONSE});
        mesItem = {
            content: message,
            date: currentdate,
            from: state.auth.uid,
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
                dispatch({
                    type: C.FEEDBACK_DISPLAY_MESSAGE,
                    message: 'Message successfully sent!'
                });
                userCom.push(uid, (error) => {
                    if (error) {
                        dispatch({
                            type: C.MESSAGE_RECEIVE_DATA_ERROR,
                            error: `uid save failed! ${error}`
                        });
                    } else {
                        dispatch({
                            type: C.FEEDBACK_DISPLAY_MESSAGE,
                            message: 'Uid successfully save!'
                        });
                    }
                });
            }
        });
        

    }
}