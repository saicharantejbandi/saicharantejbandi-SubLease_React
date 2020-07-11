import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';
import firebase from 'firebase';
const initialState = {
    token:localStorage.getItem('token'),
    userId:localStorage.getItem('userID'),
    error:null,
    loading:false,
    authRedirectpath:'/',
    user:localStorage.getItem('user'),
    emailVerified:localStorage.getItem('emailVerified'),
    uid:localStorage.getItem('uid')
};


const fb_logout = (state,action) => {
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        localStorage.removeItem('uid');
        localStorage.removeItem('emailVerified');
        localStorage.removeItem('user');
        localStorage.removeItem('userName');
        
        return state;
        
      }, function(error) {
        console.error('Sign Out Error', error);
        return state
      });
    return updateObject(state, {user:false , emailVerified:false, uid:false});
}

const fb_auth_change = (state ,action) =>{
    return updateObject(state, {user:localStorage.getItem('user') ,
     emailVerified:localStorage.getItem('emailVerified'), 
     uid:localStorage.getItem('uid'),
     userName:localStorage.getItem('userName')
    });
}

const setAuthRedirectPath = (state,action) =>{
    return updateObject(state, {authRedirectpath:action.path})
}

const authStart =(state, action)=>{
    return updateObject(state, {error:null, loading:true});
}

const authSuccess = (state,action) =>{
  
    return updateObject(state, {token:action.idToken, userId:action.userId, error:null, loading:false})
}




const authFail = (state,action) =>{
    return updateObject(state, { error:action.error, loading:false})
}

const authLogout = (state, action)=>{
    return updateObject(state, {token:null, userId:null})
}

const reducer = (state=initialState , action )=>{
    
    switch(action.type){
        case actionTypes.AUTH_START: return authStart(state,action);
        case actionTypes.AUTH_SUCCESS :   return authSuccess(state,action);
        case actionTypes.AUTH_FAIL : return authFail(state,action);
        case actionTypes.AUTH_LOGOUT:return authLogout(state,action);
        case actionTypes.SET_AUTH_REDIRECT_PATH:return setAuthRedirectPath(state,action);
        case actionTypes.FB_AUTH_CHANGE:return fb_auth_change(state,action);
        case actionTypes.FB_LOGOUT:return fb_logout(state,action);
        default :
        return state;
    }

}

export default reducer;