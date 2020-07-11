import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers,applyMiddleware, compose,} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import postReducer from './store/reducers/posts'



const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__   : null|| compose;


const rootReducer = combineReducers({
   
    auth:authReducer,
    posts:postReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

axios.defaults.baseURL = 'https://react-my-burger-4ff3d.firebaseio.com/';
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use(request => {
    
    // Edit request config
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    //console.log(response);
    // Edit request config
    return response;
}, error => {
    //console.log(error);
    return Promise.reject(error);
});


const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);


ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();
