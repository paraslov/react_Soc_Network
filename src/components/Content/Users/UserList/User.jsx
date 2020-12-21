import React from 'react';
import classes from './../Users.module.css'
import userPhoto from '../../../../assets/images/img.jpeg'
import { NavLink } from 'react-router-dom';

const User = ({user, followingInProgress, userUnfollow, userFollow}) => {
    return (
        <div key={user.id} className={classes.userList__item}>
                    <div className={classes.fuctional}>
                        <div className={classes.avatarImg}>
                            <NavLink to={'/profile/' + user.id}>
                                <img src={user.photos.small != null ? user.photos.small : userPhoto}
                                    alt="avatar pic" />
                            </NavLink>

                        </div>
                        <div>
                            {user.followed ?
                                <button disabled={followingInProgress.some(id => id === user.id)}
                                    className={classes.followBtn} onClick={() => {
                                        userUnfollow(user.id);
                                        // props.toggleFollowingProgress(true, u.id);
                                        // usersAPI.getUserUnfollowing(u.id).then(data => {
                                        //     if (data.resultCode === 0) {
                                        //         props.unfollow(u.id)
                                        //     };
                                        //     props.toggleFollowingProgress(false, u.id);
                                        //})
                                    }}>Unfollow</button> :
                                <button disabled={followingInProgress.some(id => id === user.id)}
                                    className={classes.followBtn} 
                                    onClick={() => { userFollow(user.id)} }>Follow</button>}
                        </div>
                    </div>
                    <div className={classes.info}>
                        <div className={classes.info__item}>
                            <div>{user.name}</div>
                            <div>{user.status}</div>
                        </div>
                        <div className={classes.info__item}>
                            <div>{"user.location.contry+','"}</div>
                            <div>{'user.location.city'}</div>
                        </div>
                    </div>
                </div>
    )
}


export default User;