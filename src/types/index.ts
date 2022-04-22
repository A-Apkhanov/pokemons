export type TPokemon = {
	abilities: Array<string>;
	attacks: [number, Array<number>];
	base_experience: number;
	height: number;
	id: number;
	img: string;
	name: string;
	stats: {
		attack: number;
		defense: number;
		hp: number;
		'special-attack': number;
		'special-defense': number;
		speed: number;
	};
	type: string;
	values: {
		bottom: number;
		left: number;
		right: number;
		top: number;
	};
	weight: number;
	selected?: boolean;
};

export type TCard = TPokemon & {
	possession: string;
	key: string;
	player?: 1 | 2;
};

export type TBoard = { position: number; card: TCard }[];

export type TStatePlayer = TCard[];

///

//то что хранится в API
export interface IPokemonAPI {
	abilities: string[];
	attacks: [number, number[]];
	base_experience: number;
	height: number;
	id: number;
	img: string;
	name: string;
	stats: {
		attack: number;
		defense: number;
		hp: number;
		'special-attack': number;
		'special-defense': number;
		speed: number;
	};
	type: string;
	values: {
		bottom: number;
		left: number;
		right: number;
		top: number;
	};
	weight: number;
}
//то что получаем от API
export type TPokemonsAPI = IPokemonAPI[];

//то что хранится в Firebase
export interface IPokemonFire extends IPokemonAPI {}
export interface IPokemonsFire {
	[key: string]: IPokemonFire;
}

//то что хранится в Store Player One
export interface IPokemonPlayerOne extends IPokemonAPI {}
export interface IPokemonsPlayerOne {
	[key: string]: IPokemonPlayerOne;
}

//то что хранится в Store Player Two
export interface IPokemonPlayerTwo extends IPokemonAPI {}
export type TPokemonsPlayerTwo = IPokemonPlayerTwo[];

//то что получает компонент PokemonCard
interface IPokemonCard {}

//то что хранится в State StartGamePage
export interface IPokemonWithSelected extends IPokemonAPI {
	selected?: boolean;
}
export interface IPokemonsGamePack {
	[key: string]: IPokemonWithSelected;
}

//то что хранится в State BoardGamePage
export interface IPokemonBoardCard extends IPokemonAPI {
	possession: 'blue' | 'red';
	key: string;
	player?: 1 | 2;
}
export type TPokemonBoardCards = IPokemonBoardCard[];

//то что хранится в State FinishGamePage
export type TPokemonsEnemyPack = IPokemonWithSelected[];
