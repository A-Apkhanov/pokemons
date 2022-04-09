import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../features/user/userSlice';
import { pokemonsReducer } from '../features/pokemons/pokemonsSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		pokemons: pokemonsReducer,
	},
	devTools: true,
});
