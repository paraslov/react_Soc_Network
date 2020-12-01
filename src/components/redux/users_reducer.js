const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

let initialState = {
    users: [ ],
}

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
            debugger
            return {
                ...state,
                users: [...state.users, ...action.users]
            }

        default:
            return state;
    }

}

//====== Action Creators =============================================

export const followAC = (userId) => ({ type: FOLLOW, userId })

export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId })

export const setUsersAC = (users) => ({ type: SET_USERS, users })

export default usersReducer;