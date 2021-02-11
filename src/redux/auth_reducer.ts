import { ResultCodeForCaptcha, ResultCodesEnum } from "../api/api";
import { FormAction, stopSubmit } from "redux-form";
import { BaseThunkType, InferActionsTypes } from "./redux_store";
import { UserLogginInFormDataType } from "../components/Common/Types/types";
import { authAPI } from "../api/auth_api";
import { securityAPI } from "../api/security_api";

//* ================= Action creator Constants ======================================>

const SET_USERS_DATA = 'para_slov/auth/SET_USERS_DATA';
const GET_CAPTCHA_URL = 'para_slov/auth/GET_CAPTCHA_URL';

//* ================== Initial State =================================================>

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

//* ================= Action creator Types ======================================>

type AuthActionsTypes = InferActionsTypes<typeof authActions>

//* ====== Action Creators =========================================================>

export const authActions = {
    setAuthUsersData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) =>
        ({ type: SET_USERS_DATA, payload: { id: userId, email, login, isAuth } } as const),

    setCaptchaURL: (captchaURL: string) => ({ type: GET_CAPTCHA_URL, captchaURL } as const),
}

//* =========== Thunk Creators ============================================================>

type ThunkType = BaseThunkType<AuthActionsTypes | FormAction>

export const userAuthorization = (): ThunkType => async (dispatch) => {
    let data = await authAPI.loginUser()
    if (data.resultCode === ResultCodesEnum.Success) {
        let { id, email, login } = data.data;
        dispatch(authActions.setAuthUsersData(id, email, login, true));
    }

}
// ! can't make strict typesation of stopSubmit
export const userLogginIn = (formData: UserLogginInFormDataType): ThunkType => async (dispatch) => {
    let data = await authAPI.userAuthorization(formData);
    if (data.resultCode === ResultCodesEnum.Success) {
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
        dispatch(stopSubmit('login', { _error: errorMessage }));
    }
}

export const userLogout = (): ThunkType => async (dispatch) => {
    let data = await authAPI.userLogout();
    if (data.resultCode === 0) {
        authAPI.userLogout().then
            ((data) => {
                if (data.resultCode === ResultCodesEnum.Success) {
                    dispatch(authActions.setAuthUsersData(null, null, null, false));
                }
            })
    }
}

export const getCaptchaURL = (): ThunkType => async (dispatch) => {
    const data = await securityAPI.captcha();
    const captchaURL = data.url;
    dispatch(authActions.setCaptchaURL(captchaURL));
}


export default authReducer;