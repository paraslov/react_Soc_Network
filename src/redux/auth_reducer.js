import { headerAPI } from "../api/api";
import {stopSubmit} from "redux-form";


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
                ...action.payload,
            }

        default: 
            return state;
        
    }
}

//====== Action Creators =============================================

export const setAuthUsersData = (userId, email, login, isAuth) => 
({ type: SET_USERS_DATA, payload: {id:userId, email, login, isAuth} })

//=========== Thunk Creators ============================================================>

export const userAuthorization = () => {
    return (dispatch) => {
        return headerAPI.loginUser().then
            (data => {
                if (data.resultCode === 0) {
                    let { id, email, login } = data.data;
                    dispatch(setAuthUsersData(id, email, login, true));
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
                    dispatch(userAuthorization());
                } 
            })
            alert('You were successfully logged in!')
        } else {
            let errorMessage = data.messages.length > 0 ? data.messages[0] : 'something wrong';
            dispatch(stopSubmit('login', { _error: errorMessage }));
        }
    })
}
export const userLogout = () => (dispatch) => {
    headerAPI.userLogout().then(data => {
        if (data.resultCode === 0){
            headerAPI.userLogout().then
            (data => {
                if (data.resultCode === 0) {
                    dispatch(setAuthUsersData(null, null, null, false));
                }
            })
        }
    })
}


export default authReducer;