import React, { Component } from 'react';
//import axios from '../../../axios';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index'

import Spinner from '../../../components/UI/Toolbar/Spinner/Spinner'
import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from '../FullPost/FullPost';
import Modal from '../../../components/UI/Modal/Modal';


class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount () {
        this.props.fetchPosts();
        this.props.updateUrl('/myposts');
        console.log(this.props.posts)
    }

    postSelectedHandler = ( id ) => {
        // this.props.history.push({pathname: '/posts/' + id});
        this.props.history.push( '/posts/' + id );
    }

    render () {
       
   
    let posts=null;
    if(this.props.loading){
        posts=<Spinner/>
    }  
    else{  
     posts = <p style={{ textAlign: 'center' }}>{this.props.error}</p>;
        if ( !this.props.error ) {
            posts = this.props.posts.map( post => {
                return (
                    
                    <Post
                        key={post.id}
                        title={Number(post.roomslease)>1?post.aptType+','+post.roomslease+' rooms':post.aptType+','+post.roomslease+' room'}
                        aptType={post.aptType}
                        email={post.email}
                        pets={post.pets}
                        smoking={post.smoking}
                        street={post.street}
                        zipCode={post.zipCode}
                        price={post.price}
                        moveIn={post.moveinDate}
                        moveOut={post.moveoutDate}
                        city={post.country}
                        author={post.name}
                        rooms={post.roomslease}
                        images={post.urls}
                       
                        //  urls={post.urls}
                        
                        /* clicked={() => this.postSelectedHandler( post.id )} */ />
                );
            } );
        }}

        return ( 
            <div  style={{alignItems:'center'}}>
                <section className="Posts" style={{display:'flex', alignItems:'center', flexFlow:'row wrap'}}>
                    
                    {posts}
                    
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        posts:state.posts.posts,
        loading:state.posts.loading,
        error:state.posts.error
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        fetchPosts:()=> dispatch(actions.fetchPosts()),
        updateUrl:(current) =>dispatch(actions.updateUrl(current))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Posts);