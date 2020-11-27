import profileReducer from './profile_reducer';
import messagesReducer from './messages_reducer';

const { createStore, combineReducers } = require("redux");


let reducers = combineReducers({
    profilePage: profileReducer,
    messagesPage: messagesReducer
}) 

let store = createStore(reducers);

export default store;