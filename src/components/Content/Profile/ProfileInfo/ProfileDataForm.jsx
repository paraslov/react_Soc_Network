import classes from './ProfileInfo.module.css';
import styles from '../../../Common/FormsControls/FormsControls.module.css';
import { reduxForm } from 'redux-form';
import { Input, myCreateField, Textarea } from './../../../Common/FormsControls/FormsControls';


const ProfileDataForm = ({handleSubmit, error, ...props}) => {
    return <form onSubmit = {handleSubmit}>        
        <div className={classes.jobInfo + ' ' + classes.editMode}>
            <div className={classes.jobInfo__item}>
                <b>Insert full name: </b>  {myCreateField('Full Name', 'fullName', Input, [])}
            </div>
            <div className={classes.jobInfo__item}>
                <b>Looking 4 a job:</b> {myCreateField('', 'lookingForAJob', Input, [], {type: 'checkbox'})}
            </div>
            <div className={classes.jobInfo__item}>
                <b>My professional skills:</b> {myCreateField(
                    'My professional skills', 'lookingForAJobDescription', Textarea, [])}
            </div>
            <div className={classes.jobInfo__item}>
                <b>About me:</b> {myCreateField(
                    'About me', 'aboutMe', Textarea, [])}
            </div>            
        </div>
        
        <div className={classes.contacts}>
            <div className={classes.contacts__item}><b>Contacts:</b></div>
            {Object.keys(props.profile.contacts).map(key => {
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

const ProfileDataReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataReduxForm;