import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import MessageItem from './MessageItem/MessageItem';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from './../../Common/FormsControls/FormsControls';
import { fieldRequired, maxLengthCreator } from './../../../utils/validators/validators';


const maxLength50 = maxLengthCreator(50);

const DialogsForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field  placeholder="enter your message" validate={[fieldRequired, maxLength50]}
                    cols="50" rows="7"  name='newMessageText' component={Textarea}/>
            </div>
            <div>
                <button>Send message</button>
            </div> 
        </form>
    )
}

const DialogsReduxForm = reduxForm({form: 'dialogs'})(DialogsForm);


const Dialogs = (props) => {

    let dialogElements = props.messagesPage.dialogsData
    .map( dialog => <DialogItem key={dialog.userId} name={dialog.name} userId={dialog.userId} avatar={dialog.avatar} />)

    let messagesElements = props.messagesPage.messagesData
    .map( message =>  <MessageItem key={message.id} text={message.message} messageId={message.id}  />)

    const onDialogsFormSubmit = (formData) => {
        props.sendMessage(formData.newMessageText);
        formData.newMessageText = '';
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
                <DialogsReduxForm onSubmit={onDialogsFormSubmit}/>
            </div>
        </div>
    )
}

export default Dialogs;