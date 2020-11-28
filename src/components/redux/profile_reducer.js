const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
        postsData: [
            { message: 'Hi, wasup broh?', likeCounter: '13', id: '1' },
            { message: "It's my first post, lol", likeCounter: '27', id: '2' },
            { message: "Ulty approved it, maan", likeCounter: '41', id: '3' },
            { message: "Props was succesfully integrated!", likeCounter: '66', id: '4' }
        ],
        newPostText: '',
}

const profileReducer = (state = initialState, action) => {

	switch(action.type) {
		case ADD_POST:
			let newPost = {
				message: state.newPostText,
				likeCounter: 0,
				id: state.postsData.length + 1,
			};
			state.postsData.push(newPost);
			debugger
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