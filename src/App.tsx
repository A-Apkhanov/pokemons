import { FC, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { MainPage } from './components/pages/MainPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContanctPage';
import { GamePage } from './components/pages/GamePage';
import { UserPage } from './components/pages/UserPage';
import { Header } from './components/organisms/Header';
import { Footer } from './components/organisms/Footer';
import { PrivateRoute } from './routes/PrivateRoute';

import { updateUser } from './features/user/thunks';

export const App: FC = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(updateUser());
	}, []);

	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<MainPage />} />
				<Route path='/home' element={<MainPage />} />
				<Route path='/about' element={<AboutPage />} />
				<Route path='/contact' element={<ContactPage />} />
				<Route
					path='/game'
					element={
						<PrivateRoute redirectTo='/'>
							<GamePage />
						</PrivateRoute>
					}
				/>
				<Route
					path='/user'
					element={
						<PrivateRoute redirectTo='/'>
							<UserPage />
						</PrivateRoute>
					}
				/>
			</Routes>
			<Footer />
		</>
	);
};

export default App;
