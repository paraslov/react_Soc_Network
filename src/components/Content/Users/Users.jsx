
import classes from './Users.module.css'
import * as axios from 'axios';
import UsersList from './UserList/UsersList';

const Users = (props) => {

    
    let getUsers = () => {
        if (props.users.length === 0) {
            debugger
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then
                (response => {
                    props.setUsers(response.data.items);
                });
        }
    }

    let usersList = props.users.map(
        u => <UsersList key={u.id} smallPhoto={u.photos.small} id = {u.id} name={u.name} 
        status = {u.status} followed = {u.followed}
        follow={props.follow} unfollow={props.unfollow} />
    )

    return (
        <div className={classes.usersPageWrapper}>
            <div>
            <button onClick = {getUsers}>Show Users</button>
            </div>

            <div className={classes.usersList}>
                { usersList }
            </div>
        </div>
    )
}

export default Users;