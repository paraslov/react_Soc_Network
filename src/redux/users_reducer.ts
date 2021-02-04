
import { ThunkAction } from 'redux-thunk';
import { usersAPI } from '../api/api';
import { UsersType } from '../components/Common/Types/types';
import { updateObjInArray } from '../utils/helpers/helpers';
import { AppStateType } from './redux_store';


//================== Initial State =================================================>


let initialState = {
    users: [] as Array<UsersType>,
    pageSize: 10,
    portionSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>, // array of users id's
};

type UserInitialStateType = typeof initialState

//================== Reducer =========================================================>

const usersReducer = (state = initialState, action: UsersActionsTypes): UserInitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjInArray(state.users, action.userId, 'id', {followed: true})
            }                   // with helpers updateObjInArray func

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjInArray(state.users, action.userId, 'id', {followed: false})
                // users: state.users.map((u) => {
                //     if (u.id === action.userId) {
                //         return { ...u, followed: false }
                //     }
                //     return u;
                // })            // old style logic without updateObjInArray
            } 

        case SET_USERS:
            return { ...state, users: action.users }

        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }

        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalCount
            }

        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }

        case TOGGLE_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.followingInProgress ?
                    [...state.followingInProgress, action.userId] :
                    state.followingInProgress.filter((id: number) => id !== action.userId)
            }

        default:
            return state;
    }

}

// ================= Action creator Constants&Types ======================================>

const FOLLOW = 'para_slov/users_reducer/FOLLOW';
const UNFOLLOW = 'para_slov/users_reducer/UNFOLLOW';
const SET_USERS = 'para_slov/users_reducer/SET_USERS';
const SET_CURRENT_PAGE = 'para_slov/users_reducer/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'para_slov/users_reducer/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'para_slov/users_reducer/TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'para_slov/users_reducer/TOGGLE_FOLLOWING_PROGRESS'

type UsersActionsTypes = FollowActionType | UnfollowActionType | SetUsersActionType | SetCurrentPageActionType |
    SetTotalUsersCountActionType | ToggleIsFetchingActionType | ToggleFollowingProgressActionType

type FollowActionType = { type: typeof FOLLOW, userId: number }
type UnfollowActionType = { type: typeof UNFOLLOW, userId: number }
type SetUsersActionType = { type: typeof SET_USERS, users: Array<UsersType>}
type SetCurrentPageActionType = { type: typeof SET_CURRENT_PAGE, currentPage: number }
type SetTotalUsersCountActionType = { type: typeof SET_TOTAL_USERS_COUNT, totalCount: number }
type ToggleIsFetchingActionType = { type: typeof TOGGLE_IS_FETCHING, isFetching: boolean }
type ToggleFollowingProgressActionType = { type: typeof TOGGLE_FOLLOWING_PROGRESS, followingInProgress: any,
    userId: number }

//====== Action Creators =================================================================>

export const follow = (userId: number): FollowActionType => ({ type: FOLLOW, userId })

export const unfollow = (userId: number): UnfollowActionType => ({ type: UNFOLLOW, userId })

export const setUsers = (users: Array<UsersType>): SetUsersActionType => ({ type: SET_USERS, users })

export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => 
    ({ type: SET_CURRENT_PAGE, currentPage })

export const setTotalUsersCount = (totalCount: number): SetTotalUsersCountActionType => 
    ({ type: SET_TOTAL_USERS_COUNT, totalCount })

export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingActionType => 
    ({ type: TOGGLE_IS_FETCHING, isFetching })

export const toggleFollowingProgress = (followingInProgress: any, userId: number): ToggleFollowingProgressActionType =>
    ({ type: TOGGLE_FOLLOWING_PROGRESS, followingInProgress, userId })


//=========== Thunk Creators ============================================================>

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, UsersActionsTypes>

export const getUsers = (currentPage: number, 
    pageSize: number): ThunkType => {
    return async (dispatch, getState) => {        
        dispatch(setCurrentPage(currentPage));
        dispatch(toggleIsFetching(true));
        const data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

export const userUnfollow = (userId: number): ThunkType => async (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));
        const data = await usersAPI.getUserUnfollowing(userId)
            if (data.resultCode === 0) {
                dispatch(unfollow(userId));
            };
            dispatch(toggleFollowingProgress(false, userId));
    }


export const userFollow = (userId: number): ThunkType => async (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));
        const data = await usersAPI.getUserFollowing(userId)
            if (data.resultCode === 0) {
                dispatch(follow(userId));
            };
            dispatch(toggleFollowingProgress(false, userId));
    }




export default usersReducer;





//======================== My DB ===========================================>

// props.setUsers(
//     [{
//         id: '1', avatar: 'https://klike.net/uploads/posts/2019-03/1551512876_4.jpg',
//         followed: true, fullName: 'Sergio', status: 'Que Tal?',
//         location: { contry: 'Spain', city: 'Valencia' }
//     },
//     {
//         id: '2', avatar: 'https://risovach.ru/upload/2013/11/mem/pidrila-ebanaya-kotik_34191264_orig_.jpeg',
//         followed: false, fullName: 'Rizvan', status: 'Am a big shishkas',
//         location: { contry: 'Podmoskovia', city: 'Dreznya City' }
//     },
//     {
//         id: '3', avatar: 'https://avatarko.ru/img/kartinka/9/kot_8173.jpg',
//         followed: false, fullName: 'Michel', status: 'Am a big Boss!',
//         location: { contry: 'Russia', city: 'Moscow' }
//     },
//     {
//         id: '4', avatar: 'https://shutniki.club/wp-content/uploads/2020/04/174602245.jpg',
//         followed: true, fullName: 'Insane', status: 'Class 4 class',
//         location: { contry: 'Ionia', city: 'Restar' }
//     }]
// )