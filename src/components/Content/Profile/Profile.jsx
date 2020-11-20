

import MyPosts from './MyPosts/MyPosts'
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = () => {

    let postsData = [
        {message: 'Hi, wasup broh?', likeCounter:'13', id: '1'},
        {message: "It's my first post, lol", likeCounter:'27', id: '2'},       
        {message: "Ulty approved", likeCounter:'41', id: '3'}       
    ]

    return (
        <div>
            <ProfileInfo />
            <MyPosts postsData={postsData} />
        </div >
    )
}

export default Profile;