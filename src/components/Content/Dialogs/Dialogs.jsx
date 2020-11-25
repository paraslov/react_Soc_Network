import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import MessageItem from './MessageItem/MessageItem';


const Dialogs = (props) => {

    let dialogElements = props.messagesPage.dialogsData
    .map( dialog => <DialogItem name={dialog.name} userId={dialog.userId} avatar={dialog.avatar} />)

    let messagesElements = props.messagesPage.messagesData
    .map( message =>  <MessageItem text={message.message} messageId={message.id}  />)

    let messageText = React.createRef();

    let newMessage = () => {
        props.dispatch( {type: 'SEND-MESSAGE'} );
    }

    let messageUpdate = () => {
        let text = messageText.current.value;
        props.dispatch( {type: 'UPDATE-MESSAGE-TEXT', newText: text});
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
                    <textarea ref={messageText} onChange={messageUpdate} cols="50" rows="7" value={props.messagesPage.newMessageText}/>
                </div>
                <div>
                    <button onClick={ newMessage }>Send message</button>
                </div>              
            </div>
        </div>
    )
}

export default Dialogs;