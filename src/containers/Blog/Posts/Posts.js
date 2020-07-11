import React, { Component } from 'react';
//import axios from '../../../axios';
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index'

import Spinner from '../../../components/UI/Toolbar/Spinner/Spinner'
import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount () {
        this.props.fetchPosts();
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
                        title={post.title}
                        author={post.author}
                        details={post.content}
                        /* clicked={() => this.postSelectedHandler( post.id )} */ />
                );
            } );
        }}

        return (
            <div>
                <section className="Posts">
                    
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
        fetchPosts:()=> dispatch(actions.fetchPosts())
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (Posts);