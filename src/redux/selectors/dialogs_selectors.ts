import { AppStateType } from "../redux_store"


export const getDialogsData = (state: AppStateType) => {
	return state.messagesPage.dialogsData
}