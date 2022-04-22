import { createAsyncThunk } from '@reduxjs/toolkit';

import { fire } from '../../services/firebase';

import { IPokemonsFire } from '../../types';

export const getUserPokemons = createAsyncThunk<IPokemonsFire>(
	'pokemons/createPokemonsThunk',
	async () => {
		const userUid = localStorage.getItem('userUid');
		if (userUid) {
			return await fire.getDataUser(userUid).then((res) => res.pokemons);
		}
	}
);
