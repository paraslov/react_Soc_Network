import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { userLogout } from '../../redux/auth_reducer';


class HeaderContainer extends React.Component {

    render = () => {
        return <Header {...this.props}/>
        
    }
}

const mapStateToProps = (state) => {
    return ({
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        email: state.auth.email
    })
}

export default connect(mapStateToProps, {userLogout})(HeaderContainer);