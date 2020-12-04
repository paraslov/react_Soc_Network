import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { setUserProfile } from '../../redux/profile_reducer';
import * as axios from 'axios';
import { withRouter } from 'react-router-dom';



class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = 13089;
        }
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId).then
            (response => {
                this.props.setUserProfile(response.data);
            });
    }

    render = () => {
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

let WithUrlDataComponent = withRouter(ProfileContainer);

export default connect(myStateToProps, {setUserProfile})(WithUrlDataComponent);