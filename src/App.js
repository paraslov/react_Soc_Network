import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import DialogsContainer from './components/Content/Dialogs/DialogsContainer';
import Music from './components/Content/Music/Music';
import News from './components/Content/News/News';
import ProfileContainer from './components/Content/Profile/ProfileContainer';
import Settings from './components/Content/Settings/Settings';
import Users from './components/Content/Users/Users';
import HeaderContainer from './components/Header/HeaderContainer';
import Navbar from './components/Navbar/Nav';
import LoginPage from './components/Login/Login';
import SidebarConteiner from './components/Sidebar/SidebarConteiner';
import { initializeApp } from './redux/app_reducer';
import { connect, Provider } from 'react-redux';
import Preloader from './components/Common/Preloader/Preloader';
import store from './redux/redux_store';


class App extends React.Component {

    componentDidMount() {
        this.props.initializeApp();
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
                    <Route path='/profile/:userId?' render={() =>
                        <ProfileContainer />} />

                    <Route path='/dialogs' render={() =>
                        <DialogsContainer />} />

                    <Route path='/users' render={() =>
                        <Users />} />

                    <Route path='/login' render={() =>
                        <LoginPage />} />

                    <Route path='/news' render={() => <News />} />
                    <Route path='/music' render={() => <Music />} />
                    <Route path='/settings' render={() => <Settings />} />

                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return ({
        initialized: state.app.initialized,
    })
}

const AppContainer = connect(mapStateToProps, { initializeApp })(App);

const ParaSlovApp = (props) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer />
            </Provider>
        </BrowserRouter>
    )

}

export default ParaSlovApp;
