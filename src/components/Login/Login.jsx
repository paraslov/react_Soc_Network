import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { userLogginIn, userLogout } from './../../redux/auth_reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Input } from '../Common/FormsControls/FormsControls';
import { fieldRequired, maxLengthCreator } from './../../utils/validators/validators';
import { Redirect } from 'react-router-dom';
import classes from '../Common/FormsControls/FormsControls.module.css';
import { myCreateField } from './../Common/FormsControls/FormsControls';

const maxLength35 = maxLengthCreator(35);

const LoginForm = ({handleSubmit, error, captchaURL}) => {
	return (
		<form onSubmit={handleSubmit}>

            {/* example of creating Field with help of FormsControls.js function myCreateFeild */}
            {myCreateField('e-mail', 'email', Input, [fieldRequired, maxLength35] )}
            
            {/* <div>
                <Field placeholder={'email'} name={'email'} component = {Input}
                validate={[fieldRequired, maxLength35]}/>
            </div> (old version)*/}

            <div>
                <Field  placeholder={'password'} name={'password'} component = {Input}
                validate={[fieldRequired, maxLength35]} type='password'/>
            </div>
            <div>
                <Field type={"checkbox"} name={'rememberMe'} component = {Input}/>remember me
            </div>
            {error && <div className={classes.errorOnSubmit}>
                Error acuired: {error}
            </div>}
            {captchaURL && <img src = {captchaURL} alt = 'captcha'/>}
            {captchaURL && myCreateField('input symbols from image', 
                'captcha', Input, [fieldRequired])}
            <div>
                <button>Sign in</button>
            </div>
        </form>
	)
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);



const Login = (props) => {

    const onFormSubmit = (formData) => {
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

const mapStateToProps = (state) => {
    return (
        {isAuth: state.auth.isAuth,
        captchaURL: state.auth.captchaURL}
    )
}

export default compose(
    connect(mapStateToProps, {userLogginIn, userLogout} )
)(Login);