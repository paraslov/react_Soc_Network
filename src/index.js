import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import reportWebVitals from './reportWebVitals';
import store from "./components/redux/store";



let renderMyApp = (state) => {
	ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<App
                state={state}
                dispatch = {store.dispatch.bind(store)}
			/>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
	}

renderMyApp(store.getState());

store.subscribe(renderMyApp);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
