import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getIsAuth } from '../redux/selectors/profile_selectors'
import { AppStateType } from '../redux/redux_store'


	let myStateToPropsRedirect = (state: AppStateType) => {
		return {
			isAuth: getIsAuth(state),
		}
	}

	type MapStatePropsType = {
		isAuth: boolean
	}

export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
	const RedirectComponent: React.FC<MapStatePropsType> = (props) => {
			let {isAuth, ...restProps} = props
			if (!isAuth)  return <Redirect to='login' />
			return <WrappedComponent {...restProps as WCP} />
	}

	let ConnectedAuthRedirectComponent = connect<MapStatePropsType, {}, WCP, AppStateType>
													(myStateToPropsRedirect)(RedirectComponent);

	return ConnectedAuthRedirectComponent
} 