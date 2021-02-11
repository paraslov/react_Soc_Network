import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import MessageItem from './MessageItem/MessageItem';
import { Redirect } from 'react-router-dom';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { myCreateField, Textarea } from '../../Common/FormsControls/FormsControls';
import { fieldRequired, maxLengthCreator } from '../../../utils/validators/validators';
import { DialogsIntitialStateType } from '../../../redux/messages_reducer';


const maxLength200 = maxLengthCreator(200);

type DialogsFormPropsType = {
    newMessageText: string
}

type DialogsFormValuesKeysType = keyof DialogsFormPropsType

const DialogsForm: React.FC<InjectedFormProps<DialogsFormPropsType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {myCreateField<DialogsFormValuesKeysType>('enter your message', 'newMessageText', Textarea, [fieldRequired, maxLength200], 
                            {cols: '50', rows: '7'})}
            {/* <div>
                <Field  placeholder="enter your message" validate={[fieldRequired, maxLength50]}
                    cols="50" rows="7"  name='newMessageText' component={Textarea}/>
            </div> */}
            <div>
                <button>Send message</button>
            </div> 
        </form>
    )
}

const DialogsReduxForm = reduxForm<DialogsFormPropsType>({form: 'dialogs'})(DialogsForm);

type DialogsPropsType = {
    messagesPage: DialogsIntitialStateType
    isAuth: boolean

    sendMessage: (text: string) => void
}

const Dialogs: React.FC<DialogsPropsType> = (props) => {

    let dialogElements = props.messagesPage.dialogsData
    .map( dialog => <DialogItem key={dialog.userId} name={dialog.name} userId={dialog.userId} avatar={dialog.avatar} />)

    let messagesElements = props.messagesPage.messagesData
    .map( message =>  <MessageItem key={message.id} text={message.message}/>)

    const onDialogsFormSubmit = (formData: {newMessageText: string}) => {
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