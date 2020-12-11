import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { setUserTC } from '../../../redux/profile_reducer';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { withAuthRedirect } from '../../../hoc/withAuthRedirect'
import { compose } from 'redux';
import { getUserStatus, updateUserStatus } from './../../../redux/profile_reducer';



class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
		if (!userId) {
			userId = 13100;
		}
        this.props.setUserProfile(userId)
        this.props.getUserStatus(userId)
    }

    render = () => {

        // if (!this.props.isAuth) { return <Redirect to='login' /> }

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
        profile: state.profilePage.profile,
        status: state.profilePage.status,
    }
}


export default compose(
    connect(myStateToProps, { setUserProfile: setUserTC,
    getUserStatus, updateUserStatus }),
    withRouter,
    // withAuthRedirect
)(ProfileContainer);