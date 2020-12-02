import React from 'react';
import classes from './../Users.module.css'
import * as axios from 'axios';
import userPhoto from '../../../../assets/images/img.jpeg'

class UsersList extends React.Component {

    componentDidMount ()  {
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then
        (response  => {
            this.props.setUsers(response.data.items);
        });
    }

    render ()  {
        return <div>
        { 
        this.props.users.map( u => 
        <div key={u.id} className={classes.userList__item}>
            <div className={classes.fuctional}>
                <div className={classes.avatarImg}>
                    <img src={u.photos.small != null ? u.photos.small : userPhoto}
                        alt="avatar pic" />
                </div>
                <div>
                    {u.followed ?
                        <button className={classes.followBtn} onClick={() => this.props.unfollow(u.id)}>Follow</button> :
                        <button className={classes.followBtn} onClick={() => this.props.follow(u.id)}>Unfollow</button>}
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
}


export default UsersList;