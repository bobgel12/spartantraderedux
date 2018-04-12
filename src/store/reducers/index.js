import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';
import feedback from './feedback';
import message from './message';
import wishlist from './wishlist';

const rootReducer = combineReducers({
	posts,
	auth,
	feedback,
	message,
	wishlist
});

export default rootReducer;
