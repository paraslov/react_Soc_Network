const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

let initialState = {
        users: [
            { id: '1', followed: true, fullName: 'Sergio', status: 'Que Tal?', 
        location: {contry: 'Spain', city: 'Valencia'}  },
            { id: '2', followed: false, fullName: 'Rizvan', status: 'Am a big shishkas', 
        location: {contry: 'Podmoskovia', city: 'Dreznya City'}  },
            { id: '3', followed: false, fullName: 'Michel', status: 'Am a big Boss!', 
        location: {contry: 'Russia', city: 'Moscow'}  },
            { id: '4', followed: true, fullName: 'Insane', status: 'Class 4 class', 
        location: {contry: 'Ionia', city: 'Restar'}  },
        ],
}

const usersReducer = (state = initialState, action) => {
	switch(action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map( (u) => {
                    if (u.id === action.userId) {
                        return {...u, followed: true }
                    }
                    return u;
                })
            }
        
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map( (u) => {
                    if (u.id === action.userId) {
                        return {...u, followed: false }
                    }
                    return u;
                })
            }

        case SET_USERS:
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

export const unfollowAC = (userId) => ({ type: UNFOLLOW, userId})

export const setUsersAC = (users) => ({ type: SET_USERS, users})

export default usersReducer;