import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';
import feedback from './feedback';
import message from './message';

const rootReducer = combineReducers({
	posts,
	auth,
	feedback,
	message
});

export default rootReducer;
