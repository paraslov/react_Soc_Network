
import FriendItem from './FriendItem/FriendItem';
import classes from './Sidebar.module.css';

const Sidebar = (props) => {
    let FriendList = props.state.dialogsData.slice(0, 3)
    .map( list => <FriendItem avatar={list.avatar} userId={list.userId} name={list.name}/>)

    return (
        <div className={classes.sidebar}>
            <div className={classes.text}>
                Friends
            </div>
            <div className={classes.friend__list}>
                {FriendList}
            </div>
        </div>

    )
}

export default Sidebar;