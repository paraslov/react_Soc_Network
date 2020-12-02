
import classes from './Users.module.css'
import UsersListContainer from './UserList/UsersListContainer';

const Users = () => {
    return (
        <div className={classes.usersPageWrapper}>
            <div className={classes.usersList}>
                <UsersListContainer />
            </div>
        </div>
    )
}

export default Users;