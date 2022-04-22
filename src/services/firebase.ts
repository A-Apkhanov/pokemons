import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

import { IPokemonFire } from '../types';

const firebaseConfig = {
	apiKey: 'AIzaSyALXHi-phGT0K1v57LW510rZn6uxa_EZZo',
	authDomain: 'pokemons-18ee2.firebaseapp.com',
	databaseURL:
		'https://pokemons-18ee2-default-rtdb.europe-west1.firebasedatabase.app',
	projectId: 'pokemons-18ee2',
	storageBucket: 'pokemons-18ee2.appspot.com',
	messagingSenderId: '570258594109',
	appId: '1:570258594109:web:6846de5118981d1a2b4d54',
};

firebase.initializeApp(firebaseConfig);

type TUser = {
	email: string;
	password: string;
};

export class Firebase {
	readonly database;
	readonly auth;

	constructor() {
		this.database = firebase.database();
		this.auth = firebase.auth();
		this.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
	}

	createUserWithEmail = ({ email, password }: TUser) =>
		this.auth.createUserWithEmailAndPassword(email, password);

	singWithEmail = ({ email, password }: TUser) =>
		this.auth.signInWithEmailAndPassword(email, password);

	singOut = () => this.auth.signOut();

	observerUser = (
		cb: firebase.Observer<any, Error> | ((a: firebase.User | null) => any)
	) => this.auth.onAuthStateChanged(cb);

	setData = (url: string, data: IPokemonFire) => {
		this.database.ref(url).set(data);
	};

	getDataUser = async (userUID: string) => {
		return await this.database
			.ref('/' + userUID)
			.once('value')
			.then((snapshot) => snapshot.val());
	};

	getNewKey = async (url: string): Promise<string | null> => {
		return await this.database.ref().child(url).push().key;
	};
}

export const fire = new Firebase();
