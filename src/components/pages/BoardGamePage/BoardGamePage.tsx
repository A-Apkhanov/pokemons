import { FC, CSSProperties, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { PlayerBoard } from '../../organisms/PlayerBoard';
import { PokemonCard } from '../../organisms/PokemonCard';
import { Result } from '../../atoms/Result';

import { selectPlayerOneData } from '../../../features/playerOne/selectors';
import { selectPlayerTwoData } from '../../../features/playerTwo/selectors';
import { getCardsPlayerTwo } from '../../../features/playerTwo/thunks';
import {
	defineWinner,
	changeStatusGame,
} from '../../../features/game/gameSlice';

import { createPlayerCardArr } from '../../../services/createPlayerCardArr';
import { counterWin } from '../../../services/counterWin';
import { game } from '../../../services/game';

import { TBoard, TPokemonBoardCards, IPokemonBoardCard } from '../../../types';

import style from './style.module.css';

export const BoardGamePage: FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const playerOneData = useSelector(selectPlayerOneData);
	const playerTwoData = useSelector(selectPlayerTwoData);

	const [board, setBoard] = useState<TBoard>([]);

	const [playerOne, setPlayerOne] = useState<TPokemonBoardCards>(() => {
		return createPlayerCardArr(playerOneData, 'blue');
	});
	const [playerTwo, setPlayerTwo] = useState<TPokemonBoardCards>([]);

	const [choiceCard, setChoiceCard] = useState<IPokemonBoardCard | null>(null);
	const [steps, setSteps] = useState(0);

	const [result, setResult] = useState<null | 'win' | 'lose' | 'draw'>(null);

	const [disabled, setDisabled] = useState(true);

	const handleClickBoardPlate = async (position: number) => {
		if (disabled) {
			if (choiceCard) {
				const params = {
					position,
					card: choiceCard,
					board,
				};

				const newBoard = await game.updateBoard(params);

				setBoard(newBoard);

				if (choiceCard.player === 1) {
					setPlayerOne((prevState) =>
						prevState.filter((item) => item.key !== choiceCard.key)
					);
					setSteps((prevStep) => prevStep + 1);
				}

				if (!!newBoard.filter((item) => item.card === null).length) {
					const matrix = [
						[1, 2, 3],
						[4, 5, 6],
						[7, 8, 9],
					];

					const heroPosition = {
						i: Math.floor((position - 1) / 3),
						j: (position - 1) % 3,
					};

					const top = matrix[heroPosition.i - 1]
						? matrix[heroPosition.i - 1][heroPosition.j]
						: null;
					const right = matrix[heroPosition.i][heroPosition.j + 1] || null;
					const bottom = matrix[heroPosition.i + 1]
						? matrix[heroPosition.i + 1][heroPosition.j]
						: null;
					const left = matrix[heroPosition.i][heroPosition.j - 1] || null;

					//возможные позиции куда можно поставить карту противника
					const coordinates = [top, right, left, bottom].filter(
						(item) => item !== null
					) as number[];

					//пустые позиции на поле
					const emptyCells = newBoard.filter((item) => item.card === null);

					//соседние пустые позиции
					const adjacentEmptyCells = emptyCells.filter((item) =>
						coordinates.includes(item.position)
					);

					//позиция куда поставить карту противника
					const enemyCell = adjacentEmptyCells.length
						? adjacentEmptyCells[
								Math.floor(Math.random() * adjacentEmptyCells.length)
						  ]
						: emptyCells[Math.floor(Math.random() * emptyCells.length)];

					//номер позиции куда поставить карту противника
					const enemyPosition = {
						i: Math.floor((enemyCell.position - 1) / 3),
						j: (enemyCell.position - 1) % 3,
					};

					//разница позиций героя и противника
					const defVer = enemyPosition.i - heroPosition.i;
					const defHor = enemyPosition.j - heroPosition.j;

					//набор карт которые противник может положить
					const enemyCards = playerTwo.filter((item) => {
						if (
							defVer === -1 &&
							defHor === 0 &&
							parseInt(`${item.values.bottom}`, 16) >
								parseInt(`${choiceCard.values.top}`, 16)
						)
							return true;

						if (
							defVer === 0 &&
							defHor === 1 &&
							parseInt(`${item.values.left}`, 16) >
								parseInt(`${choiceCard.values.right}`, 16)
						)
							return true;

						if (
							defVer === 1 &&
							defHor === 0 &&
							parseInt(`${item.values.top}`, 16) >
								parseInt(`${choiceCard.values.bottom}`, 16)
						)
							return true;

						if (
							defVer === 0 &&
							defHor === -1 &&
							parseInt(`${item.values.right}`, 16) >
								parseInt(`${choiceCard.values.left}`, 16)
						)
							return true;

						return true;
					});

					//карта которую положит противник
					const enemyCard =
						enemyCards[Math.floor(Math.random() * enemyCards.length)];

					//параметры для запроса обновленного поля
					const params = {
						position: matrix[enemyPosition.i][enemyPosition.j],
						card: { ...enemyCard, player: 2 as 1 | 2 },
						board: newBoard,
					};

					//обновление руки противника после хода
					setPlayerTwo((prevState) =>
						prevState.filter((item) => item.key !== enemyCard.key)
					);

					//обновленное поле после хода противника
					const testBoard = await game.updateBoard(params);

					//обновление поля в состоянии
					setBoard(testBoard);

					//изменение количества шагов
					setSteps((prevStep) => prevStep + 1);
				}

				setDisabled(false);
			}
		}
	};

	useEffect(() => {
		if (Object.keys(playerOneData).length === 0) {
			navigate('/game', { replace: true });
		}
	}, [playerOneData]);

	useEffect(() => {
		dispatch(getCardsPlayerTwo());
	}, []);

	useEffect(() => {
		setPlayerTwo(() => {
			return createPlayerCardArr(playerTwoData, 'red');
		});
	}, [playerTwoData]);

	useEffect(() => {
		if (steps === 9) {
			const [count1, count2] = counterWin(board);
			const timer = setTimeout(() => navigate('/game/finish'), 3000);

			console.log('####: count1, count2', count1, count2);

			if (count1 > count2) {
				dispatch(defineWinner('player1'));
				setResult('win');
			}
			if (count1 < count2) {
				dispatch(defineWinner('player2'));
				setResult('lose');
			}
			if (count1 === count2) {
				setResult('draw');
			}

			dispatch(changeStatusGame(true));

			return () => {
				clearTimeout(timer);
			};
		}
	}, [steps]);

	useEffect(() => {
		const abortController = new AbortController();
		game.getController(abortController);
		game.getBoard().then((data) => setBoard(data));

		return function cleanup() {
			game.controller?.abort();
		};
	}, []);

	return (
		<div className={style.root}>
			{result && <Result type={result} />}
			<div className={style.playerOne}>
				<PlayerBoard
					player={1}
					cards={playerOne}
					onClickCard={(card) => {
						setChoiceCard(card);
						setDisabled(true);
					}}
				/>
			</div>
			<div className={style.board}>
				{board.map((item) => (
					<div
						style={{ disabled: disabled } as CSSProperties}
						key={item.position}
						className={style.boardPlate}
						onClick={() => !item.card && handleClickBoardPlate(item.position)}
					>
						{item.card && (
							<PokemonCard
								name={item.card.name}
								img={item.card.img}
								id={item.card.id}
								type={item.card.type}
								values={item.card.values}
								selected={item.card.selected}
								possession={item.card.possession}
								minimize
								active
							/>
						)}
					</div>
				))}
			</div>
			<div className={style.playerTwo}>
				<PlayerBoard player={2} cards={playerTwo} />
			</div>
		</div>
	);
};
