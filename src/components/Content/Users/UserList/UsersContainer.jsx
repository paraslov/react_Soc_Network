import { connect } from 'react-redux';
import { followAC, setUsersAC, unfollowAC } from './../../../redux/users_reducer';
import UsersList from './UsersList';


let mapStateToProps = (state) => {
    return ({
        users: state.usersPage.users,
    })
}

let mapDispatchToProps = (dispatch) => {
    return ({
        follow: (userId) => {
            dispatch(followAC(userId));
        },
        unfollow: (userId) => {
            dispatch(unfollowAC(userId));
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users));
        }

    })
}


const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersList)

export default UsersContainer;