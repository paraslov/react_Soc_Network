import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import MessageItem from './MessageItem/MessageItem';
import { Redirect } from 'react-router-dom';


const Dialogs = (props) => {

    let dialogElements = props.messagesPage.dialogsData
    .map( dialog => <DialogItem key={dialog.userId} name={dialog.name} userId={dialog.userId} avatar={dialog.avatar} />)

    let messagesElements = props.messagesPage.messagesData
    .map( message =>  <MessageItem key={message.id} text={message.message} messageId={message.id}  />)



    let onSendMessageButtonClick = () => {
        props.sendMessage();
    }

    let onNewMessageUpdate = (e) => {
        let text = e.target.value;
        props.newMessageUpdate(text);
    }

    if (!props.isAuth) { return <Redirect to='/login'/> }

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
                    <textarea onChange={onNewMessageUpdate} placeholder = "enter your message"
                    cols="50" rows="7" value={props.messagesPage.newMessageText}/>
                </div>
                <div>
                    <button onClick={ onSendMessageButtonClick }>Send message</button>
                </div>              
            </div>
        </div>
    )
}

export default Dialogs;