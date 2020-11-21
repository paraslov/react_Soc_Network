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

<<<<<<< HEAD
// changes made in notebook
=======
// changes made on big bada boom computer
>>>>>>> ef21444341aa5469c58f7ef5ee65e3aa749bf321

const App = () => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header />
                <Navbar />
                <div className='app-wrapper__content'>
                    <Route path='/profile' component={Profile} />
                    <Route path='/dialogs' component={Dialogs} />
                    <Route path='/news' component={News} />
                    <Route path='/music' component={Music} />
                    <Route path='/settings' component={Settings} />

                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
