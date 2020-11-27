import React from 'react';
import classes from './MyPosts.module.css';
import SinglePost from './SinglePost/SinglePost';
import { addPostActionCreator } from './../../../redux/profile_reducer'
import {updateNewPostTextActionCreator} from './../../../redux/profile_reducer'


const MyPosts = (props) => {

    let postsElements = props.postsData
    .map( post => <SinglePost likeCounter={post.likeCounter} message={post.message} />)



    let onAddPostButtonClick = () => {
        props.dispatch( addPostActionCreator() );
    }

    let onPostTextChange = (e) => {
        let text = e.target.value;
        props.dispatch( updateNewPostTextActionCreator(text));
    }

    return (
        <div className={classes.posts}>
            <div className={classes.newPost}>
                <h3>My Posts</h3>
                <div>
                    <textarea onChange={onPostTextChange} value={props.newPostText}
                    cols="50" rows="7" placeholder = "enter your post" />
                </div>
                <div>
                    <button onClick={ onAddPostButtonClick }>Add post</button>
                </div>
            </div>
            <div className={classes.oldPosts}>
                {postsElements}
            </div>

        </div>

    )
}

export default MyPosts;