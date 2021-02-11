import { AppStateType } from "../redux_store";


export const getAppInitialized = (state: AppStateType) => {
	return state.app.initialized
}