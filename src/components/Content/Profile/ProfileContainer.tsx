import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { getUserStatus, updateUserStatus, savePhoto, saveProfile, getUserProfile } from '../../../redux/profile_reducer';
import { getIsAuth, getProfile, getProfileStatus } from '../../../redux/selectors/profile_selectors';
import { getAuthorizedUserId } from '../../../redux/selectors/profile_selectors';
import { ProfileType } from '../../Common/Types/types';
import { AppStateType } from '../../../redux/redux_store';

type MapStatePropsType = {
    profile: ProfileType | null
    status: string
    authorizedUserId: number | null
    isAuth: boolean
}

type MapDispatchPropsType = {
    getUserProfile: (userId: number | null)=> void
    getUserStatus: (userId: number | null) => void
    updateUserStatus: () => void
    savePhoto: () => void
    saveProfile: () => void
}

type PropsType = MapDispatchPropsType & MapStatePropsType

type PathParamsType = {
    userId: string
}

class ProfileContainer extends React.Component<PropsType & RouteComponentProps<PathParamsType>> {

    refreshProfile = () => {
        let userId: number | null = +this.props.match.params.userId;
		if (!userId) {
            userId = this.props.authorizedUserId;
            if (!userId) {
                this.props.history.push('/login');
            }
		}
        this.props.getUserProfile(userId)
        this.props.getUserStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile();
    }
    componentDidUpdate(prevProps: PropsType & RouteComponentProps<PathParamsType>) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
        
    }

    render = () => {

        return (
            <div>
                <Profile {...this.props} profile = {this.props.profile} 
                saveProfile = {this.props.saveProfile}
                isOwner = {!this.props.match.params.userId} savePhoto = {this.props.savePhoto}
                status = {this.props.status} updateUserStatus={this.props.updateUserStatus}/>
            </div >
        )
    }

} 


let mapStateToProps = (state: AppStateType) => {
    return {
        profile: getProfile(state),
        status: getProfileStatus(state),
        authorizedUserId: getAuthorizedUserId(state),
        isAuth: getIsAuth(state),
    }
}


export default compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>
    //@ts-ignore
    (mapStateToProps, { getUserProfile,
    getUserStatus, updateUserStatus, savePhoto, saveProfile }),
    withRouter,
    // withAuthRedirect
)(ProfileContainer);