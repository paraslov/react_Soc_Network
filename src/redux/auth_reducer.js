import { headerAPI } from "../api/api";


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

//=========== Thunk Creators ============================================================>

export const userAuthorization = () => {
    return (dispatch) => {
        headerAPI.loginUser().then
            (data => {
                if (data.resultCode === 0) {
                    let { id, email, login } = data.data;
                    dispatch(setAuthUsersData(id, email, login));
                }
            })
    }
} 

export const userLogginIn = (formData) => (dispatch) => {
    headerAPI.userAuthorization(formData).then(data => {
        if (data.resultCode === 0){
            headerAPI.loginUser().then
            (data => {
                if (data.resultCode === 0) {
                    let { id, email, login } = data.data;
                    dispatch(setAuthUsersData(id, email, login));
                }
            })
            alert('You were successfully logged in!')
        }

    })
}


export default authReducer;