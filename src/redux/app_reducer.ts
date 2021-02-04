import { ThunkAction } from "redux-thunk";
import { userAuthorization } from "./auth_reducer";
import { AppStateType } from "./redux_store";

// ================= Action creator Constants ======================================>
const INITIALIZED_SUCCESS = 'para_slov/app_reduser/INITIALIZED_SUCCESS';

//================== Initial State =================================================>

type AppInitialStateType = {
	initialized: boolean
}

let initialState: AppInitialStateType = {
	initialized: false,
}

//================== Reducers =========================================================>

const appReducer = (state: AppInitialStateType = initialState, action: AppActionsTypes): AppInitialStateType => {
	switch (action.type) {
		case INITIALIZED_SUCCESS:
			return {
				...state,
				initialized: true
			}

		default: 
			return state;
	}
}

//====== Action Types===================================================================>

type AppActionsTypes = InitializedSuccessActionType

type InitializedSuccessActionType = {
	type: typeof INITIALIZED_SUCCESS
}

//====== Action Creators ===============================================================>

export const initializedSuccess = (): InitializedSuccessActionType => ({ type: INITIALIZED_SUCCESS })

//=========== Thunk Creators ============================================================>

type ThunkType = ThunkAction<void, AppStateType, unknown, AppActionsTypes>
// ! initializeApp need type void instead of Promise<void> lf answers...
export const initializeApp = (): ThunkType => (dispatch) => {
	let promise = dispatch(userAuthorization());

	promise.then( () => {
		dispatch(initializedSuccess());
	})
}


export default appReducer;