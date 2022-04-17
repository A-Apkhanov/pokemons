import axios from 'axios';

import { TBoard, TCard } from '../types';

type TParams = {
	position: number;
	card: TCard;
	board: TBoard;
};

class Game {
	controller: AbortController | undefined;

	constructor() {}

	getController = (controller: AbortController) => {
		this.controller = controller;
	};

	getStartedPackPokemons = async () => {
		return await axios
			.get('https://reactmarathon-api.herokuapp.com/api/pokemons/starter', {
				signal: this.controller?.signal,
			})
			.then((res) => res.data.data);
	};

	getEnemyPackPokemons = async () => {
		return await axios
			.get('https://reactmarathon-api.netlify.app/api/create-player', {
				signal: this.controller?.signal,
			})
			.then((res) => res.data.data);
	};

	getBoard = async () => {
		return await axios
			.get('https://reactmarathon-api.netlify.app/api/board', {
				signal: this.controller?.signal,
			})
			.then((res) => res.data.data);
	};

	updateBoard = async (params: TParams): Promise<TBoard> => {
		return await axios
			.post(
				'https://reactmarathon-api.netlify.app/api/players-turn',
				JSON.stringify(params),
				{
					headers: { 'Content-Type': 'application/json' },
					signal: this.controller?.signal,
				}
			)
			.then((res) => res.data.data);
	};
}

export const game = new Game();
