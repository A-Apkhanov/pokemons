import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: 'user',
	initialState: {
		isAuth: false,
		email: '',
		uid: '',
	},
	reducers: {
		setUser: (state, action) => {
			state.isAuth = true;
			state.email = action.payload.email;
			state.uid = action.payload.uid;
		},
		delUser: (state) => {
			state.isAuth = false;
			state.email = '';
			state.uid = '';
		},
	},
});

export const { setUser, delUser } = userSlice.actions;

export const { reducer: userReducer } = userSlice;
