
import classes from './../Users.module.css'
import userPhoto from '../../../../assets/images/img.jpeg'

const UsersList = (props) => {
    return (
            <div className={classes.userList__item}>
                <div className={classes.fuctional}>
                    <div className={classes.avatarImg}>
                        <img src={props.smallPhoto != null ? props.smallPhoto : userPhoto}
                            alt="avatar pic" />
                    </div>
                    <div>
                        {props.followed ?
                            <button className={classes.followBtn} onClick={() => props.unfollow(props.id)}>Follow</button> :
                            <button className={classes.followBtn} onClick={() => props.follow(props.id)}>Unfollow</button>}
                    </div>
                </div>
                <div className={classes.info}>
                    <div className={classes.info__item}>
                        <div>{props.name}</div>
                        <div>{props.status}</div>
                    </div>
                    <div className={classes.info__item}>
                        <div>{"props.location.contry+','"}</div>
                        <div>{'props.location.city'}</div>
                    </div>
                </div>
            </div>
    )    
}

export default UsersList;