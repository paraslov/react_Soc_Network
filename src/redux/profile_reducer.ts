import { ResultCodesEnum } from "../api/api"
import { FormAction, stopSubmit } from 'redux-form'
import { PhotoType, PostsDataType, ProfileType } from "../components/Common/Types/types";
import { AppStateType, BaseThunkType, InferActionsTypes } from "./redux_store"
import { profileAPI } from "../api/profile_api"


//================== Initial State =================================================>


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

const profileReducer = (state = initialState, action: ProfileActionsTypes): ProfileInitialStateType => {
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

const ADD_POST = 'para_slov/profile_reducer/ADD-POST'
const POST_DELETE = 'para_slov/profile_reducer/POST_DELETE'
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'para_slov/profile_reducer/SET_USER_PROFILE'
const SET_USER_STATUS = 'para_slov/profile_reducer/SET_USER_STATUS'
const SET_USER_PHOTO_SUCCESS = 'para_slov/profile_reducer/SET_USER_PHOTO_SUCCESS'
const SET_PROFILE_CHANGE_RESULT = 'para_slov/profile_reducer/SET_PROFILE_CHANGE_RESULT'

type ProfileActionsTypes = InferActionsTypes<typeof profileActions> 


//====== Action Creators =================================================================>

export const profileActions = {
    addPost: (text: string) => ({ type: ADD_POST, newText: text } as const),

    deletePost: (postId: number) => ({ type: POST_DELETE, postId } as const),

    // export const updateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text })

    setUserProfile: (profile: ProfileType) => ({ type: SET_USER_PROFILE, profile } as const),

    setUserStatus: (status: string) => ({ type: SET_USER_STATUS, status: status } as const),

    setUserPhotoSuccess: (photos: PhotoType) => ({ type: SET_USER_PHOTO_SUCCESS, photos } as const),

    setProfileChange: (profileChange: string) => ({ type: SET_PROFILE_CHANGE_RESULT, profileChange } as const),
}

//=========== Thunk Creators ============================================================>

type ThunkType = BaseThunkType<ProfileActionsTypes | FormAction>

export const getUserStatus = (id: number): ThunkType => async (dispatch) => {
    const status = await profileAPI.getStatus(id)
    dispatch(profileActions.setUserStatus(status))
}

export const updateUserStatus = (status: string): ThunkType => async (dispatch) => {
    const data = await profileAPI.updateStatus(status)
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(profileActions.setUserStatus(status))
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(file)
    if(data.resultCode === 0){
        dispatch(profileActions.setUserPhotoSuccess(data.data.photos));
    }
}
// ! can't make strict typesation yet because of stopSubmit
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const id = getState().auth.id;
    const data = await profileAPI.saveProfile(profile)
    if(data.resultCode === 0){
        alert('Profile changes applied!')
        if(id!=null){
            dispatch(setUserTC(id))
        } else {
            throw new Error("user id can't be null")
        }
        dispatch(profileActions.setProfileChange('success'))
        debugger
    } else { 
        dispatch(stopSubmit('edit-profile', { _error: data.messages[0] }))
        dispatch(profileActions.setProfileChange('error'))
        return Promise.reject(data.messages[0])
    }
}

export const setUserTC = (userId: number): ThunkType => {
    return async (dispatch) => {
        const data = await profileAPI.setUser(userId)
        dispatch(profileActions.setUserProfile(data))
    }
}


export default profileReducer;