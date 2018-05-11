import C from '../constants';
import { listenToPosts } from './posts';

// #2.1 Function to search for particular book's title
export const search = (searchValue) => {
    return (dispatch, getState) => {
        dispatch({
            type: C.SEARCH,
            data: searchValue
        });
        dispatch(listenToPosts());
    }
}

// #2.2 Function to filter for a particular value
export const filter = (filterValue) => {
    return (dispatch, getState) => {
        dispatch({
            type: C.FILTER,
            data: filterValue
        });
        dispatch(listenToPosts());
    }
}
