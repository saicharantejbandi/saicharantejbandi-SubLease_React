import * as actionTypes from './actionTypes';
import axios from 'axios';



export const fetchPostsStart =() =>{
    return{
        type:actionTypes.FETCH_START
    }
};

export const fetchPostsSuccess = (posts) =>{
    return {
        type:actionTypes.FETCH_SUCCESS,
        posts:posts
    }
}

export const fetchPostsFail = (error) =>{
    return {
        type:actionTypes.FETCH_FAIL,
        error:error
    }
}





export const fetchPosts = () =>{
    return dispatch => {
        dispatch(fetchPostsStart())
        const queryparams= '?auth='
        axios.get('https://react-my-burger-4ff3d.firebaseio.com/posts.json')
        .then( response => {
          
            const fetchedposts=[];
            for (let key in response.data){
                fetchedposts.push({
                    ...response.data[key],
                    id:key})
            }
            const updatedPosts = fetchedposts.map( post => {
                return {
                    ...post,}
            } );
            dispatch(fetchPostsSuccess(updatedPosts));
        } )
        .catch( error => {
            dispatch(fetchPostsFail(error.message));
        } );
    } 
}