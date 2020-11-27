import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Nav';
import Profile from './components/Content/Profile/Profile';
import News from './components/Content/News/News';
import Music from './components/Content/Music/Music';
import Settings from './components/Content/Settings/Settings';
import Sidebar from './components/Sidebar/Sidebar';
import DialogsContainer from './components/Content/Dialogs/DialogsContainer';

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
                            store = {props.store}/>} />

                    <Route path='/dialogs' render={ () => 
                        <DialogsContainer 
                            store = {props.store}/>} />
                    
                    <Route path='/news' render={ () => <News />} />
                    <Route path='/music' render={ () => <Music />} />
                    <Route path='/settings' render={ () => <Settings />} />

                </div>
            </div>       
    );
}

export default App;
