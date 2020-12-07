import React from 'react';
import * as axios from 'axios';
import Header from './Header';
import { connect } from 'react-redux';
import { setAuthUsersData } from '../../redux/auth_reducer';

class HeaderContainer extends React.Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        }).then
            (response => {
                if (response.data.resultCode === 0) {
                    let {id, email, login} = response.data.data;
                    this.props.setAuthUsersData(id, email, login);
                }
            })
    }

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

export default connect(mapStateToProps, {setAuthUsersData})(HeaderContainer);