import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Nav';
import Profile from './components/Content/Profile/Profile';
import News from './components/Content/News/News';
import Music from './components/Content/Music/Music';
import Settings from './components/Content/Settings/Settings';
import DialogsContainer from './components/Content/Dialogs/DialogsContainer';
import SidebarConteiner from './components/Sidebar/SidebarConteiner';
import Users from './components/Content/Users/Users';

// changes made in notebook
// changes made on big bada boom computer



const App = () => {
    
    return (
            <div className='app-wrapper'>
                <Header />
                <div className='app-wrapper__sidebar'>
                    <Navbar />                    
                    <SidebarConteiner />
                </div>
                <div className='app-wrapper__content'>
                    <Route path='/profile' render={ () => 
                        <Profile />} />

                    <Route path='/dialogs' render={ () => 
                        <DialogsContainer />} />

                    <Route path='/users' render={ () => 
                        <Users />} />
                    
                    <Route path='/news' render={ () => <News />} />
                    <Route path='/music' render={ () => <Music />} />
                    <Route path='/settings' render={ () => <Settings />} />

                </div>
            </div>       
    );
}

export default App;
