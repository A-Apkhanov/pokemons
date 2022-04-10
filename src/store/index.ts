import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../features/user/userSlice';
import { pokemonsReducer } from '../features/pokemons/pokemonsSlice';
import { playerOneReducer } from '../features/playerOne/playerOneSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		pokemons: pokemonsReducer,
		playerOne: playerOneReducer,
	},
	devTools: true,
});
