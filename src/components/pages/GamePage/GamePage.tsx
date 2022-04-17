import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import { StartGamePage } from '../StartGamePage';
import { BoardGamePage } from '../BoardGamePage';

export const GamePage: FC = () => {
	return (
		<Routes>
			<Route path='/' element={<StartGamePage />} />
			<Route path='/board' element={<BoardGamePage />} />
			<Route path='/finish' element={<p>FINISH</p>} />
		</Routes>
	);
};
