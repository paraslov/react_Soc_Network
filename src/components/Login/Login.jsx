import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { userLogginIn } from './../../redux/auth_reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

const LoginForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'email'} name={'email'} component = {'input'}/>
            </div>
            <div>
                <Field  placeholder={'password'} name={'password'} component = {'input'}/>
            </div>
            <div>
                <Field type={"checkbox"} name={'rememberMe'} component = {'input'}/>remember me
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