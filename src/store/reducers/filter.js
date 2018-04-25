import C from '../../constants';

const initialState = {
    errorMessage: '',
    filter: C.FILTER_BY_NONE,
    searchValue: ''
};

export default (state, action) => {
    switch (action.type) {
        case C.SEARCH:
            return Object.assign({}, state, {
                searchValue: action.data
            });
        case C.FILTER:
            return Object.assign({}, state, {
                filter: action.data
            });
        default: return state || initialState;
    }
};
