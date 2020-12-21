
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = ({profile, status, updateUserStatus}) => {
    return (
        
        <div>
            <ProfileInfo profile = {profile} status = {status} 
                updateUserStatus = {updateUserStatus}/>
            <MyPostsContainer />
        </div >
    )
}

export default Profile;