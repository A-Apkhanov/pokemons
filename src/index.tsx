import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './App';

import './index.css';

import { FireBaseContext } from './context/firebaseContext';
import { fire } from './services/firebase';
import { store } from './store';

ReactDOM.render(
	<React.StrictMode>
		<FireBaseContext.Provider value={fire}>
			<Provider store={store}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Provider>
		</FireBaseContext.Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
