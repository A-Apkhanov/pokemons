import { createAsyncThunk } from '@reduxjs/toolkit';

import { fire } from '../../services/firebase';

export const getUserPokemons = createAsyncThunk(
	'user/createPokemonsThunk',
	async () => {
		const userUid = localStorage.getItem('userUid');
		if (userUid) {
			return await fire.getDataUser(userUid).then((res) => res.pokemons);
		}
	}
);
