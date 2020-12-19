
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = (props) => {
    return (
        
        <div>
            {console.log('render profile')}
            <ProfileInfo profile = {props.profile} status = {props.status} 
                updateUserStatus = {props.updateUserStatus}/>
            <MyPostsContainer />
        </div >
    )
}

export default Profile;