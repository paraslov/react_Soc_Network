import classes from './MyPosts.module.css'
import SinglePost from './SinglePost/SinglePost'

const MyPosts = () => {
    return (
        <div className={classes.posts}>
            <div className={classes.newPost}>
                <textarea name="" id="" cols="50" rows="7"></textarea> <br/>
                <button>Add post</button>
            </div>
            <SinglePost likeCounter='113' message="Hi, whasup?"/>
            <SinglePost likeCounter='666' message="It's my first post, lol"/>

        </div>

    )
}

export default MyPosts;