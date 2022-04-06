import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUser, delUser } from './userSlice';

import { fire } from '../../services/firebase';

type TAuthData = {
	email: string;
	password: string;
};

export const createUser = createAsyncThunk(
	'user/createUserThunk',
	async ({ email, password }: TAuthData, { getState, dispatch }) => {
		const state = getState();
		const user = await fire
			.createUserWithEmail({ email, password })
			.then((userCredential) => userCredential.user);
		if (user) {
			dispatch(setUser(user.email));
		}
	}
);

export const singUser = createAsyncThunk(
	'user/singUserThunk',
	async ({ email, password }: TAuthData, { getState, dispatch }) => {
		const state = getState();
		const user = await fire
			.singWithEmail({ email, password })
			.then((userCredential) => userCredential.user);
		if (user) {
			dispatch(setUser(user));
		}
	}
);

export const updateUser = createAsyncThunk(
	'user/updateUserThunk',
	(_, { getState, dispatch }) => {
		fire.observerUser((user) => {
			user && dispatch(setUser(user.email));
		});
	}
);

export const deleteUser = createAsyncThunk(
	'user/deleteUserThunk',
	(_, { getState, dispatch }) => {
		fire.singOut();
		dispatch(delUser());
	}
);
