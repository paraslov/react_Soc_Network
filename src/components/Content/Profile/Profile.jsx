
import classes from './Profile.module.css'
import MyPosts from './MyPosts/MyPosts'

const Profile = () => {
    return (
        <div>
            <div>
                <img src='https://thypix.com/wp-content/uploads/2018/05/Sommerlandschaft-Bilder-99.jpg' alt='bar img'></img>
            </div>
            <div className={classes.header}>
                ava+desc (shabalabalabala)
            </div>

            <MyPosts/>
            
        </div >
    )
}

export default Profile;