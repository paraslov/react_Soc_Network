import classes from './../Dialogs.module.css'
import { NavLink } from 'react-router-dom';


const DialogItem = (props) => {
    return (
        <div className={classes.item}>
            <NavLink to={'/dialogs/' + props.userId} className={classes.link} activeClassName={classes.link__active}>{props.name}</NavLink>
        </div>
    )
}


export default DialogItem;