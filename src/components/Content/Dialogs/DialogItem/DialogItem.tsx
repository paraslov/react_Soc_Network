import classes from './../Dialogs.module.css'
import { NavLink } from 'react-router-dom';

type PropsType = {
    avatar: string
    userId: number
    name: string
}

const DialogItem: React.FC<PropsType> = (props) => {
    return (
        <div className={classes.item}>
            <img className={classes.avatar__image} src={props.avatar} alt="user's avatar"/>
            <NavLink to={'/dialogs/' + props.userId} className={classes.link} activeClassName={classes.link__active}>{props.name}</NavLink>
        </div>
    )
}


export default DialogItem;