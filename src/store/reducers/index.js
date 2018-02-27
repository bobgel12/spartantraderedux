import { combineReducers } from 'redux';
import posts from './posts';
import auth from './auth';
import feedback from './feedback';

const rootReducer = combineReducers({
	posts,
	auth,
	feedback,
});

export default rootReducer;
