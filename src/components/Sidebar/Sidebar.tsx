import { DialogsDataType } from '../Common/Types/types';
import FriendItem from './FriendItem/FriendItem';
import classes from './Sidebar.module.css';

type PropsType = {
    dialogsData: Array<DialogsDataType>
}

const Sidebar: React.FC<PropsType> = (props) => {
                    let FriendList = props.dialogsData.slice(0, 3)
                        .map(list => <FriendItem key={list.userId} avatar={list.avatar} userId={list.userId} name={list.name} />)

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