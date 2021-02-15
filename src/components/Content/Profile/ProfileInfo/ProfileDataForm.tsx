import classes from './ProfileInfo.module.css';
import styles from '../../../Common/FormsControls/FormsControls.module.css';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { Input, myCreateField, Textarea } from '../../../Common/FormsControls/FormsControls';
import { ProfileType } from '../../../Common/Types/types';

type ProfileDataFormOwnPropsType ={
    profile: ProfileType
}
type ProfileDataFormValuesKeysType = keyof ProfileType

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, ProfileDataFormOwnPropsType>
    & ProfileDataFormOwnPropsType> = 
                        ({handleSubmit, error, profile}) => {
    return <form onSubmit = {handleSubmit}>        
        <div className={classes.jobInfo + ' ' + classes.editMode}>
            <div className={classes.jobInfo__item}>
                <b>Insert full name: </b>  {myCreateField<ProfileDataFormValuesKeysType>
                    ('Full Name', 'fullName', Input, [])}
            </div>
            <div className={classes.jobInfo__item}>
                <b>Looking 4 a job:</b> {myCreateField<ProfileDataFormValuesKeysType>
                    ('', 'lookingForAJob', Input, [], {type: 'checkbox'})}
            </div>
            <div className={classes.jobInfo__item}>
                <b>My professional skills:</b> {myCreateField<ProfileDataFormValuesKeysType>
                    ('My professional skills', 'lookingForAJobDescription', Textarea, [])}
            </div>
            <div className={classes.jobInfo__item}>
                <b>About me:</b> {myCreateField<ProfileDataFormValuesKeysType>
                    ('About me', 'aboutMe', Textarea, [])}
            </div>            
        </div>
        
        <div className={classes.contacts}>
            <div className={classes.contacts__item}><b>Contacts:</b></div>
            {Object.keys(profile.contacts).map(key => {
                return <div key= {key} className = {classes.contacts__item}>
                        {key} : {myCreateField(key, 'contacts.' + key, Input, [])}
                    </div>
            })}
        </div>
        <button>Save changes</button>
            {error && <div className={styles.errorOnSubmit}>
                Error acuired: {error}
            </div>}
</form>
}

const ProfileDataReduxForm = reduxForm<ProfileType, ProfileDataFormOwnPropsType>
                                        ({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataReduxForm;