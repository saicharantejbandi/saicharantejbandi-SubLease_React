import React, {Component} from 'react';
import {storage} from '../../firebase/index';

class Image extends Component {
    state={
        image:null,
       progress:0,
        url:null
    }

     handleChange = (e) =>{
        if(e.target.files[0]){
            this.setState({
                image:e.target.files[0]
            });
        }
      }

      handleUpload = () =>{
        const uploadTask = storage.ref(`images/${this.state.image.name}`)
        .put(this.state.image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                );
                this.setState({progress:progress});
            },
            error =>{
                console.log(error);
            },
            ()=>{
                storage
                .ref('images')
                .child(this.state.image.name)
                .getDownloadURL()
                .then(url =>{
                    console.log(url);
                    this.setState({url:url});
                })
            }
        )

      };

    render(){
        return(
            <div>
                 <progress value ={this.state.progress} max ='100'/>
          <input type ='file' onChange = {this.handleChange}/>
         <button onClick={this.handleUpload}>Upload</button> 
         <br></br>
         {this.state.url}
         <br/>
         <img src = {this.state.url } alt = 'firebase-image' />
            </div>
        );
    }
}

export default Image;