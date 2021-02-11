import { ThunkAction } from "redux-thunk";
import { userAuthorization } from "./auth_reducer";
import { AppStateType, InferActionsTypes } from "./redux_store";

// ================= Action creator Constants ======================================>
//* In app reducer I have avoid to use constats for action creators type prop.
//* just for example
// const INITIALIZED_SUCCESS = 'para_slov/app_reduser/INITIALIZED_SUCCESS';

//================== Initial State =================================================>

let initialState = {
	initialized: false,
}

type AppInitialStateType = typeof initialState;

//================== Reducers =========================================================>

const appReducer = (state: AppInitialStateType = initialState, action: AppActionsTypes): AppInitialStateType => {
	switch (action.type) {
		case 'para_slov/app_reducer/INITIALIZED_SUCCESS':
			return {
				...state,
				initialized: true
			}

		default: 
			return state;
	}
}

//====== Action Types===================================================================>

type AppActionsTypes = InferActionsTypes<typeof appActions>

//====== Action Creators ===============================================================>

export const appActions = {
	initializedSuccess: () => ({ type: 'para_slov/app_reducer/INITIALIZED_SUCCESS' } as const)
}

//=========== Thunk Creators ============================================================>

type ThunkType = ThunkAction<void, AppStateType, unknown, AppActionsTypes>
// ! initializeApp need type void instead of Promise<void> lf answers...
export const initializeApp = (): ThunkType => (dispatch) => {
	let promise = dispatch(userAuthorization());

	promise.then( () => {
		dispatch(appActions.initializedSuccess());
	})
}


export default appReducer;