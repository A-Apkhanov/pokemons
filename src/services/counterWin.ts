import { TBoard, TStatePlayer } from '../types';

export function counterWin(
	board: TBoard,
	playerOne: TStatePlayer,
	playerTwo: TStatePlayer
) {
	let playerOneCount = playerOne.length;
	let playerTwoCount = playerTwo.length;

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
