import React from 'react';
import { addPostActionCreator } from './../../../redux/profile_reducer'
import {updateNewPostTextActionCreator} from './../../../redux/profile_reducer'
import MyPosts from './MyPosts';


const MyPostsContainer = (props) => {

    let state = props.store.getState();

    let onAddPostButtonClick = () => {
        props.store.dispatch( addPostActionCreator() );
    }

    let onPostTextChange = (text) => {
        props.store.dispatch( updateNewPostTextActionCreator(text));
    }

    return (
        
        <MyPosts postsData = {state.profilePage.postsData}
        newPostText = {state.profilePage.newPostText}
        addPost = {onAddPostButtonClick}
        postTextChangeUpdate = {onPostTextChange}/>

    )
}


export default MyPostsContainer;