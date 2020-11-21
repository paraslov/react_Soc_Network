

import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = (props) => {



    return (
        <div>
            <ProfileInfo />
            <MyPosts postsData={props.postsData} />
        </div >
    )
}

export default Profile;