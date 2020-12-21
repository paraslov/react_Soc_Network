import React from 'react';
import Paginator from '../../../Common/Paginator/Paginator';
import User from './User';

const UsersList = ({ totalUsersCount, onPageChanged, currentPage, pageSize, ...props }) => {

    return <div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
            totalUsersCount={totalUsersCount} pageSize={pageSize} />
        <div>
            {
                props.users.map(u => <User user={u}
                    followingInProgress={props.followingInProgress}
                    userUnfollow={props.userUnfollow}
                    userFollow={props.userFollow} />
                )
            }

        </div>

    </div>
}



export default UsersList;