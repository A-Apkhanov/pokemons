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

export interface IPokemons {
	[key: string]: TPokemon;
}
