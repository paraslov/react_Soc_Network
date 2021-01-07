import classes from './ProfileInfo.module.css';
import avatar from '../../../../assets/images/img.jpeg';
import Preloader from '../../../Common/Preloader/Preloader';
import yesImg from '../../../../assets/images/yes.png';
import noImg from '../../../../assets/images/no.png';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import { useState } from 'react';
import ProfileDataForm from './ProfileDataForm';


const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false);

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }

    const goToEditMode = () => {
        setEditMode(true);
    }

    const onSubmit = (formData) => {
        props.saveProfile(formData).then(()=>{
            setEditMode(false);
        })
        // if (props.profileChange === 'success') {
        //     setEditMode(false);
        // } else if (props.profileChange === 'error') {
        //     setEditMode(true);
        // } else {
        //     alert('something going very wrong...')
        // }
    }


    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div className={classes.header}>
            <div className={classes.header__image}></div>
            <div className={classes.info}>
                <div className={classes.editZone} >
                    <div className={classes.fullName}>
                        {props.profile.fullName}
                    </div>

                    <div className={classes.info__header__item}>
                        <ProfileStatusWithHooks updateUserStatus={props.updateUserStatus}
                            status={props.status} />
                    </div>

                    <div>
                        {props.isOwner && <div>
                            <label className={classes.lable} for='b2'>
                                Edit Profile Info
                                <button id='b2' style={{ display: 'none' }} onClick={goToEditMode} />
                            </label>
                        </div>}
                    </div>
                </div>

                <div className={classes.info__header}>
                    <div className={classes.info__header__item}><img src={props.profile.photos.small || avatar} alt="ava" /></div>
                    <div className={classes.info__header__item}>{props.profile.aboutMe}</div>
                </div>
                <div>
                    {props.isOwner && <div>
                        <label className={classes.lable} for='b1'>
                            Change avatar
                                <input id='b1' style={{ width: 0 }} type='file' onChange={onMainPhotoSelected} />
                        </label>
                    </div>}
                </div>

                {editMode ? <ProfileDataForm onSubmit={onSubmit}
                    profile={props.profile} initialValues={props.profile} /> :
                    <ProfileData profile={props.profile} />}


            </div>
        </div >
    )
}

const ProfileData = (props) => {
    return <div>
        <div className={classes.jobInfo}>
            <div className={classes.jobInfo__item}><b>Looking 4 a job:</b> </div>
            <div className={classes.jobInfo__item}><img src={props.profile.lookingForAJob === true ? yesImg : noImg} alt="looking for a job info" /></div>
            {props.profile.lookingForAJob && <div className={classes.jobInfo__item}>({props.profile.lookingForAJobDescription})</div>}
        </div>
        <div className={classes.contacts}>
            <div className={classes.contacts__item}><b>Contacts:</b></div>
            {Object.keys(props.profile.contacts).map(key => {
                return <Contacts contactTitle={key} contactValue={props.profile.contacts[key]} />
            })}
        </div>
    </div>
}

export const Contacts = ({ contactTitle, contactValue }) => {
    if (contactValue != null) {
        return <div className={classes.contacts__item}>{contactTitle}: <a
        href={contactValue} rel='noreferrer' target='_blank'>{contactValue}</a></div>
    } else {
        return <div className={classes.contacts__item_null}>{contactTitle}: none</div>
    }
    }
    

export default ProfileInfo;