const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
        dialogsData: [
            { name: 'Ultimezia', userId: '1', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpLLVsWJVpAKeGB9BzKCNasH2k-Ur9VMwTMQ&usqp=CAU' },
            { name: 'Estar', userId: '2', avatar: 'https://i.pinimg.com/originals/44/c8/04/44c804938ab73dbd4ab2859065f6d87f.jpg' },
            { name: 'Adel', userId: '3', avatar: 'https://animauxmignion.files.wordpress.com/2012/07/20120705-144133.jpg' },
            { name: 'Alexandra', userId: '4', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlu-f9vXRn4GK_-Z79Z6gNXeMZFjuAcxqUrg&usqp=CAU' },
            { name: 'Alexandra II', userId: '5', avatar: 'https://store.playstation.com/store/api/chihiro/00_09_000/container/RU/ru/99/EP2402-CUSA05624_00-AV00000000000193/0/image?_version=00_09_000&platform=chihiro&bg_color=000000&opacity=100&w=720&h=720' },
            { name: 'JoyMe', userId: '6', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1gIPy2ZFVryg3q7VZfirsVVtMTzmfoG2P5Q&usqp=CAU' }
        ],
        messagesData: [
            { message: 'Hop Hey :)', id: '1' },
            { message: 'Is that legal?!', id: '2' }, 
            { message: 'How are u?!', id: '3' },
            { message: 'Hi, buddy!', id: '4' }
        ],
}

const messagesReducer = (state = initialState, action) => {
	switch (action.type) {
		case SEND_MESSAGE:
			return {
				...state,
				messagesData: [...state.messagesData, {
					message: action.newMessageText,
					id: state.messagesData.length + 1
				}],
			}
		
		default:
			return state;
	}
}

//====== Action Creators =============================================


export const sendMessage = (text) => ({ type: SEND_MESSAGE, newMessageText: text })

export default messagesReducer;