import React, { Component } from 'react';
// import axios from 'axios';
import { NavLink} from 'react-router-dom';

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

    render ()
     
     {
        console.log(this.props);
         let login =null;
         //let newPost=null;
        if (this.props.isAuthenticated){
            login =(<li><p  onClick ={this.logoutHandler}>Logout</p></li>)

        }
        else{
            login= (<li><NavLink to={{
                pathname: '/auth',
               
            }}>Login/Sign Up</NavLink></li>)
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

                        </ul>
                    </nav>
                </header>
              
                
            </div>
        );
    }
}


const mapStateToProps = state =>{
    return{
        /* loading:state.auth.loading,
        error:state.auth.error, */
        isAuthenticated:state.auth.token,
        //buildingBurger:state.burgerBuilder.building,
       /*  authRedirect:state.auth.authRedirectpath */
    }
}

const mapDispatchToProps = dispatch =>{
    return {
        onLogout:() => dispatch(actions.logout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Layout);