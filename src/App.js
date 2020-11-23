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

// changes made in notebook
// changes made on big bada boom computer



const App = (props) => {
    
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header />
                <div className='app-wrapper__sidebar'>
                    <Navbar />
                    <Sidebar state={props.state.messagesPage} />
                </div>
                <div className='app-wrapper__content'>
                    <Route path='/profile' 
                    render={ () => <Profile state={props.state.profilePage} />} />

                    <Route path='/dialogs' render={ () => <Dialogs state={props.state.messagesPage} />} />
                    
                    <Route path='/news' render={ () => <News />} />
                    <Route path='/music' render={ () => <Music />} />
                    <Route path='/settings' render={ () => <Settings />} />

                </div>
                {console.log(props.state.profilePage)}
                
                {console.log(props.state.messagesPage)}
            </div>
        </BrowserRouter>
        
    );
}

export default App;
