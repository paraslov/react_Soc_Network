import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import classes from './MyPosts.module.css';
import SinglePost from './SinglePost/SinglePost';
import { fieldRequired, maxLengthCreator } from '../../../../utils/validators/validators';
import { myCreateField, Textarea } from '../../../Common/FormsControls/FormsControls';
import { PostsDataType } from '../../../Common/Types/types';

const maxLength200 = maxLengthCreator(200);

type MyPostFormValuesPropsType = {
    newPostText: string
}
type MyPostFormValuesKeysType = keyof MyPostFormValuesPropsType

const MyPostsForm: React.FC<InjectedFormProps<MyPostFormValuesPropsType>> = (props) => {
    return (        
        <form onSubmit = {props.handleSubmit}>
            {myCreateField<MyPostFormValuesKeysType>('enter your post', 'newPostText', Textarea, [fieldRequired, maxLength200], {cols:'50', rows:'7'})}
            {/* <div>
                <Field name = "newPostText" validate={[fieldRequired, maxLength200]}
                    cols="50" rows="7" placeholder="enter your post" component={Textarea}/>
            </div> */}
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}

const MyPostsReduxForm = reduxForm<MyPostFormValuesPropsType>({form: 'myPosts'})(MyPostsForm);

type MyPostsPropsType = {
    postsData: Array<PostsDataType>

    addPost: (text: string) => void
}

const MyPosts: React.FC<MyPostsPropsType> = React.memo((props) => {

    console.log('my post render')

    const onMyPostsFormSubmit = (formData: {newPostText: string}) => {
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