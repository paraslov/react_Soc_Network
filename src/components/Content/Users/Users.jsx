import UsersListContainer from './UserList/UsersListContainer';
import classes from './Users.module.css'

const Users = () => {

    return (
        <div className={classes.usersPageWrapper}>
            <div>
                Users:
            </div>

            <div className={classes.usersList}>
                <UsersListContainer />
            </div>
        </div>
    )
}

export default Users;