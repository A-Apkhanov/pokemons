import axios from 'axios';

class Game {
	constructor() {}

	getStartedPackPokemons = async () => {
		return await axios
			.get('https://reactmarathon-api.herokuapp.com/api/pokemons/starter')
			.then((res) => res.data.data);
	};
}

export const game = new Game();