import { PostsDataType } from '../../../../../redux/profile_reducer';
import classes from './SinglePost.module.css'

type PropsType = {
    message: string
    likeCounter: number
}

const SinglePost: React.FC<PropsType> = (props) => {
    return (

        <div className={classes.item}>
            <img className={classes.avatar__image} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1gIPy2ZFVryg3q7VZfirsVVtMTzmfoG2P5Q&usqp=CAU" alt="ava" />
            {props.message}
            <div>
                {props.likeCounter} likes!!
            </div>
        </div>
    )
}

export default SinglePost;

