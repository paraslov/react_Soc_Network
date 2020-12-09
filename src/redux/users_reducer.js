
import { usersAPI } from './../api/api';

// ================= Action creator Constants ======================================>

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_PROGRESS = 'TOGGLE_FOLLOWING_PROGRESS'

//================== Initial State =================================================>

let initialState = {
    users: [],
    pageSize: 7,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: true,
    followingInProgress: [],
};

//================== Reducer =========================================================>

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            }

        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map((u) => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }

        case SET_USERS:
            return {
                ...state,
                users: action.users
            }

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
                    state.followingInProgress.filter(id => id !== action.userId)
            }

        default:
            return state;
    }

}

//====== Action Creators ============================================================>

export const follow = (userId) => ({ type: FOLLOW, userId })

export const unfollow = (userId) => ({ type: UNFOLLOW, userId })

export const setUsers = (users) => ({ type: SET_USERS, users })

export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })

export const setTotalUsersCount = (totalCount) => ({ type: SET_TOTAL_USERS_COUNT, totalCount })

export const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })

export const toggleFollowingProgress = (followingInProgress, userId) =>
    ({ type: TOGGLE_FOLLOWING_PROGRESS, followingInProgress, userId })


//=========== Thunk Creators ============================================================>

export const getUsers = (currentPage, pageSize) => {
    return (dispatch) => {
        dispatch(setCurrentPage(currentPage));
        dispatch(toggleIsFetching(true));
        usersAPI.getUsers(currentPage, pageSize).then(data => {
            dispatch(toggleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
        });
    }
}

export const userUnfollow = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));
        usersAPI.getUserUnfollowing(userId).then(data => {
            if (data.resultCode === 0) {
                dispatch(unfollow(userId));
            };
            dispatch(toggleFollowingProgress(false, userId));
        })
    }
}

export const userFollow = (userId) => {
    return (dispatch) => {
        dispatch(toggleFollowingProgress(true, userId));
        usersAPI.getUserFollowing(userId).then(data => {
            if (data.resultCode === 0) {
                dispatch(follow(userId));
            };
            dispatch(toggleFollowingProgress(false, userId));
        })
    }
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