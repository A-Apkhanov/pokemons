import { TBoard } from '../types';

export function counterWin(board: TBoard) {
	let playerOneCount = 0;
	let playerTwoCount = 0;

	board.forEach((item) => {
		if (item.card.possession === 'blue') {
			playerOneCount++;
		}
		if (item.card.possession === 'red') {
			playerTwoCount++;
		}
	});

	return [playerOneCount, playerTwoCount];
}
