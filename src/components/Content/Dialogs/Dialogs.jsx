import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import MessageItem from './MessageItem/MessageItem';


const Dialogs = (props) => {

    let dialogElements = props.dialogsData
    .map( dialog => <DialogItem name={dialog.name} userId={dialog.userId} />)

    let messagesElements = props.messagesData
    .map( message =>  <MessageItem text={message.message} messageId={message.id}  />)

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialog__items}>
                { dialogElements }
            </div>
            <div className={classes.messages}>
                { messagesElements }
            </div>
        </div>
    )
}

export default Dialogs;