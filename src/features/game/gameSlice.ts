import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
	name: 'game',
	initialState: {
		status: false,
		winner: null,
	},
	reducers: {
		changeStatusGame: (state, action) => ({
			...state,
			status: action.payload,
		}),
		defineWinner: (state, action) => ({
			...state,
			winner: action.payload,
		}),
		resetGame: (state) => ({
			...state,
			status: false,
			winner: null,
		}),
	},
});

export const { changeStatusGame, defineWinner, resetGame } = gameSlice.actions;

export const { reducer: gameReducer } = gameSlice;
