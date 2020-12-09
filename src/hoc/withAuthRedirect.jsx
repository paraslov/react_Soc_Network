import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


	let myStateToPropsRedirect = (state) => {
		return {
			isAuth: state.auth.isAuth,
		}
	}

export const withAuthRedirect = (Component) => {
	class RedirectComponent extends React.Component {
		render () {
			if (!this.props.isAuth)  return <Redirect to='login' /> ;
			debugger
			return <Component {...this.props} />
			
		}
	}

	let ConnectedAuthRedirectComponent = connect(myStateToPropsRedirect)(RedirectComponent);

	return ConnectedAuthRedirectComponent;
} 