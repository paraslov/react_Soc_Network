import { profileAPI } from "../api/api";


// ================= Action creator Constants ======================================>

const ADD_POST = 'joyme/profile_reducer/ADD-POST';
const POST_DELETE = 'joyme/profile_reducer/POST_DELETE';
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'joyme/profile_reducer/SET_USER_PROFILE';
const SET_USER_STATUS = 'joyme/profile_reducer/SET_USER_STATUS';
const SET_USER_PHOTO_SUCCESS = 'joyme/profile_reducer/SET_USER_PHOTO_SUCCESS';

//================== Initial State =================================================>

let initialState = {
    postsData: [
        { message: 'Hi, wasup broh?', likeCounter: '13', id: 1 },
        { message: "It's my first post, lol", likeCounter: '27', id: 2 },
        { message: "Ulty approved it, maan", likeCounter: '41', id: 3 },
        { message: "Props was succesfully integrated!", likeCounter: '66', id: 4 }
    ],
    profile: '',
    // newPostText: '',
    status: '',
}

//================== Reducer =========================================================>

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                postsData: [...state.postsData, {
                    message: action.newText,
                    likeCounter: 0,
                    id: state.postsData.length + 1,
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

        case SET_USER_PHOTO_SUCCESS:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos }
            }



        default:
            return state;
    }

}

//====== Action Creators =============================================

export const addPostActionCreator = (text) => ({ type: ADD_POST, newText: text });

export const deletePost = (postId) => ({ type: POST_DELETE, postId }); // id: id       actually

// export const updateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text })

export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });

export const setUserStatus = (status) => ({ type: SET_USER_STATUS, status: status });

export const setUserPhotoSuccess = (photos) => ({ type: SET_USER_PHOTO_SUCCESS, photos });

//=========== Thunk Creators ============================================================>

export const getUserStatus = (id) => async (dispatch) => {
    const response = await profileAPI.getStatus(id);
    dispatch(setUserStatus(response));
}

export const updateUserStatus = (status) => async (dispatch) => {
    const response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setUserStatus(status));
    }
}

export const savePhoto = (file) => async (dispatch) => {
    const data = await profileAPI.savePhoto(file);
    if(data.resultCode === 0){
        dispatch(setUserPhotoSuccess(data.data.photos));
    }
}

export const setUserTC = (userId) => {
    return async (dispatch) => {
        const data = await profileAPI.setUser(userId);
        dispatch(setUserProfile(data));
    }
}


export default profileReducer;