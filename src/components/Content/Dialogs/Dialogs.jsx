import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import MessageItem from './MessageItem/MessageItem';
import { sendMessageActionCreator, updateMessageTextActionCreator } from '../../redux/messages_reducer';


const Dialogs = (props) => {

    let dialogElements = props.messagesPage.dialogsData
    .map( dialog => <DialogItem name={dialog.name} userId={dialog.userId} avatar={dialog.avatar} />)

    let messagesElements = props.messagesPage.messagesData
    .map( message =>  <MessageItem text={message.message} messageId={message.id}  />)



    let onSendMessageClick = () => {
        props.dispatch( sendMessageActionCreator() );
    }

    let onNewMessageChange = (e) => {
        let text = e.target.value;
        props.dispatch( updateMessageTextActionCreator(text));
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialog__items}>
                { dialogElements }
            </div>
            <div className={classes.messages}>
                { messagesElements }
            </div>
            <div className={classes.send__message}>
                <div>
                    <textarea onChange={onNewMessageChange} placeholder = "enter your message"
                    cols="50" rows="7" value={props.messagesPage.newMessageText}/>
                </div>
                <div>
                    <button onClick={ onSendMessageClick }>Send message</button>
                </div>              
            </div>
        </div>
    )
}

export default Dialogs;