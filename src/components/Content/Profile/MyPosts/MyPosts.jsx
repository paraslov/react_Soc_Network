import React from 'react';
import { Field, reduxForm } from 'redux-form';
import classes from './MyPosts.module.css';
import SinglePost from './SinglePost/SinglePost';
import { fieldRequired, maxLengthCreator } from './../../../../utils/validators/validators';
import { Textarea } from './../../../Common/FormsControls/FormsControls';

const maxLength10 = maxLengthCreator(10);

const MyPostsForm = (props) => {
    return (
        <form onSubmit = {props.handleSubmit}>
            <div>
                <Field name = {"newPostText"} validate={[fieldRequired, maxLength10]}
                    cols={"50"} rows={"7"} placeholder={"enter your post"} component={Textarea}/>
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const MyPostsReduxForm = reduxForm({form: 'myPosts'})(MyPostsForm);


const MyPosts = React.memo((props) => {

    console.log('my post render')

    const onMyPostsFormSubmit = (formData) => {
        props.addPost(formData.newPostText);
        formData.newPostText = '';
    }

    let postsElements = props.postsData
    .map( post => <SinglePost key={post.id} likeCounter={post.likeCounter} message={post.message} />)

    return (
        <div className={classes.posts}>
            <div className={classes.newPost}>
                <h3>My Posts</h3>
                <MyPostsReduxForm onSubmit = {onMyPostsFormSubmit}/>
            </div>
            <div className={classes.oldPosts}>
                {postsElements}
            </div>

        </div>

    )
});

export default MyPosts;