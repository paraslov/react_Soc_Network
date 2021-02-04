import classes from './Users.module.css'
import UsersListContainer from './UserList/UsersListContainer';

const Users = () => {
    return (
        <div className={classes.usersPageWrapper}>
            <div className={classes.usersList}>
                <UsersListContainer pageTitle = 'Para Slov'/>
            </div>
        </div>
    )
}

export default Users;