import React from 'react';
import Paginator from '../../../Common/Paginator/Paginator';
import { UsersType } from '../../../Common/Types/types';
import User from './User';

type PropsType = {
    portionSize : number
    totalUsersCount: number
    onPageChanged: (pageNumber: number) => void
    currentPage: number
    pageSize: number
    users: Array<UsersType>
    followingInProgress: Array<number>
    userFollow: (userId: number) => void
    userUnfollow: (userId: number) => void
}

const UsersList: React.FC<PropsType> = 
    ({ portionSize, totalUsersCount, onPageChanged, currentPage, pageSize, ...props }) => {

    return <div>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
            totalUsersCount={totalUsersCount} pageSize={pageSize} portionSize={portionSize}/>
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