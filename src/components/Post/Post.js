import React, {Component} from 'react';

import classes from "./Post.css";
import Modal from '../UI/Modal/Modal';
import Gallery from '../UI/Gallery/Gallery';

class Post extends Component   {
    
    state={
        view:false,

    }
     buttonhandler=()=>{
        this.setState({
            view:true
        })
     }

     modalclik =()=>{
        this.setState({
            view:false
        })
     }
    render(){
        let images=null;
        let gallery=null
        if(this.props.images){
            if (this.state.view){
                gallery= <Gallery images={this.props.images ? this.props.images[0] : ['null']}/>
            }
            else{
                gallery=null;
            }
            images=(
                <div>
                    <button onClick={this.buttonhandler} >Images</button>
                    <Modal show={this.state.view} modalClosed={this.modalclik} >
                       {gallery} 
                       
               
            </Modal>
                </div>
            )
        }
        else{
            images=<p>No Images</p>
        }
    
        


 return(
    <article className={classes.Post} onClick={this.props.clicked}  >

        <h1>{this.props.title}</h1>

        <div className={classes.Info}>
            <div className={classes.Author}>Posted By:{this.props.author}</div>
            <p><span role="img" aria-label="dolalr">💲</span>:{this.props.price}</p>
            <p>Rooms: {this.props.rooms}</p>
            <p> <span role="img" aria-label="smoking">🚬</span>: {(this.props.smoking ==='true' ? <span role="img" aria-label="tick">✔️</span> 
             :<span role="img" aria-label="ban">🚫</span> )}</p>
            <p>Pets: {this.props.pets==='true'? <span role="img" aria-label="tick">✔️</span> 
             :<span role="img" aria-label="ban">🚫</span> }</p>
            <p>From: {this.props.moveIn}</p>
            <p>To:{this.props.moveOut}</p>
            <p><span role="img" aria-label="email">📧</span> :{this.props.email}</p>
            <p><span role="img" aria-label="address">🏠</span>:{this.props.street+', '+this.props.city+', '+this.props.zipCode}</p>
            {images}
                
                    
                
               
           
        </div>
    </article>
  )}};

export default Post;