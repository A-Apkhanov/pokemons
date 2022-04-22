import {
	IPokemonsPlayerOne,
	TPokemonsPlayerTwo,
	TPokemonBoardCards,
} from '../types';

export function createPlayerCardArr(
	obj: IPokemonsPlayerOne | TPokemonsPlayerTwo,
	possession: 'blue' | 'red'
): TPokemonBoardCards {
	const copyArr = Object.entries(obj);
	const newArr = [];
	for (let item of copyArr) {
		newArr.push({
			...item[1],
			key: item[0],
			possession: possession,
		});
	}
	return newArr;
}
