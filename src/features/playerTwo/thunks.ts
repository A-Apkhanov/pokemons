import { createAsyncThunk } from '@reduxjs/toolkit';

import { game } from '../../services/game';

import { TPokemonsAPI } from '../../types';

export const getCardsPlayerTwo = createAsyncThunk<TPokemonsAPI>(
	'playerTwo/createPlayerTwoThunk',
	async () => {
		return await game.getEnemyPackPokemons();
	}
);
