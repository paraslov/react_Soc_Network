import { userAuthorization } from "./auth_reducer";

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

const appReducer = (state: AppInitialStateType = initialState, action: InitializedSuccessActionType): AppInitialStateType => {
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

type InitializedSuccessActionType = {
	type: typeof INITIALIZED_SUCCESS
}

//====== Action Creators ===============================================================>

export const initializedSuccess = (): InitializedSuccessActionType => ({ type: INITIALIZED_SUCCESS })

//=========== Thunk Creators ============================================================>

export const initializeApp = () => (dispatch: any) => {
	let promise = dispatch(userAuthorization());

	promise.then( () => {
		dispatch(initializedSuccess());
	})
}


export default appReducer;