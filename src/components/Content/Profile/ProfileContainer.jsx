import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { setUserTC } from '../../../redux/profile_reducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getUserStatus, updateUserStatus, savePhoto } from './../../../redux/profile_reducer';
import { getIsAuth, getProfile, getProfileStatus, getProfilePhotoUrl } from './../../../redux/selectors/profile_selectors';
import { getAuthorizedUserId } from './../../../redux/selectors/profile_selectors';



class ProfileContainer extends React.Component {

    refreshProfile = () => {
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

    componentDidMount() {
        this.refreshProfile();
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
        
    }

    render = () => {

        return (
            <div>
                <Profile {...this.props} profile = {this.props.profile} 
                isOwner = {!this.props.match.params.userId} savePhoto = {this.props.savePhoto}
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
    getUserStatus, updateUserStatus, savePhoto }),
    withRouter,
    // withAuthRedirect
)(ProfileContainer);