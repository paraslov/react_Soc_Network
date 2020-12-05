import React from 'react';
import classes from './../Users.module.css'
import userPhoto from '../../../../assets/images/img.jpeg'
import { NavLink } from 'react-router-dom';
import * as axios from 'axios';

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
                                <button className={classes.followBtn} onClick={() => {
                                    axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                                        { 
                                            withCredentials: true, 
                                            headers: { 'API-KEY': 'b874f63a-0fa8-401b-bae6-9877fac73927'}
                                        
                                        }).then(response => {
                                            if (response.data.resultCode === 0) {
                                                props.unfollow(u.id)
                                            }
                                        })
                                }}>Unfollow</button> :
                                <button className={classes.followBtn} onClick={() => {
                                    axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {},
                                        { 
                                            withCredentials: true, 
                                            headers: { 'API-KEY': 'b874f63a-0fa8-401b-bae6-9877fac73927'}
                                        }).then(response => {
                                            if (response.data.resultCode === 0) {
                                                props.follow(u.id)
                                            }
                                        })
                                }}>Follow</button>}
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