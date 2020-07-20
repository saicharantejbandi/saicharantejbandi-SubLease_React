import React, { useState } from 'react';

import {storage} from '../../firebase/index';

const ImageUpload = () =>  {
 
    
        const [image, setImage] = useState(null);
        const [url , setUrl] = useState('');
        const [progress , setProgress] = useState(0);
      
      const handleChange = e =>{
        if(e.target.files[0]){
          setImage(e.target.files[0]);
        }
      }
      const handleUpload = () =>{
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred/snapshot.totalBytes)*100
                );
                setProgress(progress);
            },
            error =>{
                console.log(error);
            },
            ()=>{
                storage
                .ref('images')
                .child(image.name)
                .getDownloadURL()
                .then(url =>{
                    console.log(url);
                    setUrl(url);
                })
            }
        )

      };

      
      console.log('image:' ,image)
    return (
     
      
        <div className="App">

            <progress value ={progress} max ='100'/>
          <input type ='file' onChange = {handleChange}/>
          {/* <button onClick={handleUpload}>Upload</button> */}
         <br></br>
         {url}
         <br/>
         <img src = {url } alt = 'firebase-image' />
        </div>

    );
  
}

export default ImageUpload;
