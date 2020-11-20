import classes from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem';
import MessageItem from './MessageItem/MessageItem';


const Dialogs = (props) => {

    let dialogsData = [
        { name: 'Ultimezia', userId: '1' },
        { name: 'Estar Ultima', userId: '2' },
        { name: 'Adel de Estar Ultima', userId: '3' },
        { name: 'Alexandra', userId: '4' },
        { name: 'Alexandra II', userId: '5' },
        { name: 'JoyMe', userId: '6' },
    ]

    let messagesData = [
        { message: 'Why so?!', id: '1'},
        { message: 'Is that legal?!', id: '2'},
        { message: 'How are u?!', id: '3'},
        { message: 'Hi!', id: '4'}
    ]

    let dialogElements = dialogsData
    .map( dialog => <DialogItem name={dialog.name} userId={dialog.userId} />)

    let messagesElements = messagesData
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