import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

import { IPokemonFire } from '../types';

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
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

	getNewKey = (url: string) => {
		return this.database.ref().child(url).push().key;
	};
}

export const fire = new Firebase();
