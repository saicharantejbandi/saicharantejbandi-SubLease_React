import React, { Component } from 'react';
// import axios from 'axios';           
import { NavLink} from 'react-router-dom';
import firebase from 'firebase';
import classes from './Layout.css'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/index';
import './Layout.css';


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
         let myposts=null;
         let auth=(<li><NavLink to='/fbauth'
                
                activeStyle={{color:"#fa923f",
                                    textDecoration: "underline"}}
               >Login </NavLink></li>);

        if ( this.props.user){

            myposts = (
            
                <li><NavLink to='/myposts' 
                    exact
                        
                >My Posts</NavLink></li>)


            login =(
            
            <li onClick ={this.props.fbLogout}><NavLink to='/posts'
            exact>Logout</NavLink></li>)

            


            if(this.props.userName){

                name=<li>  <NavLink to='/myposts'
                exact
                
                    >Hi, {this.props.userName} </NavLink></li>
            }
            else{
                name= <li>  <NavLink to='/myposts'
                
                exact
                
                >Hi, User </NavLink></li>
            }
        }
        if(name){
            auth=<li>{name}</li>
        }


       

        return (
            <div className={classes.Blog}>
                <header >
                    <nav className={classes.Blog} style ={{backgroundColor:'teal'}}>
                        <ul>
                            <li ><NavLink
                                to="/posts"
                                
                                activeStyle={{color:"#fa923f",
                                    textDecoration: "underline"}}
                                >Posts</NavLink></li>
                            <li><NavLink 
                            to='/new-post'
                            activeStyle={{color:"#fa923f",
                                    textDecoration: "underline"}}
                              >New Post</NavLink></li>
                            {myposts}
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