// ================= Action creator Constants ======================================>

const SET_USERS_DATA = 'SET_USERS_DATA';

//================== Initial State =================================================>

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
};

//================== Reducers =========================================================>

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_USERS_DATA: 
            return {
                ...state,
                ...action.data,
                isAuth: true,
            }

        default: 
            return state;
        
    }
}

//====== Action Creators =============================================

export const setAuthUsersData = (userId, email, login) => 
({ type: SET_USERS_DATA, data: {userId, email, login} })

export default authReducer;