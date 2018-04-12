import C from '../../constants';

const initialState = {
    hasReceivedData: false,
    hasReceivedMessageList: false,
    submittingNew: false,
    errorMessage: '',
    messageList: {},
    data: {},
    status: {},
    conversation: {}
};

export default (state, action) => {
    switch (action.type) {
        case C.MESSAGE_RECEIVE_DATA:
            return Object.assign({}, state, {
                hasReceivedData: true,
                data: action.data,
                errorMessage: ''
            });
        case C.MESSAGE_LIST_RECEIVE_DATA:
            return Object.assign({}, state, {
                hasReceivedMessageList: true,
                messageList: action.data,
                errorMessage: ''
            });
        case C.MESSAGE_RECEIVE_DATA_ERROR:
            return Object.assign({}, state, {
                errorMessage: action.message
            });
        case C.MESSAGE_AWAIT_CREATION_RESPONSE:
            return Object.assign({}, state, {
                submittingNew: true
            });
        case C.MESSAGE_RECEIVE_CREATION_RESPONSE:
            return Object.assign({}, state, {
                submittingNew: false
            });
        default: return state || initialState;
    }
};
