import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { userLogginIn, userLogout } from '../../redux/auth_reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Input } from '../Common/FormsControls/FormsControls';
import { fieldRequired, maxLengthCreator } from '../../utils/validators/validators';
import { Redirect } from 'react-router-dom';
import classes from '../Common/FormsControls/FormsControls.module.css';
import { myCreateField } from '../Common/FormsControls/FormsControls';
import { AppStateType } from '../../redux/redux_store';
import { getIsAuth, getCaptchaURLState } from '../../redux/selectors/profile_selectors';
import { UserLogginInFormDataType } from '../Common/Types/types';

//* LoginForm Component =======================================================================================>

const maxLength35 = maxLengthCreator(35);

type LoginFormOwnPropsType = {
    captchaURL: string | null
}

//* Creating types for LoginForm keys values for function myCreateField

type LoginFormValuesKeysType = keyof UserLogginInFormDataType;

const LoginForm: React.FC<InjectedFormProps<UserLogginInFormDataType, LoginFormOwnPropsType> & LoginFormOwnPropsType> = 
    ({handleSubmit, error, captchaURL}) => {
	return (
		<form onSubmit={handleSubmit}>            
            {myCreateField<LoginFormValuesKeysType>('e-mail', 'email', Input, [fieldRequired, maxLength35] )}
                {/* same as:             */}
                {/* <div>
                    <Field placeholder={'email'} name={'email'} component = {Input}
                    validate={[fieldRequired, maxLength35]}/>
                </div>*/}            
            {myCreateField<LoginFormValuesKeysType>('password', 'password', Input, [fieldRequired, maxLength35], {type: 'password'})}
                {/* <div><Field  placeholder={'password'} name={'password'} component = {Input}
                validate={[fieldRequired, maxLength35]} type='password'/></div> */}
            {myCreateField<LoginFormValuesKeysType>(undefined, 'rememberMe', Input, [], {type: 'checkbox'})}
            {error && <div className={classes.errorOnSubmit}>
                Error acuired: {error}
            </div>}
            {captchaURL && <img src = {captchaURL} alt = 'captcha'/>}
            {captchaURL && myCreateField<LoginFormValuesKeysType>('input symbols from image', 
                'captcha', Input, [fieldRequired])}
            <div>
                <button>Sign in</button>
            </div>
        </form>
	)
}

//* LoginReduxForm hoc =======================================================================================>

const LoginReduxForm = reduxForm<UserLogginInFormDataType, LoginFormOwnPropsType>({form: 'login'})(LoginForm);

//* Login Component ==========================================================================================>

const Login: React.FC<LoginPropsType> = (props) => {

    const onFormSubmit = (formData: UserLogginInFormDataType) => {
        console.log(formData);
        props.userLogginIn(formData);
    }

    if (props.isAuth) {
        return <Redirect to='/profile'/>
    }

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onFormSubmit} captchaURL = {props.captchaURL}/>
        </div>
    
    )
}

//* Login types and props ==========================================================================>

type LoginPropsType = MapStatePropsType & MapDispatchPropsType

type MapStatePropsType = {
    isAuth: boolean
    captchaURL: string | null
}

type MapDispatchPropsType = {
    userLogginIn: (formData: UserLogginInFormDataType)=> void
    userLogout: () => void
}

const mapStateToProps = (state: AppStateType) => {
    return (
        {isAuth: getIsAuth(state),
        captchaURL: getCaptchaURLState(state)}
    )
}

export default compose(
    connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {userLogginIn, userLogout} )
)(Login);