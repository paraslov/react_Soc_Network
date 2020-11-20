import classes from './../Dialogs.module.css'


const MessageItem = (props) => {
    return (
        <div className={classes.messages__item}>
            {props.text}
        </div>
    )
}

export default MessageItem;