import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		isAuth: false,
		email: '',
	},
	reducers: {
		setUser: (state, action) => {
			state.isAuth = true;
			state.email = action.payload;
		},
		delUser: (state) => {
			state.isAuth = false;
			state.email = '';
		},
	},
});

export const { setUser, delUser } = userSlice.actions;

export const { reducer: userReducer } = userSlice;
