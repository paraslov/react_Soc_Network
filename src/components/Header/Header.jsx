import { NavLink } from 'react-router-dom';
import classes from './Header.module.css';

const Header = (props) => {

    return (
        <header className={classes.header}>
            <img src='https://s1.logaster.com/static/v3/img/products/logo.png' alt='logo'></img>

            <div className={classes.loginBlock}>
                <div className={classes.loginBlock__item}>
                    {!props.isAuth ? <NavLink to='/login'>login</NavLink> : props.login}
                </div>
                <div className={classes.loginBlock__item}>
                    {props.isAuth ? props.email : ''}
                </div>
                <div className={classes.loginBlock__item}>
                    {props.isAuth ? <button onClick={props.userLogout}
                        className={classes.btn}>LogOut</button> : ''}
                </div>
                

                
            </div>
        </header>
    )
}

export default Header;