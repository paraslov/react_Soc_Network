import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { addPost, postChangeState, messageChangeState } from "./components/redux/state";
import { sendMessage } from "./components/redux/state";


export let renderMyApp = (state) => {
    ReactDOM.render(
        <React.StrictMode>
            <BrowserRouter>
                <App
                    state={state}
                    addPost={addPost}
                    sendMessage={sendMessage}
                    postChangeState={postChangeState}
                    messageChangeState={messageChangeState} />
            </BrowserRouter>
        </React.StrictMode>,
        document.getElementById('root')
    );
}


