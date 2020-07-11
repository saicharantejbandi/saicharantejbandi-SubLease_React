import React, {Component} from 'react';

import classes from "./Post.css";

class Post extends Component   {
    

    render(){
        
    let Background = null;
        let images=null;
        
        if ( this.props.urls ) {
            Background=this.props.urls[0];
            console.log(Background);
            images = this.props.urls.map( url => {
                return (
                    <img
                        key={url}
                        src={url}
                        alt={'firebAse'}
                        
                        />
                );
            } );}
        


 return(
    <article className={classes.Post} onClick={this.props.clicked} style={{backgroundImage: `url(${Background})`}}  >

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