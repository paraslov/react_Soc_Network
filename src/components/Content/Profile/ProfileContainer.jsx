import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { setUserTC } from '../../../redux/profile_reducer';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { withAuthRedirect } from '../../../hoc/withAuthRedirect'
import { compose } from 'redux';



class ProfileContainer extends React.Component {

    componentDidMount() {
        this.props.setUserProfile(this.props.match.params.userId)
    }

    render = () => {

        if (!this.props.isAuth) { return <Redirect to='login' /> }

        return (
            <div>
                <Profile {...this.props} profile = {this.props.profile}/>
            </div >
        )
    }

} 


let myStateToProps = (state) => {
    return {
        profile: state.profilePage.profile,
    }
}


export default compose(
    connect(myStateToProps, { setUserProfile: setUserTC }),
    withRouter,
    withAuthRedirect
)(ProfileContainer);