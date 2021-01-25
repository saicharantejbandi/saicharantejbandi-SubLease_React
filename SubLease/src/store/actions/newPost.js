import axios from 'axios';
import * as actions from './actionTypes';



export const newPostStart =() =>{
    return{
        type:actions.NEWPOST_START
    }
}

export const newPostSuccess =() =>{
    return {
        type:actions.NEWPOST_SUCCESS
    }
}

export const newPostFail = (error) =>{
    return {
        type:actions.NEWPOST_FAIL,
        error:error
    }
}


export const newPost= (post, token,image) =>{
    return dispatch =>{
        dispatch(newPostStart());
        
        axios.post('', post)
        .then(responce => {
            dispatch(newPostSuccess());
        })
        .catch(error =>{
            dispatch(newPostFail(error.message))
        })
    }
}
