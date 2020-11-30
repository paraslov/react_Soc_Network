import UsersContainer from './UserList/UsersContainer';
import classes from './Users.module.css'

const Users = () => {

    return (
        <div className={classes.usersPageWrapper}>
            <div>
                Users:
            </div>

            <div className={classes.usersList}>
                <UsersContainer />
            </div>
        </div>
    )
}

export default Users;