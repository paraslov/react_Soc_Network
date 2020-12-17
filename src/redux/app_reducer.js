import { userAuthorization } from "./auth_reducer";

// ================= Action creator Constants ======================================>
const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

//================== Initial State =================================================>

let initialState = {
	initialized: false,
}

//================== Reducers =========================================================>

const appReducer = (state = initialState, action) => {
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

//====== Action Creators ===============================================================>

export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS })

//=========== Thunk Creators ============================================================>

export const initializeApp = () => (dispatch) => {
	let promise = dispatch(userAuthorization());

	promise.then( () => {
		dispatch(initializedSuccess());
	})
}


export default appReducer;