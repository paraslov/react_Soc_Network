import profileReducer from './profile_reducer';
import messagesReducer from './messages_reducer';
import usersReducer from './users_reducer';
import authReducer from './auth_reducer';
import thunkMiddleWare from 'redux-thunk';

const { createStore, combineReducers, applyMiddleware } = require("redux");


let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer,
    usersPage: usersReducer,
    auth: authReducer
}) 

let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

export default store;