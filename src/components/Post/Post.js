import React from 'react';

import classes from "./Post.css";

const post = (props) => (
    <article className={classes.Post} onClick={props.clicked}>
        <h1>{props.title}</h1>
        <div className={classes.Info}>
            <div className={classes.Author}>By:{props.author}</div>
            <p>{props.details}</p>
        </div>
    </article>
);

export default post;