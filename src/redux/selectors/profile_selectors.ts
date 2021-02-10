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

export const getPostsData = (state: AppStateType) => {
    return state.profilePage.postsData
}

export const getNewPostText = (state: AppStateType) => {
    return state.profilePage.newPostText
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

export const getCaptchaURLState = (state: AppStateType) => {
    return state.auth.captchaURL
}
