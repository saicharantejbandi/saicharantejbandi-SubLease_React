import React, {Component} from 'react';
import { connect } from 'react-redux';
import Post from '../../components/Post/Post';
import axios from 'axios';


class MyPosts extends Component {

    state={
        myPosts:[]
    }

    componentDidMount(){
        if(this.state.myPosts!==[]){
            axios.get('https://react-my-burger-4ff3d.firebaseio.com/posts.json?&orderBy="userId"&equalTo="'+this.props.uid+'"')
            .then(response =>{
                
                const fetchedposts=[];
                for (let key in response.data){
                    
                    fetchedposts.push({
                        ...response.data[key].postData,
                        id:key})
                }
                const updatedPosts = fetchedposts.map( post => {
                    return {
                        ...post,}
                } );
            this.setState({
                myPosts:updatedPosts
            })

            })
            .catch(err =>{
                console.log(err);
            })
        }
    }

    render(){
        let posts=null;

            posts = this.state.myPosts.map( post => {
                return (
                    
                    <Post
                        key={post.id}
                        title={post.aptType+','+post.roomslease+' rooms'}
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
                        //  urls={post.urls}
                        
                        /* clicked={() => this.postSelectedHandler( post.id )} */ />
                )});
          



        return(
            <div>
                <section className="Posts" style={{display:'flex', alignItems:'center', flexFlow:'row wrap'}}>
                {posts}
                </section>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return{
        uid:state.auth.uid
    }
}

export default connect(mapStateToProps, null) (MyPosts);