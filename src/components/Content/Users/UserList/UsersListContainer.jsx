import React from 'react';
import { connect } from 'react-redux';
import UsersList from './UsersList';
import Preloader from '../../../Common/Preloader/Preloader';
import { userUnfollow, userFollow, getUsers} from './../../../../redux/users_reducer';
import { compose } from 'redux';
import { getTotalUsersCount, getUsersCurrentPage, getUsersFollowingInProgress, getUsersIsFetching, getUsersPageSize, getUsersState } from '../../../../redux/users_selectors';

class UsersListContainer extends React.Component {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
        // this.props.setCurrentPage(pageNumber);
        // this.props.toggleIsFetching(true);
        // usersAPI.getUsers(pageNumber, this.props.pageSize).then
        //     (data => {
        //         this.props.toggleIsFetching(false);
        //         this.props.setUsers(data.items);
        //     });
    }

    render() {

        return <>
        {this.props.isFetching ? <Preloader /> : null}
        <div>
            <UsersList
                currentPage={this.props.currentPage} users={this.props.users}
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize} followingInProgress={this.props.followingInProgress}
                onPageChanged={this.onPageChanged} 
                userUnfollow={this.props.userUnfollow} userFollow={this.props.userFollow}
            />
        </div>
        </>
    }
}

// let meStateToProps = (state) => {
//     return {
//         users: state.usersPage.users,
//         pageSize: state.usersPage.pageSize,
//         totalUsersCount: state.usersPage.totalUsersCount,
//         currentPage: state.usersPage.currentPage,
//         isFetching: state.usersPage.isFetching,
//         followingInProgress: state.usersPage.followingInProgress,
//     }
// }

let meStateToProps = (state) => {
    return {
        users: getUsersState(state),
        pageSize: getUsersPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getUsersCurrentPage(state),
        isFetching: getUsersIsFetching(state),
        followingInProgress: getUsersFollowingInProgress(state),
    }
}

// let mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId));
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId));
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users));
//         },
//         setCurrentPage: (currentPage) => {
//             dispatch(setCurrentPageAC(currentPage));
//         },
//         setTotalUsersCount: (totalCount) => {
//             dispatch(setTotalUsersCountAC(totalCount))
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         }
//     }
// }

export default compose(
    connect(meStateToProps, {
        // Thunk creators:
        getUsers, userUnfollow, userFollow,
    }),
)(UsersListContainer);
