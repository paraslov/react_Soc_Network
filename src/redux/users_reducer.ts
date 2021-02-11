import { ResultCodesEnum } from '../api/api'
import { usersAPI } from '../api/users_api'
import { UsersType } from '../components/Common/Types/types'
import { updateObjInArray } from '../utils/helpers/helpers'
import { BaseThunkType, InferActionsTypes } from './redux_store'


//* ================== Initial State =================================================>


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

//* ================== Reducer =========================================================>

const usersReducer = (state = initialState, action: UsersActionsTypes): UserInitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjInArray(state.users, action.userId, 'id', { followed: true })
            }                   // with helpers updateObjInArray func

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjInArray(state.users, action.userId, 'id', { followed: false })
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

//* ================= Action creator Constants&Types ======================================>

const FOLLOW = 'para_slov/users_reducer/FOLLOW'
const UNFOLLOW = 'para_slov/users_reducer/UNFOLLOW'
const SET_USERS = 'para_slov/users_reducer/SET_USERS'
const SET_CURRENT_PAGE = 'para_slov/users_reducer/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'para_slov/users_reducer/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'para_slov/users_reducer/TOGGLE_IS_FETCHING'
const TOGGLE_FOLLOWING_PROGRESS = 'para_slov/users_reducer/TOGGLE_FOLLOWING_PROGRESS'

type UsersActionsTypes = InferActionsTypes<typeof usersActions>

//* ====== Action Creators =================================================================>

export const usersActions = {
    follow: (userId: number) => ({ type: FOLLOW, userId } as const),

    unfollow: (userId: number) => ({ type: UNFOLLOW, userId } as const),

    setUsers: (users: Array<UsersType>) => ({ type: SET_USERS, users } as const),

    setCurrentPage: (currentPage: number) =>
        ({ type: SET_CURRENT_PAGE, currentPage } as const),

    setTotalUsersCount: (totalCount: number) =>
        ({ type: SET_TOTAL_USERS_COUNT, totalCount } as const),

    toggleIsFetching: (isFetching: boolean) =>
        ({ type: TOGGLE_IS_FETCHING, isFetching } as const),

    toggleFollowingProgress: (followingInProgress: any, userId: number) =>
        ({ type: TOGGLE_FOLLOWING_PROGRESS, followingInProgress, userId } as const),

}

//* =========== Thunk Creators ============================================================>

type ThunkType = BaseThunkType<UsersActionsTypes>

export const getUsers = (currentPage: number,
    pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        dispatch(usersActions.setCurrentPage(currentPage))
        dispatch(usersActions.toggleIsFetching(true))
        const data = await usersAPI.getUsers(currentPage, pageSize)
        dispatch(usersActions.toggleIsFetching(false))
        dispatch(usersActions.setUsers(data.items))
        dispatch(usersActions.setTotalUsersCount(data.totalCount))
    }
}

export const userUnfollow = (userId: number): ThunkType => async (dispatch) => {
    dispatch(usersActions.toggleFollowingProgress(true, userId))
    const data = await usersAPI.getUserUnfollowing(userId)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(usersActions.unfollow(userId))
    };
    dispatch(usersActions.toggleFollowingProgress(false, userId))
}


export const userFollow = (userId: number): ThunkType => async (dispatch) => {
    dispatch(usersActions.toggleFollowingProgress(true, userId))
    const data = await usersAPI.getUserFollowing(userId)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(usersActions.follow(userId))
    };
    dispatch(usersActions.toggleFollowingProgress(false, userId))
}




export default usersReducer





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