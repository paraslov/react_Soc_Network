import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import './App.css';
// import DialogsContainer from './components/Content/Dialogs/DialogsContainer';
import Music from './components/Content/Music/Music';
import News from './components/Content/News/News';
// import ProfileContainer from './components/Content/Profile/ProfileContainer';
import Settings from './components/Content/Settings/Settings';
import Users from './components/Content/Users/Users';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Nav';
import LoginPage from './components/Login/Login';
import SidebarConteiner from './components/Sidebar/SidebarConteiner';
import { initializeApp } from './redux/app_reducer';
import { connect, Provider } from 'react-redux';
import Preloader from './components/Common/Preloader/Preloader';
import store, { AppStateType } from './redux/redux_store';
import { withSuspenseComponent } from './hoc/withSuspenseComponent';
import { getAppInitialized } from './redux/selectors/app_selectors';


const DialogsContainer = React.lazy(() => import('./components/Content/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Content/Profile/ProfileContainer'));


class App extends React.Component<AppPropsType> {
    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        console.log('Some error occured')
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }
    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    render = () => {

        if (!this.props.initialized) {
            return <Preloader />
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer />
                <div className='app-wrapper__sidebar'>
                    <Navbar />
                    <SidebarConteiner />
                </div>
                <div className='app-wrapper__content'>
                    <Switch>
                        <Route exact path='/' render={()=> <Redirect to='/profile'/>} />
                        <Route path='/profile/:userId?' render={withSuspenseComponent(ProfileContainer)} />

                        <Route path='/dialogs' render={withSuspenseComponent(DialogsContainer)} />

                        <Route path='/users' render={() =>
                            <Users />} />

                        <Route path='/login' render={() =>
                            <LoginPage />} />

                        <Route path='/news' render={() => <News />} />
                        <Route path='/music' render={() => <Music />} />
                        <Route path='/settings' render={() => <Settings />} />
                        <Route path='*' render={()=> <div>404 NOT FOUND</div>} />
                    </Switch>


                </div>
            </div>
        );
    }

}

const mapStateToProps = (state: AppStateType) => {
    return ({
        initialized: getAppInitialized(state),
    })
}

type MapStatePropsType = {
    initialized: boolean
}
type MapDispatchPropsType = {
    initializeApp: ()=> void
}
type AppPropsType = MapStatePropsType & MapDispatchPropsType

const AppContainer = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>
                            (mapStateToProps, { initializeApp })(App);

const ParaSlovApp: React.FC = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    )

}

export default ParaSlovApp;
