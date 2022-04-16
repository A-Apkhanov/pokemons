import { createSlice } from '@reduxjs/toolkit';
import { getCardsPlayerTwo } from './thunks';

export const playerTwoSlice = createSlice({
	name: 'playerTwo',
	initialState: {
		isLoading: false,
		data: {},
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getCardsPlayerTwo.pending, (state) => {
			state.isLoading = true;
			state.error = null;
		});
		builder.addCase(getCardsPlayerTwo.fulfilled, (state, action) => {
			state.isLoading = false;
			state.data = action.payload;
		});
		builder.addCase(getCardsPlayerTwo.rejected, (state) => {
			state.isLoading = false;
		});
	},
});

export const { reducer: playerTwoReducer } = playerTwoSlice;
