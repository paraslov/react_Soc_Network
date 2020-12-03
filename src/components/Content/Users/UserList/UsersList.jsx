import React from 'react';
import classes from './../Users.module.css'
import userPhoto from '../../../../assets/images/img.jpeg'

const UsersList = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

        return <div>
            <div className={classes.pages}>
                {pages.map( p => {
                    return <span 
                        className={props.currentPage=== p && classes.selectedPage}
                        onClick={(e) => {props.onPageChanged(p)}}
                        >{p}</span> })}
                

            </div>
        { 
        props.users.map( u => 
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
        </div> )
        }

    </div>
}



export default UsersList;