
import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';


const initialState = {
    newPost:[],
    loading:false,
    posted:false,
    error:null,
    submitted:false
}

const postStart = (state, action) =>{
    return updateObject(state, {loading:true})
}

const postSuccess = (state, action) =>{
    return updateObject(state, {loading:false, posted:true})
}
const postFail = (state, action ) =>{
    return updateObject(state, {error:action.error})
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
       
        case actionTypes.NEWPOST_START: return postStart( state, action );
        case actionTypes.NEWPOST_SUCCESS: return postSuccess( state, action );
        case actionTypes.NEWPOST_FAIL: return postFail( state, action );
        default: return state;
    }
};

export default reducer;