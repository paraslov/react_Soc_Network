import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { userLogout } from '../../redux/auth_reducer';
import { AppStateType } from '../../redux/redux_store';
import { getAuthEmail, getAuthLogin, getIsAuth } from '../../redux/selectors/profile_selectors';

type MapStatePropsType = {
    isAuth: boolean
    login: string | null
    email: string | null
}

type MapDispatchPropsType = {
    userLogout: () => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

class HeaderContainer extends React.Component<PropsType> {

    render = () => {
        return <Header {...this.props}/>
        
    }
}

const mapStateToProps = (state: AppStateType) => {
    return ({
        isAuth: getIsAuth(state),
        login: getAuthLogin(state),
        email: getAuthEmail(state),
    })
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {userLogout})(HeaderContainer);