import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';
import feedback from './feedback';
import message from './message';
import wishlist from './wishlist';
import filter from './filter';

const rootReducer = combineReducers({
	posts,
	auth,
	feedback,
	message,
	wishlist,
	filter
});

export default rootReducer;
