import React from 'react';
import { connect } from 'react-redux';
import UsersList from './UsersList';
import Preloader from '../../../Common/Preloader/Preloader';
import { userUnfollow, userFollow, getUsers} from '../../../../redux/users_reducer';
import { compose } from 'redux';
import { getPortionSize, getTotalUsersCount, getUsersCurrentPage, getUsersFollowingInProgress, getUsersIsFetching, getUsersPageSize} from '../../../../redux/selectors/users_selectors';
import { getUsersSelector } from '../../../../redux/selectors/users_selectors';
import { UsersType } from '../../../Common/Types/types';
import { AppStateType } from '../../../../redux/redux_store';

type MapStatePropsType ={
    currentPage: number
    pageSize: number
    isFetching: boolean   
    totalUsersCount: number
    users: Array<UsersType>
    followingInProgress: Array<number>
    portionSize: number
}
type MapDispatchPropsType = {
    userUnfollow: (userId: number)=> void
    userFollow: (userId: number)=> void
    getUsers: (currentPage: number, pageSize: number) => void
}

type OwnPropsType = {
    pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersListContainer extends React.Component<PropsType> {

    componentDidMount() {
        const {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize);
    }

    render() {

        return <>
        <h2>{this.props.pageTitle}</h2>
        {this.props.isFetching ? <Preloader /> : null}
        <div>
            <UsersList
                currentPage={this.props.currentPage} users={this.props.users}
                totalUsersCount={this.props.totalUsersCount}
                pageSize={this.props.pageSize} followingInProgress={this.props.followingInProgress}
                onPageChanged={this.onPageChanged} 
                userUnfollow={this.props.userUnfollow} userFollow={this.props.userFollow}
                portionSize = {this.props.portionSize}
            />
        </div>
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsersSelector(state),
        pageSize: getUsersPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getUsersCurrentPage(state),
        isFetching: getUsersIsFetching(state),
        followingInProgress: getUsersFollowingInProgress(state),
        portionSize: getPortionSize(state),
    }
}

export default compose(

    connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType >(mapStateToProps, {
        // Thunk creators:
        getUsers, userUnfollow, userFollow,
    }),
)(UsersListContainer);
