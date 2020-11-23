import { NavLink } from 'react-router-dom';
import classes from './../Sidebar.module.css';

const FriendItem = (props) => {

    return (
                <div className={classes.item}>
                    <img className={classes.avatar} src={props.avatar} alt="friend logo"/>
                    <div className={classes.name}>
                        <NavLink to={'/dialogs/' + props.userId} className={classes.link} activeClassName={classes.link__active}>{props.name}</NavLink>
                    </div>
                </div>
    )
}

export default FriendItem;