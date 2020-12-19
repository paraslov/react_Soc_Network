import { profileAPI } from "../api/api";


// ================= Action creator Constants ======================================>

const ADD_POST = 'ADD-POST';
const POST_DELETE = 'POST_DELETE';
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_USER_STATUS = 'SET_USER_STATUS';

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
	switch(action.type) {
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
		
		default: 
			return state;
	}

}

//====== Action Creators =============================================

export const addPostActionCreator = (text) => ({ type: ADD_POST, newText: text})

export const deletePost = (postId) => ({type: POST_DELETE, postId }) // id: id       actually

// export const updateNewPostTextActionCreator = (text) => ({ type: UPDATE_NEW_POST_TEXT, newText: text })

export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })

export const setUserStatus = (status) => ({ type: SET_USER_STATUS, status: status })

//=========== Thunk Creators ============================================================>

export const getUserStatus = (id) => (dispatch) => {
        profileAPI.getStatus(id).then( response => {
            dispatch(setUserStatus(response));
        })
    }


export const updateUserStatus = (status) => (dispatch) => {
        profileAPI.updateStatus(status).then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setUserStatus(status));
            }
        })
    }


export const setUserTC = (userId) => {
	return (dispatch) => {
		profileAPI.setUser(userId).then
			(data => {
				dispatch(setUserProfile(data));
			});
	}
}



export default profileReducer;