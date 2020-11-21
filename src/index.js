import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let postsData = [
    { message: 'Hi, wasup broh?', likeCounter: '13', id: '1' },
    { message: "It's my first post, lol", likeCounter: '27', id: '2' },
    { message: "Ulty approved it, maan", likeCounter: '41', id: '3' },
    { message: "Props was succesfully integrated!", likeCounter: '99', id: '4' }
]

let dialogsData = [
    { name: 'Ultimezia', userId: '1' },
    { name: 'Estar Ultima', userId: '2' },
    { name: 'Adel de Estar Ultima', userId: '3' },
    { name: 'Alexandra', userId: '4' },
    { name: 'Alexandra II', userId: '5' },
    { name: 'JoyMe', userId: '6' },
]

let messagesData = [
    { message: 'Why so?!', id: '1' },
    { message: 'Is that legal?!', id: '2' },
    { message: 'How are u?!', id: '3' },
    { message: 'Hi, buddy!', id: '4' }
]

ReactDOM.render(
    <React.StrictMode>
        <App 
        postsData={postsData}
        dialogsData={dialogsData}
        messagesData={messagesData}
        />
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
