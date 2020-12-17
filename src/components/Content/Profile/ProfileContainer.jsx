import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { setUserTC } from '../../../redux/profile_reducer';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { withAuthRedirect } from '../../../hoc/withAuthRedirect'
import { compose } from 'redux';
import { getUserStatus, updateUserStatus } from './../../../redux/profile_reducer';
import { getIsAuth, getProfile, getProfileStatus } from './../../../redux/selectors/profile_selectors';
import { getAuthorizedUserId } from './../../../redux/selectors/profile_selectors';



class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
		if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push('/login');
            }
		}
        this.props.setUserProfile(userId)
        this.props.getUserStatus(userId)
    }

    render = () => {

        //if (!this.props.isAuth) { return <Redirect to='login' /> }

        return (
            <div>
                <Profile {...this.props} profile = {this.props.profile} 
                status = {this.props.status} updateUserStatus={this.props.updateUserStatus}/>
            </div >
        )
    }

} 


let myStateToProps = (state) => {
    return {
        profile: getProfile(state),
        status: getProfileStatus(state),
        authorizedUserId: getAuthorizedUserId(state),
        isAuth: getIsAuth(state),
    }
}


export default compose(
    connect(myStateToProps, { setUserProfile: setUserTC,
    getUserStatus, updateUserStatus }),
    withRouter,
    // withAuthRedirect
)(ProfileContainer);