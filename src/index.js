import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { addPost, postChangeState, messageChangeState, subscriber } from "./components/redux/state";
import { sendMessage } from "./components/redux/state";

import reportWebVitals from './reportWebVitals';
import store from "./components/redux/state";



let renderMyApp = () => {
	ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<App
				state={store.getState()}
				addPost={store.addPost}
				sendMessage={store.sendMessage}
				postChangeState={store.postChangeState}
				messageChangeState={store.messageChangeState} />
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
	}

renderMyApp();

store.subscribe(renderMyApp);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
