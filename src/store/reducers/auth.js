import C from '../../constants';

const initialState = {
	username: null,
	uid: null,
	photo: null,
	status: C.AUTH_ANONYMOUS,
	profile: false,
	profileUser: null
};

export default (state, action) => {
	switch (action.type) {
		case C.AUTH_OPEN:
			return {
				status: C.AUTH_AWAITING_RESPONSE,
				username: 'guest',
				uid: null,
				photo: null,
			};
		case C.PROFILE_USER:
			return Object.assign({}, initialState, state, {
				profileUser: action.data,
			});
		case C.AUTH_LOGIN:
			return {
				status: C.AUTH_LOGGED_IN,
				username: action.username,
				uid: action.uid,
				photo: action.photo,
			};
		case C.AUTH_LOGOUT:
			return {
				status: C.AUTH_ANONYMOUS,
				username: 'guest',
				uid: null,
				photo: null,
			};
		case C.TOGGLE_PROFLE:
			return Object.assign({}, initialState, state, {
				profile: !state.profile,
			});
		default: return state || initialState;
	}
};
