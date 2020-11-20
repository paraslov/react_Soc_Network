import classes from './SinglePost.module.css'

const SinglePost = (props) => {
    return (

        <div className={classes.item}>
            <img src="https://i.ytimg.com/vi/Y5GLCBjHR8U/maxresdefault.jpg" alt="ava" />
            {props.message}
            <div>
                {props.likeCounter} likes!!
            </div>
        </div>


    )
}

export default SinglePost;