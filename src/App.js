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

// changes made in notebook
// changes made on big bada boom computer



const App = (props) => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header />
                <Navbar />
                <div className='app-wrapper__content'>
                    <Route path='/profile' render={ () => <Profile postsData={props.postsData}/>} />
                    <Route path='/dialogs' render={() => <Dialogs dialogsData={props.dialogsData}
                        messagesData={props.messagesData}/>} />
                    <Route path='/news' render={ () => <News />} />
                    <Route path='/music' render={ () => <Music />} />
                    <Route path='/settings' render={ () => <Settings />} />

                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
