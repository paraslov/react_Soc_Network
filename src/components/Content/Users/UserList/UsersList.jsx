import classes from './../Users.module.css'

const UsersList = (props) => {
    return (
        props.users.map(u => 
            <div className={classes.userList__item}>
                <div className={classes.fuctional}>
                    <div>
                        <img src="" alt="avatar pic"/>
                    </div>
                    <div>
                        {u.followed ? 
                        <button onClick={() => props.unfollow(u.id)}>Follow</button> : 
                        <button onClick={() => props.follow(u.id)}>Unfollow</button>}
                    </div>
                </div>
                <div className={classes.info}>
                    {u.fullName}
                </div>
            </div>
            
        
    )
    )
}

export default UsersList;