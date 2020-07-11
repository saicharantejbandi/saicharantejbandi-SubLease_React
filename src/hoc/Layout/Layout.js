import React, { Component } from 'react';
// import axios from 'axios';           
import { NavLink} from 'react-router-dom';
import firebase from 'firebase';
import classes from './Layout.css'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index';

class Layout extends Component {
    state = {
        auth: true
    }
     logoutHandler = () =>{
         this.props.onLogout();
     }

     signOut = ()=>{
        firebase.auth().signOut().then(function() {
          console.log('Signed Out');
        }, function(error) {
          console.error('Sign Out Error', error);
        });
      }
      

    render (){
        console.log(this.props.user, 'layout')
         let login =null;
         let name=null;
         let auth=(<li>  <NavLink to={{
            pathname: '/fbauth',
           
        }}>Login </NavLink></li>);

        if ( this.props.user){
            login =(<li><p  onClick ={ this.props.fbLogout }>Logout</p></li>)
            if(this.props.userName){
                name=<p>Hello, {this.props.userName}</p>
            }
            else{
                name= <p>Hello, User</p>
            }
        }
        if(name){
            auth=<li>{name}</li>
        }


       

        return (
            <div className={classes.Blog}>
                <header >
                    <nav style ={{backgroundColor:'teal'}}>
                        <ul>
                            <li ><NavLink
                                to="/posts"
                                exact
                                activeClassName="my-active"
                                activeStyle={{
                                    color: '#fa923f',
                                    textDecoration: 'underline'
                                }}>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                               
                            }}>New Post</NavLink></li>

                            {login}
                            {auth}

                        </ul>
                    </nav>
                </header>
              
                
            </div>
        );
    }
}


const mapStateToProps = state =>{
    return{
        isAuthenticated:state.auth.token,
        user:state.auth.user,
        userName:state.auth.userName
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onLogout:() => dispatch(actions.logout()),
        fbLogout:()=>dispatch(actions.fb_logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Layout);