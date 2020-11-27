import React from 'react';
import { sendMessageActionCreator, updateMessageTextActionCreator } from '../../redux/messages_reducer';
import Dialogs from './Dialogs';


const DialogsContainer = (props) => {

    let state = props.store.getState();

    let onSendMessage = () => {
        props.store.dispatch( sendMessageActionCreator() );
    }

    let onNewMessageUpdate = (text) => {
        props.store.dispatch( updateMessageTextActionCreator(text));
    }

    return (
        <Dialogs 
            messagesPage = {state.messagesPage}
            sendMessage = {onSendMessage}
            newMessageUpdate = {onNewMessageUpdate}/>
    )
}

export default DialogsContainer;