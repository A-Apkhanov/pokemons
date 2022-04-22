import { createSlice } from '@reduxjs/toolkit';
import { getUserPokemons } from './thunks';
import { IPokemonsPlayerOne } from '../../types';

const initialState: {
	data: IPokemonsPlayerOne;
	isLoading: boolean;
	error: null;
} = {
	isLoading: false,
	data: {},
	error: null,
};

export const pokemonsSlice = createSlice({
	name: 'pokemons',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getUserPokemons.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(getUserPokemons.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		});
		builder.addCase(getUserPokemons.rejected, (state) => {
			state.isLoading = false;
		});
	},
});

export const { reducer: pokemonsReducer } = pokemonsSlice;
