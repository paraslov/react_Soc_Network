
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { ProfileType } from '../../Common/Types/types';

type PropsType = {
    status: string
    isOwner: boolean
    profile: ProfileType | null

    saveProfile: (profile: ProfileType) => void
    savePhoto: (file: File) => void
    updateUserStatus: (status: string) => void
}

const Profile: React.FC<PropsType> = ({ saveProfile, savePhoto, isOwner, profile, status, updateUserStatus}) => {
    return (
        
        <div>
            <ProfileInfo saveProfile={saveProfile} isOwner = {isOwner} 
                profile={profile} status={status}
                updateUserStatus = {updateUserStatus} savePhoto = {savePhoto} />
            <MyPostsContainer />
        </div >
    )
}

export default Profile;