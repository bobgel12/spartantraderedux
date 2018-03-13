import C from '../../constants';

const initialState = {
	hasReceivedData: false,
	submittingNew: false,
	errorMessage: '',
	data: {},
	status: {},
	wishList: {}
};

export default (state, action) => {
	// let newstate;
	switch (action.type) {
		case C.POSTS_RECEIVE_DATA:
			return Object.assign({}, state, {
				hasReceivedData: true,
				data: action.data,
				errorMessage: ''
			});
		case C.WISHLIST_RECEIVE_DATA:
			return Object.assign({}, state, {
				hasReceivedData: true,
				wishList: action.data,
				errorMessage: ''
			});
		case C.POSTS_RECEIVE_DATA_ERROR:
			return Object.assign({}, state, {
				wishList: null,
				errorMessage: action.message
			});
		case C.POST_AWAIT_CREATION_RESPONSE:
			return Object.assign({}, state, {
				submittingNew: true
			});
		case C.POST_RECEIVE_CREATION_RESPONSE:
			return Object.assign({}, state, {
				submittingNew: false
			});
		default: return state || initialState;
	}
};


// case C.POST_EDIT:
// newstate = Object.assign({}, state);
// newstate.status[action.qid] = C.POST_EDITING;
// return newstate;
// case C.POST_EDIT_FINISH:
// newstate = Object.assign({}, state);
// delete newstate.status[action.qid];
// return newstate;
// case C.POST_EDIT_SUBMIT:
// newstate = Object.assign({}, state);
// newstate.status[action.qid] = C.POST_SUBMITTING;
// return newstate;
