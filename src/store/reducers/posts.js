import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    posts: [],
    loading: false,
    error:null
};

const fetchPostsStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};


const fetchPostsSuccess = ( state, action ) => {
    return updateObject( state, {
        posts: action.posts,
        loading: false
    } );
};

const fetchPostsFail = ( state, action ) => {
    return updateObject( state, { loading: false, error:action.error } );
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
       
        case actionTypes.FETCH_START: return fetchPostsStart( state, action );
        case actionTypes.FETCH_SUCCESS: return fetchPostsSuccess( state, action );
        case actionTypes.FETCH_FAIL: return fetchPostsFail( state, action );
        default: return state;
    }
};

export default reducer;