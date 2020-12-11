
import classes from './ProfileInfo.module.css';
import avatar from '../../../../assets/images/img.jpeg';
import Preloader from '../../../Common/Preloader/Preloader';
import yesImg from '../../../../assets/images/yes.png';
import noImg from '../../../../assets/images/no.png';
import ProfileStatus from './ProfileStatus';


const ProfileInfo = (props) => {

    if (!props.profile) {
        return <Preloader/>
    }
    return (
        <div className={classes.header}>
            <div className={classes.header__image}></div>
            <div className={classes.info}>
                <div className={classes.fullName}>{props.profile.fullName}</div>
                <div className={classes.info__header}>
                    <div className={classes.info__header__item}><img src={props.profile.photos.small != null ? props.profile.photos.small : avatar } alt="ava"/></div>
                    <div className={classes.info__header__item}>{props.profile.aboutMe}</div>
                    <div className={classes.info__header__item}>
                        <ProfileStatus updateUserStatus = {props.updateUserStatus}
                            status = {props.status}/>
                    </div>
                </div>
                <div className={classes.jobInfo}>
                    <div className={classes.jobInfo__item}>Looking 4 a job: </div>
                    <div className={classes.jobInfo__item}><img src={props.profile.lookingForAJob===true? yesImg: noImg} alt="looking for a job info"/></div>
                    <div className={classes.jobInfo__item}>({props.profile.lookingForAJobDescription})</div>
                </div>
                <div className={classes.contacts}>
                    <div className={classes.contacts__item}>Contacts:</div>
                    <div className={classes.contacts__item}>
                        My vk: {props.profile.contacts.vk}
                    </div>
                    <div className={classes.contacts__item}>
                        My facebook: {props.profile.contacts.facebook}
                    </div>
                    <div className={classes.contacts__item}>
                        My instagram: {props.profile.contacts.instagram}
                    </div>
                </div>
                
            </div>           
        </div >
    )
}

export default ProfileInfo;