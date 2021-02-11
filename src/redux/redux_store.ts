import profileReducer from './profile_reducer';
import messagesReducer from './messages_reducer';
import usersReducer from './users_reducer';
import authReducer from './auth_reducer';
import thunkMiddleWare, { ThunkAction } from 'redux-thunk';
import {reducer as formReducer} from 'redux-form'
import appReducer from './app_reducer';
import { compose, createStore, combineReducers, applyMiddleware, Action} from 'redux';

let rootReducer = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    usersPage: usersReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
}) 

//* creating state type
type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>

//* creating common thunk typesation type
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

//* creating type to infer types from Actions
// type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never
// export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesTypes<T>>
export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)))

// const store = createStore(reducers, applyMiddleware(thunkMiddleWare));

export default store;