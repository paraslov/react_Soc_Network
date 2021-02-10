import { authAPI, ResultCodeForCaptcha, ResultCodesEnum, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import { AppStateType } from "./redux_store";
import { UserLogginInFormDataType } from "../components/Common/Types/types";

// ================= Action creator Constants ======================================>

const SET_USERS_DATA = 'para_slov/auth/SET_USERS_DATA';
const GET_CAPTCHA_URL = 'para_slov/auth/GET_CAPTCHA_URL';

//================== Initial State =================================================>

// export type AuthInitialStateType = {
//     id: number | null,
//     email: string | null,
//     login: string | null,
//     isAuth: boolean,
//     captchaURL: string | null,
// }

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaURL: null as string | null,
};

export type AuthInitialStateType = typeof initialState;

//================== Reducers =========================================================>setUserDataActionType | setCaptchaURLActionType

const authReducer = (state = initialState, action: AuthActionsTypes): AuthInitialStateType => {
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

// ================= Action creator Types ======================================>

type AuthActionsTypes = setUserDataActionType | setCaptchaURLActionType

type userPayloadType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}

type setUserDataActionType = {
    type: typeof SET_USERS_DATA
    payload: userPayloadType
}

type setCaptchaURLActionType = {
    type: typeof GET_CAPTCHA_URL;
    captchaURL: string;
}

//====== Action Creators =============================================

export const setAuthUsersData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): setUserDataActionType =>
    ({ type: SET_USERS_DATA, payload: { id: userId, email, login, isAuth } })

export const setCaptchaURL = (captchaURL: string): setCaptchaURLActionType => ({type: GET_CAPTCHA_URL, captchaURL})

//=========== Thunk Creators ============================================================>

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AuthActionsTypes>

export const userAuthorization = (): ThunkType => async (dispatch) => {
    let data = await authAPI.loginUser()
    if (data.resultCode === 0) {
        let { id, email, login } = data.data;
        dispatch(setAuthUsersData(id, email, login, true));
    }

}
// ! can't make typesation of stopSubmit yet
export const userLogginIn = (formData: UserLogginInFormDataType): ThunkType => async (dispatch) => {
    let data = await authAPI.userAuthorization(formData);
    if (data.resultCode === 0) {
        authAPI.loginUser().then
            ((data) => {
                if (data.resultCode === ResultCodesEnum.Success) {
                    dispatch(userAuthorization());                    
                }
            })
        alert('You were successfully logged in!')
    } else {
        if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired){
            dispatch(getCaptchaURL());
        }
        let errorMessage = data.messages.length > 0 ? data.messages[0] : 'something wrong';
        // @ts-ignore
        dispatch(stopSubmit('login', { _error: errorMessage }));
    }
}

export const userLogout = (): ThunkType => async (dispatch) => {
    let data = await authAPI.userLogout();
    if (data.resultCode === 0) {
        authAPI.userLogout().then
            ((data) => {
                if (data.resultCode === ResultCodesEnum.Success) {
                    dispatch(setAuthUsersData(null, null, null, false));
                }
            })
    }
}

export const getCaptchaURL = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.captcha();
    const captchaURL = data.url;
    dispatch(setCaptchaURL(captchaURL));
}


export default authReducer;