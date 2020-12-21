import React from 'react';
import { connect } from 'react-redux';
import UsersList from './UsersList';
import Preloader from '../../../Common/Preloader/Preloader';
import { userUnfollow, userFollow, getUsers} from './../../../../redux/users_reducer';
import { compose } from 'redux';
import { getTotalUsersCount, getUsersCurrentPage, getUsersFollowingInProgress, getUsersIsFetching, getUsersPageSize} from '../../../../redux/selectors/users_selectors';
import { getUsersSelector } from '../../../../redux/selectors/users_selectors';

class UsersListContainer extends React.Component {

    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber) => {
        const {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize);
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

let mapStateToProps = (state) => {
    return {
        users: getUsersSelector(state),
        pageSize: getUsersPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getUsersCurrentPage(state),
        isFetching: getUsersIsFetching(state),
        followingInProgress: getUsersFollowingInProgress(state),
    }
}

export default compose(
    connect(mapStateToProps, {
        // Thunk creators:
        getUsers, userUnfollow, userFollow,
    }),
)(UsersListContainer);
