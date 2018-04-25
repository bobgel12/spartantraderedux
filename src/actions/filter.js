import C from '../constants';
import { listenToPosts } from './posts';

export const search = (searchValue) => {
    return (dispatch, getState) => {
        dispatch({
            type: C.SEARCH,
            data: searchValue
        });
        dispatch(listenToPosts());
    }
}

export const filter = (filterValue) => {
    return (dispatch, getState) => {
        dispatch({
            type: C.FILTER,
            data: filterValue
        });
    }
}
