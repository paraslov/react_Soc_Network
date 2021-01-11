import { headerAPI, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";


// ================= Action creator Constants ======================================>

const SET_USERS_DATA = 'joyme/auth/SET_USERS_DATA';
const GET_CAPTCHA_URL = 'joyme/auth/GET_CAPTCHA_URL';

//================== Initial State =================================================>

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false,
    captchaURL: null,
};

//================== Reducers =========================================================>

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS_DATA:
            return {
                ...state,
                ...action.payload,
            }
        case GET_CAPTCHA_URL:
            return {
                ...state,
                captchaURL: action.captchaURL,
            }

        default:
            return state;

    }
}

//====== Action Creators =============================================

export const setAuthUsersData = (userId, email, login, isAuth) =>
    ({ type: SET_USERS_DATA, payload: { id: userId, email, login, isAuth } })

export const setCaptchaURL = (captchaURL) => ({type: GET_CAPTCHA_URL, captchaURL})

//=========== Thunk Creators ============================================================>

export const userAuthorization = () => async (dispatch) => {
    let data = await headerAPI.loginUser()
    if (data.resultCode === 0) {
        let { id, email, login } = data.data;
        dispatch(setAuthUsersData(id, email, login, true));
    }

}

export const userLogginIn = (formData) => async (dispatch) => {
    let data = await headerAPI.userAuthorization(formData);
    if (data.resultCode === 0) {
        headerAPI.loginUser().then
            (data => {
                if (data.resultCode === 0) {
                    dispatch(userAuthorization());
                }
            })
        alert('You were successfully logged in!')
    } else {
        if (data.resultCode === 10){
            dispatch(getCaptchaURL());
        }
        let errorMessage = data.messages.length > 0 ? data.messages[0] : 'something wrong';
        dispatch(stopSubmit('login', { _error: errorMessage }));
    }
}

export const userLogout = () => async (dispatch) => {
    let data = await headerAPI.userLogout();
    if (data.resultCode === 0) {
        headerAPI.userLogout().then
            (data => {
                if (data.resultCode === 0) {
                    dispatch(setAuthUsersData(null, null, null, false));
                }
            })
    }
}

export const getCaptchaURL = () => async (dispatch) => {
    const data = await securityAPI.captcha();
    const captchaURL = data.url;
    dispatch(setCaptchaURL(captchaURL));
}


export default authReducer;