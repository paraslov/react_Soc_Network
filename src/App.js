import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Dialogs from './components/Content/Dialogs/Dialogs';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Nav';
import Profile from './components/Content/Profile/Profile';
import News from './components/Content/News/News';
import Music from './components/Content/Music/Music';
import Settings from './components/Content/Settings/Settings';
import Sidebar from './components/Sidebar/Sidebar';
import { postChangeState } from './components/redux/state';

// changes made in notebook
// changes made on big bada boom computer



const App = (props) => {
    
    return (
            <div className='app-wrapper'>
                <Header />
                <div className='app-wrapper__sidebar'>
                    <Navbar />
                    <Sidebar state={props.state.messagesPage} />
                </div>
                <div className='app-wrapper__content'>
                    <Route path='/profile' render={ () => 
                        <Profile 
                            profilePage={props.state.profilePage} 
                            dispatch={props.dispatch} />} />

                    <Route path='/dialogs' render={ () => 
                        <Dialogs 
                            messagesPage={props.state.messagesPage}
                            dispatch={props.dispatch} />} />
                    
                    <Route path='/news' render={ () => <News />} />
                    <Route path='/music' render={ () => <Music />} />
                    <Route path='/settings' render={ () => <Settings />} />

                </div>
            </div>       
    );
}

export default App;
