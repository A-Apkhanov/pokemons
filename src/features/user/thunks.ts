import { createAsyncThunk } from '@reduxjs/toolkit';
import { setUser, delUser } from './userSlice';

import { fire } from '../../services/firebase';

type TAuthData = {
	email: string;
	password: string;
};

export const createUser = createAsyncThunk(
	'user/createUserThunk',
	async ({ email, password }: TAuthData, { dispatch }) => {
		const user = await fire
			.createUserWithEmail({ email, password })
			.then((userCredential) => userCredential.user);
		if (user) {
			dispatch(setUser({ email: user.email, uid: user.uid }));
			localStorage.setItem('userUid', user.uid);
		}
	}
);

export const singUser = createAsyncThunk(
	'user/singUserThunk',
	async ({ email, password }: TAuthData, { dispatch }) => {
		const user = await fire
			.singWithEmail({ email, password })
			.then((userCredential) => userCredential.user);
		if (user) {
			dispatch(setUser({ email: user.email, uid: user.uid }));
			localStorage.setItem('userUid', user.uid);
		}
	}
);

export const updateUser = createAsyncThunk(
	'user/updateUserThunk',
	(_, { dispatch }) => {
		fire.observerUser((user) => {
			user && dispatch(setUser(user.email));
			if (user && user.hasOwnProperty('uid')) {
				localStorage.setItem('userUid', user.uid);
			} else {
				localStorage.removeItem('userUid');
			}
		});
	}
);

export const deleteUser = createAsyncThunk(
	'user/deleteUserThunk',
	(_, { dispatch }) => {
		fire.singOut();
		dispatch(delUser());
		localStorage.removeItem('userUid');
	}
);
