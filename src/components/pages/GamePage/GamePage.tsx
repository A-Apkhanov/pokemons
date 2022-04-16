import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import { StartGamePage } from '../StartGamePage';

export const GamePage: FC = () => {
	return (
		<Routes>
			<Route path='/' element={<StartGamePage />} />
			<Route path='/board' element={<p>BOARD</p>} />
			<Route path='/finish' element={<p>FINISH</p>} />
		</Routes>
	);
};
