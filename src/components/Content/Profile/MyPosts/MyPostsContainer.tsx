import { connect } from 'react-redux';
import { profileActions } from '../../../../redux/profile_reducer'
import { AppStateType } from '../../../../redux/redux_store';
import { getPostsData } from '../../../../redux/selectors/profile_selectors';
import { PostsDataType } from '../../../Common/Types/types';
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

const MyPostsContainer = connect<MapStatePropsType, MapDispatchToProps, {}, AppStateType>
                                (mapStateToProps, {addPost: profileActions.addPost})(MyPosts);


export default MyPostsContainer;