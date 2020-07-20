import React from 'react';
import classes from './Carousel2.css'
import classes2 from './dummy.css'


const card = ( props ) => (
    <div className={classes.card}>
        <img src={props.imgSource} width="100" height="200" alt="room"/>
        <div className={classes.content}>
        <h1>{props.header1}</h1>
       {/*  <h3>{props.header2}</h3> */}
       {/*  <a href="./" className={classes2.myButton} style={{color:"white"}}>Read More</a> */}
        </div>
        </div>

    
);

export default card;