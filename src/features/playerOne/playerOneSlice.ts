import { createSlice } from '@reduxjs/toolkit';

import { IPokemonsPlayerOne } from '../../types';

const initialState: { data: IPokemonsPlayerOne } = {
	data: {},
};

export const playerOneSlice = createSlice({
	name: 'playerOne',
	initialState,
	reducers: {
		addCardPlayerOne: (
			state: { data: IPokemonsPlayerOne },
			action: { payload: IPokemonsPlayerOne }
		) => ({
			...state,
			data: { ...state.data, ...action.payload },
		}),
		delCardPlayerOne: (
			state: { data: IPokemonsPlayerOne },
			action: { payload: string }
		) => {
			const copyState = { ...state.data };
			delete copyState[action.payload];
			return {
				...state,
				data: { ...copyState },
			};
		},
		resetCardsPlayerOne: (state: { data: IPokemonsPlayerOne }) => ({
			...state,
			data: {},
		}),
	},
});

export const { addCardPlayerOne, delCardPlayerOne, resetCardsPlayerOne } =
	playerOneSlice.actions;

export const { reducer: playerOneReducer } = playerOneSlice;
