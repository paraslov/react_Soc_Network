
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = ({ savePhoto, isOwner, profile, status, updateUserStatus}) => {
    return (
        
        <div>
            <ProfileInfo isOwner = {isOwner} profile = {profile} status = {status} 
                updateUserStatus = {updateUserStatus} savePhoto = {savePhoto} />
            <MyPostsContainer />
        </div >
    )
}

export default Profile;