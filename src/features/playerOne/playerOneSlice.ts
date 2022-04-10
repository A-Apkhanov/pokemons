import { createSlice } from '@reduxjs/toolkit';

import { IPokemons } from '../../types';

export const playerOneSlice = createSlice({
	name: 'playerOne',
	initialState: {
		data: {},
	},
	reducers: {
		addCardPlayerOne: (
			state: { data: IPokemons },
			action: { payload: IPokemons }
		) => ({
			...state,
			data: { ...state.data, ...action.payload },
		}),
		delCardPlayerOne: (
			state: { data: IPokemons },
			action: { payload: string }
		) => {
			const copyState = { ...state.data };
			delete copyState[action.payload];
			return {
				...state,
				data: { ...copyState },
			};
		},
		resetCardsPlayerOne: (state: { data: IPokemons }) => ({
			...state,
			data: {},
		}),
	},
});

export const { addCardPlayerOne, delCardPlayerOne, resetCardsPlayerOne } =
	playerOneSlice.actions;

export const { reducer: playerOneReducer } = playerOneSlice;
