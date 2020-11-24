import React from 'react';
import classes from './MyPosts.module.css'
import SinglePost from './SinglePost/SinglePost'

const MyPosts = (props) => {

    let postsElements = props.postsData
    .map( post => <SinglePost likeCounter={post.likeCounter} message={post.message} />)

    let newPostText = React.createRef();

    let addPost = () => {
        let text = newPostText.current.value;
        props.addPost(text);
    }

    return (
        <div className={classes.posts}>
            <div className={classes.newPost}>
                <h3>My Posts</h3>
                <div>
                    <textarea ref={newPostText} cols="50" rows="7"></textarea>
                </div>
                <div>
                    <button onClick={ addPost }>Add post</button>
                </div>
            </div>
            <div className={classes.oldPosts}>
                {postsElements}
            </div>

        </div>

    )
}

export default MyPosts;