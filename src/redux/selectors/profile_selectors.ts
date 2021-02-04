import { AppStateType } from "../redux_store";

export const getProfile = (state: AppStateType) => {
    return state.profilePage.profile;
}

export const getProfileStatus = (state: AppStateType) => {
    return state.profilePage.status;
} 

export const getProfileChange = (state: AppStateType) => {
    return state.profilePage.profileChange;
} 

export const getAuthorizedUserId = (state: AppStateType) => {
    return state.auth.id;
}

export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth;
}

export const getAuthLogin = (state: AppStateType) => {
    return state.auth.login
}

export const getAuthEmail = (state: AppStateType) => {
    return state.auth.email
}
