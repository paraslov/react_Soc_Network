import { profileAPI } from "../api/api";
import { stopSubmit } from 'redux-form';
import { PhotoTypes, ProfileType } from "../components/Common/Types/types";


//================== Initial State =================================================>

export type PostsDataType = {
    message: string
    likeCounter: number
    id: number
}

let initialState = {
    postsData: [
        { message: 'Hi, wasup broh?', likeCounter: 13, id: 1 },
        { message: "It's my first post, lol", likeCounter: 27, id: 2 },
        { message: "Ulty approved it, maan", likeCounter: 41, id: 3 },
        { message: "Props was succesfully integrated!", likeCounter: 66, id: 4 }
    ] as Array<PostsDataType>,
    profile: null as ProfileType | null,
    newPostText: null as null | string,
    status: '' as string,
    profileChange: null as null | string,
}

type ProfileInitialStateType = typeof initialState

//================== Reducer =========================================================>

const profileReducer = (state = initialState, action: any): ProfileInitialStateType => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                postsData: [...state.postsData, {
                    message: action.newText,
                    likeCounter: 0,
                    id: state.postsData.length + 1
                }],
                newPostText: ''
            }

        case POST_DELETE:
            return {
                ...state, postsData: state.postsData.filter(p => p.id !== action.postId)
            }

        // case UPDATE_NEW_POST_TEXT:
        // 	return {
        // 		...state,
        // 		newPostText: action.newText
        // 	}

        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }

        case SET_USER_STATUS:
            return {
                ...state,
                status: action.status
            }

        case SET_PROFILE_CHANGE_RESULT:
            return {
                ...state,
                profileChange: action.profileChange
            }

        case SET_USER_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos } as ProfileType
            }

        default:
            return state;
    }

}


// ================= Action creator Constants&Types ======================================>

const ADD_POST = 'para_slov/profile_reducer/ADD-POST';
const POST_DELETE = 'para_slov/profile_reducer/POST_DELETE';
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'para_slov/profile_reducer/SET_USER_PROFILE';
const SET_USER_STATUS = 'para_slov/profile_reducer/SET_USER_STATUS';
const SET_USER_PHOTO_SUCCESS = 'para_slov/profile_reducer/SET_USER_PHOTO_SUCCESS';
const SET_PROFILE_CHANGE_RESULT = 'para_slov/profile_reducer/SET_PROFILE_CHANGE_RESULT';

type AddPostActionType = { type: typeof ADD_POST, newText: string}
type DeletePostActionType = { type: typeof POST_DELETE, postId: number}
type SetUserProfileActionType = { type: typeof SET_USER_PROFILE, profile: ProfileType}
type SetUserStatusActionType = { type: typeof SET_USER_STATUS, status: string}
type SetUserPhotoSuccessActionType = { type: typeof SET_USER_PHOTO_SUCCESS, photos: PhotoTypes}
type SetProfileChangeActionType = { type: typeof SET_PROFILE_CHANGE_RESULT, profileChange: string}


//====== Action Creators =================================================================>

export const addPostActionCreator = (text: string): AddPostActionType => ({ type: ADD_POST, newText: text });

export const deletePost = (postId: number): DeletePostActionType => ({ type: POST_DELETE, postId }); 

// export const updateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text })

export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({ type: SET_USER_PROFILE, profile });

export const setUserStatus = (status: string): SetUserStatusActionType => ({ type: SET_USER_STATUS, status: status });

export const setUserPhotoSuccess = (photos: PhotoTypes): SetUserPhotoSuccessActionType => ({ type: SET_USER_PHOTO_SUCCESS, photos });

export const setProfileChange = (profileChange: string): SetProfileChangeActionType => ({ type: SET_PROFILE_CHANGE_RESULT, profileChange });

//=========== Thunk Creators ============================================================>

export const getUserStatus = (id: number) => async (dispatch: any) => {
    const response = await profileAPI.getStatus(id);
    dispatch(setUserStatus(response));
}

export const updateUserStatus = (status: string) => async (dispatch: any) => {
    const response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
    const data = await profileAPI.savePhoto(file);
    if(data.resultCode === 0){
        dispatch(setUserPhotoSuccess(data.data.photos));
    }
}

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const id = getState().auth.id;
    const data = await profileAPI.saveProfile(profile);
    if(data.resultCode === 0){
        alert('Profile changes applied!');
        dispatch(setUserTC(id));
        dispatch(setProfileChange('success'));
        debugger
    } else {
        dispatch(stopSubmit('edit-profile', { _error: data.messages[0] }));
        dispatch(setProfileChange('error'));
        return Promise.reject(data.messages[0]);
    }
}

export const setUserTC = (userId: number) => {
    return async (dispatch: any) => {
        const data = await profileAPI.setUser(userId);
        dispatch(setUserProfile(data));
    }
}


export default profileReducer;