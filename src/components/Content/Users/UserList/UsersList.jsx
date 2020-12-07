import React from 'react';
import classes from './../Users.module.css'
import userPhoto from '../../../../assets/images/img.jpeg'
import { NavLink } from 'react-router-dom';

const UsersList = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return <div>
        <div className={classes.pages}>
            {pages.map(p => {
                return <span
                    className={props.currentPage === p && classes.selectedPage}
                    onClick={(e) => { props.onPageChanged(p) }}
                >{p}</span>
            })}


        </div>
        {
            props.users.map(u =>
                <div key={u.id} className={classes.userList__item}>
                    <div className={classes.fuctional}>
                        <div className={classes.avatarImg}>
                            <NavLink to={'/profile/' + u.id}>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto}
                                    alt="avatar pic" />
                            </NavLink>

                        </div>
                        <div>
                            {u.followed ?
                                <button disabled={props.followingInProgress.some(id => id === u.id)}
                                    className={classes.followBtn} onClick={() => {
                                        props.userUnfollow(u.id);
                                        // props.toggleFollowingProgress(true, u.id);
                                        // usersAPI.getUserUnfollowing(u.id).then(data => {
                                        //     if (data.resultCode === 0) {
                                        //         props.unfollow(u.id)
                                        //     };
                                        //     props.toggleFollowingProgress(false, u.id);
                                        //})
                                    }}>Unfollow</button> :
                                <button disabled={props.followingInProgress.some(id => id === u.id)}
                                    className={classes.followBtn} 
                                    onClick={() => { props.userFollow(u.id)} }>Follow</button>}
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
                </div>)
        }

    </div>
}



export default UsersList;