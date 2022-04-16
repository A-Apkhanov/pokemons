import { createAsyncThunk } from '@reduxjs/toolkit';

import { game } from '../../services/game';

export const getCardsPlayerTwo = createAsyncThunk(
	'playerTwo/createPlayerTwoThunk',
	async () => {
		return await game.getEnemyPackPokemons();
	}
);
