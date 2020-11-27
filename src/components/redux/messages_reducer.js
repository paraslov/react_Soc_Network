const SEND_MESSAGE = 'SEND-MESSAGE';
const UPDATE_MESSAGE_TEXT = 'UPDATE-MESSAGE-TEXT';

const messagesReducer = (state, action) => {

	switch (action.type) {
		case SEND_MESSAGE:
			let newMessage = {
				message: state.newMessageText,
				id: state.messagesData.length + 1
			}
			state.messagesData.push(newMessage);
			state.newMessageText = '';
			return state;

		case UPDATE_MESSAGE_TEXT:
			state.newMessageText = action.newText;
			return state;

		default:
			return state;
	}
}

//====== Action Creators =============================================


export const sendMessageActionCreator = () => ({ type: SEND_MESSAGE })

export const updateMessageTextActionCreator = (text) =>
	({ type: UPDATE_MESSAGE_TEXT, newText: text })

export default messagesReducer;