import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { userLogginIn } from './../../redux/auth_reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { Input } from '../Common/FormsControls/FormsControls';
import { fieldRequired, maxLengthCreator } from './../../utils/validators/validators';

const maxLength10 = maxLengthCreator(10);

const LoginForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'email'} name={'email'} component = {Input}
                validate={[fieldRequired, maxLength10]}/>
            </div>
            <div>
                <Field  placeholder={'password'} name={'password'} component = {Input}
                validate={[fieldRequired, maxLength10]}/>
            </div>
            <div>
                <Field type={"checkbox"} name={'rememberMe'} component = {Input}/>remember me
            </div>
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

    return (
        <div>
            <h1>Login</h1>
            <LoginReduxForm onSubmit={onFormSubmit}/>
        </div>
    
    )
}
const myStateToProps = () => {
    return ({})
}
export default compose(
    connect(myStateToProps, {userLogginIn} )
)(Login);