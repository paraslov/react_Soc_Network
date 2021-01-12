import { headerAPI, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

// ================= Action creator Constants ======================================>

const SET_USERS_DATA = 'para_slov/auth/SET_USERS_DATA';
const GET_CAPTCHA_URL = 'para_slov/auth/GET_CAPTCHA_URL';

// ================= Action creator Types ======================================>

type userPayloadType = {
    id: number
    login: string
    email: string
    isAuth: boolean
}

type setUserDataActionType = {
    type: typeof SET_USERS_DATA
    payload: Array<userPayloadType>
}

type setCaptchaURLActionType = {
    type: typeof GET_CAPTCHA_URL;
    captchaURL: string;
}
//================== Initial State =================================================>

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaURL: null as string | null,
};

export type authInitialStateType = typeof initialState;

//================== Reducers =========================================================>

const authReducer = (state = initialState, action: setUserDataActionType | setCaptchaURLActionType) => {
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

export const setAuthUsersData = (userId:number, email:string, login:string, isAuth:boolean) =>
    ({ type: SET_USERS_DATA, payload: { id: userId, email, login, isAuth } })

export const setCaptchaURL = (captchaURL:string) => ({type: GET_CAPTCHA_URL, captchaURL})

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