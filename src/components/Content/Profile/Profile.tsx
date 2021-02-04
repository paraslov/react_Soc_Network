
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { ProfileType } from '../../Common/Types/types';

type PropsType = {
    status: string
    isOwner: boolean
    profile: ProfileType | null

    profileChange: () => void
    saveProfile: () => void
    savePhoto: () => void
    updateUserStatus: () => void
}

const Profile: React.FC<PropsType> = ({ profileChange, saveProfile, savePhoto, isOwner, profile, status, updateUserStatus}) => {
    return (
        
        <div>
            <ProfileInfo saveProfile={saveProfile} isOwner = {isOwner} 
                profile={profile} status={status} //profileChange={profileChange}
                updateUserStatus = {updateUserStatus} savePhoto = {savePhoto} />
            <MyPostsContainer />
        </div >
    )
}

export default Profile;