import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import classes from './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: '',
        submitted: false
    }

    componentDidMount () {
        // If unauth => this.props.history.replace('/posts');
        console.log( this.props );
    }

    postDataHandler = () => {
        const data = {
            title: this.state.title,
            content: this.state.content,
            author: this.state.author
        };
        axios.post( '/posts.json', data )
            .then( response => {
                console.log( data );
                this.props.history.replace('/posts');
                // this.setState( { submitted: true } );
            } );
    }

    render () {
        let forms=(<p>Please Login to Post</p>)
        if(this.props.authentiacted){
            forms=(<div><h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={( event ) => this.setState( { title: event.target.value } )} />
                <label>Details(Describe your unit and please provide your contact)</label>
                <textarea rows="4" value={this.state.content} onChange={( event ) => this.setState( { content: event.target.value } )} />
                <label>Author</label>
                <input type="text" value={this.state.author} onChange={( event ) => this.setState( { author: event.target.value } )} />
                <button onClick={this.postDataHandler}>Add Post</button></div>)
        }

        let redirect = null;
        if (this.state.submitted) {
            redirect = <Redirect to="/posts" />;
        }
        return (
            <div className={classes.NewPost}>
                {redirect}
                {forms}
            </div>
        );
    }
}

const maptStateToProps =(state) =>{
    return {
        authentiacted:state.auth.token
    }
}

export default connect(maptStateToProps,null) (NewPost);