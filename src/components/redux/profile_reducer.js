const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

const profileReducer = (state, action) => {

	switch(action.type) {
		case ADD_POST:
			let newPost = {
				message: state.newPostText,
				likeCounter: 0,
				id: state.postsData.length + 1,
			};
			state.postsData.push(newPost);
			state.newPostText = '';
			return state;

		case UPDATE_NEW_POST_TEXT:
			state.newPostText = action.newText;
			return state;

		default: 
			return state;
	}

}

//====== Action Creators =============================================

export const addPostActionCreator = () => ({ type: ADD_POST })

export const updateNewPostTextActionCreator = (text) =>
	({ type: UPDATE_NEW_POST_TEXT, newText: text })

export default profileReducer;