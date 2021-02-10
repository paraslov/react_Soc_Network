import classes from './MessageItem.module.css'

type PropsType = {
    text: string
}

const MessageItem: React.FC<PropsType> = (props) => {
    return (
        <div className={classes.user__message}>
            <div className={classes.circle}></div>
            <div className={classes.messages__item}>
                {props.text}
            </div>
        </div>

    )
}

export default MessageItem;