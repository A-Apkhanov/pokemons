import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import { MainPage } from './components/pages/MainPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContanctPage';
import { GamePage } from './components/pages/GamePage';
import { Header } from './components/organisms/Header';
import { Footer } from './components/organisms/Footer';

import { FireBaseContext } from './context/firebaseContext';
import { fire } from './services/firebase';

export const App: FC = () => {
	return (
		<FireBaseContext.Provider value={fire}>
			<Header />
			<Routes>
				<Route path='/' element={<MainPage />} />
				<Route path='/home' element={<MainPage />} />
				<Route path='/game' element={<GamePage />} />
				<Route path='/about' element={<AboutPage />} />
				<Route path='/contact' element={<ContactPage />} />
			</Routes>
			<Footer />
		</FireBaseContext.Provider>
	);
};

export default App;
