
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = ({ profileChange, saveProfile, savePhoto, isOwner, profile, status, updateUserStatus}) => {
    return (
        
        <div>
            <ProfileInfo saveProfile={saveProfile} isOwner = {isOwner} 
                profile = {profile} status = {status} profileChange = {profileChange}
                updateUserStatus = {updateUserStatus} savePhoto = {savePhoto} />
            <MyPostsContainer />
        </div >
    )
}

export default Profile;