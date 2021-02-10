import { connect } from 'react-redux';
import { addPost, PostsDataType } from '../../../../redux/profile_reducer'
import { AppStateType } from '../../../../redux/redux_store';
import { getNewPostText, getPostsData } from '../../../../redux/selectors/profile_selectors';
import MyPosts from './MyPosts';

type MapStatePropsType = {
    postsData: Array<PostsDataType>
}

type MapDispatchToProps = {
    addPost: (text: string) => void
}

let mapStateToProps = (state: AppStateType) => {
    return {
        postsData: getPostsData(state),
    }
}
// @ts-ignore
const MyPostsContainer = connect<MapStatePropsType, MapDispatchToProps, {}, AppStateType>(mapStateToProps, {addPost})(MyPosts);


export default MyPostsContainer;