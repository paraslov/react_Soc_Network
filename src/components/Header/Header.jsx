import classes from './Header.module.css';

const Header = () => {
    return (
        <header className={classes.header}>
            <img src='https://s1.logaster.com/static/v3/img/products/logo.png' alt='logo'></img>
        </header>
    )
}

export default Header;