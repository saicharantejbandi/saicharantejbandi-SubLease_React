import React, {Component} from 'react';
import classes from './Gallery.css'


class Gallery extends Component{
   state={
       index:0
   }

    nextHandler=()=>{
       this.setState({index:this.state.index+1})
   }

   prevHandler=()=>{
    this.setState({index:this.state.index-1})
   }
  

    render(){
        console.log(this.props.images);
        const photo=["https://source.unsplash.com/c77MgFOt7e0/1144x763","https://twistedsifter.files.wordpress.com/2010/03/the-rockefeller-center-new-york-city-vertical-panorama.jpg?w=343&h=994",
        "https://source.unsplash.com/c77MgFOt7e0/1144x763",];
        return(
            <div   className={classes.Gallery} >
                <button className={classes.Button} onClick={this.prevHandler} >Previous</button>
                
                <img src={this.props.images[this.state.index%this.props.images.length] } width='400'  />
                <button className={classes.Button} onClick={this.nextHandler} >Next</button>
               
                
                
                
            </div>
            
        );
    }
}

export default Gallery;