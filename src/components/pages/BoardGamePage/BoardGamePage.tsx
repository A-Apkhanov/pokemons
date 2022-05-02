import { FC, CSSProperties, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { PlayerBoard } from '../../organisms/PlayerBoard';
import { PokemonCard } from '../../organisms/PokemonCard';
import { Result } from '../../atoms/Result';
import { ArrowChoice } from '../../atoms/ArrowChoice';

import { selectPlayerOneData } from '../../../features/playerOne/selectors';
import {
	selectPlayerTwoData,
	selectPlayerTwoIsLoading,
} from '../../../features/playerTwo/selectors';
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
	const playerTwoIsLoading = useSelector(selectPlayerTwoIsLoading);

	const [board, setBoard] = useState<TBoard>([]);

	const [playerOne, setPlayerOne] = useState<TPokemonBoardCards>(() => {
		return createPlayerCardArr(playerOneData, 'blue');
	});
	const [playerTwo, setPlayerTwo] = useState<TPokemonBoardCards>([]);

	const [choiceCard, setChoiceCard] = useState<IPokemonBoardCard | null>(null);
	const [steps, setSteps] = useState(0);

	const [side, setSide] = useState<null | 0 | 1 | 2>(null);
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
						prevState.filter((item) => item.id !== choiceCard.id)
					);
				}
				if (choiceCard.player === 2) {
					setPlayerTwo((prevState) =>
						prevState.filter((item) => item.id !== choiceCard.id)
					);
				}

				setDisabled(false);
				setBoard(newBoard);
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
		if (!playerTwoIsLoading && side === null) {
			setSide(0);
		}

		if (!playerTwoIsLoading && side === 0) {
			const random = (Math.floor(Math.random() * 2) + 1) as 1 | 2;

			const timer1 = setTimeout(() => setSide(random), 2000);
			const timer2 = setTimeout(() => setSide(null), 4000);

			return () => {
				clearTimeout(timer1);
				clearTimeout(timer2);
			};
		}
	}, [playerTwoIsLoading]);

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
			{side !== null && <ArrowChoice side={side} />}
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
				<PlayerBoard
					player={2}
					cards={playerTwo}
					onClickCard={(card) => {
						setChoiceCard(card);
						setDisabled(true);
					}}
				/>
			</div>
		</div>
	);
};
