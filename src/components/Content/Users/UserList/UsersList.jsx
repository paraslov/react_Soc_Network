import * as axios from 'axios';
import classes from './../Users.module.css'
import userPhoto from '../../../../assets/images/img.jpeg'

const UsersList = (props) => {
    if (props.users.length === 0) {
        debugger
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then
            (response => {
                props.setUsers(response.data.items);
            });
    }


    return (
        props.users.map(u =>
            <div key={u.id} className={classes.userList__item}>
                <div className={classes.fuctional}>
                    <div className={classes.avatarImg}>
                        <img src={u.photos.small != null ? u.photos.small : userPhoto}
                        alt="avatar pic" />
                    </div>
                    <div>
                        {u.followed ?
                            <button className={classes.followBtn} onClick={() => props.unfollow(u.id)}>Follow</button> :
                            <button className={classes.followBtn} onClick={() => props.follow(u.id)}>Unfollow</button>}
                    </div>
                </div>
                <div className={classes.info}>
                    <div className={classes.info__item}>
                        <div>{u.name}</div>
                        <div>{u.status}</div>
                    </div>
                    <div className={classes.info__item}>
                        <div>{"u.location.contry+','"}</div>
                        <div>{'u.location.city'}</div>
                    </div>
                </div>
            </div>


        )
    )
}

export default UsersList;