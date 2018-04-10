import C from '../../constants';

const initialState = {
    hasReceivedData: false,
    submittingNew: false,
    errorMessage: '',
    wishList: {}
};

export default (state, action) => {
    // let newstate;
    switch (action.type) {
        case C.WISHLIST_RECEIVE_DATA:
            return Object.assign({}, state, {
                hasReceivedData: true,
                wishList: action.data,
                errorMessage: ''
            });
        case C.WISHLIST_RECEIVE_DATA_ERROR:
            return Object.assign({}, state, {
                errorMessage: action.message
            });
        default: return state || initialState;
    }
};
