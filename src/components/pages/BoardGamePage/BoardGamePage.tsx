import { FC, CSSProperties, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { PlayerBoard } from '../../organisms/PlayerBoard';
import { PokemonCard } from '../../organisms/PokemonCard';

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

import { TStatePlayer, TCard, TBoard } from '../../../types';

import style from './style.module.css';

export const BoardGamePage: FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const playerOneData = useSelector(selectPlayerOneData);
	const playerTwoData = useSelector(selectPlayerTwoData);

	const [board, setBoard] = useState<TBoard>([]);

	const [playerOne, setPlayerOne] = useState<TStatePlayer>(() => {
		return createPlayerCardArr(playerOneData, 'blue');
	});
	const [playerTwo, setPlayerTwo] = useState<TStatePlayer>([]);

	const [choiceCard, setChoiceCard] = useState<TCard | null>(null);
	const [steps, setSteps] = useState(0);

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
		if (steps === 9) {
			const [count1, count2] = counterWin(board, playerOne, playerTwo);

			if (count1 > count2) {
				alert('WIN');
				dispatch(defineWinner('player1'));
			} else if (count1 < count2) {
				alert('LOSE');
				dispatch(defineWinner('player2'));
			} else {
				alert('DRAW');
			}

			dispatch(changeStatusGame(true));

			navigate('/game/finish');
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
