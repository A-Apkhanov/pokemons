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

				if (choiceCard.player === 1) {
					setPlayerOne((prevState) =>
						prevState.filter((item) => item.key !== choiceCard.key)
					);
				}

				{
					const emptyCells = [
						newBoard[position - 4],
						newBoard[position - 2],
						newBoard[position],
						newBoard[position + 2],
					].filter((item) => item && item.card === null);

					const enemyPosition =
						emptyCells[Math.floor(Math.random() * emptyCells.length)].position;

					const enemyCards = playerTwo.filter((item) => {
						switch (enemyPosition - position) {
							case 1:
								return item.values.left > choiceCard.values.right;
							case 3:
								return item.values.bottom > choiceCard.values.top;
							case -1:
								return item.values.right > choiceCard.values.left;
							case -3:
								return item.values.top > choiceCard.values.bottom;
							default:
								alert('Нет таких значений');
						}
					});

					const enemyCard =
						enemyCards[Math.floor(Math.random() * enemyCards.length)];

					const params = {
						position: enemyPosition,
						card: { ...enemyCard, player: 2 as 1 | 2 },
						board: newBoard,
					};

					setPlayerTwo((prevState) =>
						prevState.filter((item) => item.key !== enemyCard.key)
					);

					const testBoard = await game.updateBoard(params);

					setBoard(testBoard);
				}

				setDisabled(false);
				setSteps((prevStep) => prevStep + 1);
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
			const [count1, count2] = counterWin(board, playerOne, playerTwo);
			const timer = setTimeout(() => navigate('/game/finish'), 3000);

			if (count1 > count2) {
				dispatch(defineWinner('player1'));
				setResult('win');
			} else if (count1 < count2) {
				dispatch(defineWinner('player2'));
				setResult('lose');
			} else {
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
