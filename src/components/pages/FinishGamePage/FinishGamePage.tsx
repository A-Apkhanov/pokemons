import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Layout } from '../../organisms/Layout';
import { PokemonCard } from '../../organisms/PokemonCard';
import { Button } from '../../molecules/Button';

import {
	selectGameStatus,
	selectGameWinner,
} from '../../../features/game/selectors';
import { selectPlayerOneData } from '../../../features/playerOne/selectors';
import { selectPlayerTwoData } from '../../../features/playerTwo/selectors';
import { resetGame } from '../../../features/game/gameSlice';
import { resetCardsPlayerOne } from '../../../features/playerOne/playerOneSlice';

import { fire } from '../../../services/firebase';

import { TCard, TPokemon } from '../../../types';

import style from './style.module.css';

interface INewCard {
	[key: string]: TCard | TPokemon;
}

const writePokemon = async (newCard: INewCard) => {
	const userUid = localStorage.getItem('userUid');
	const newKey = fire.getNewKey(`${userUid}/pokemons/`);
	await fire.setData(
		`${userUid}/pokemons/${newKey}`,
		Object.entries(newCard)[0][1]
	);
};

export const FinishGamePage: FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const gameStatus = useSelector(selectGameStatus);
	const gameWinner = useSelector(selectGameWinner);
	const playerOneData = useSelector(selectPlayerOneData);
	const playerTwoData = useSelector(selectPlayerTwoData);

	const [cardsEnemy, setCardsEnemy] = useState(playerTwoData);
	const [newCard, setNewCard] = useState<INewCard>({});
	const [disabled, setDisabled] = useState(true);

	useEffect(() => {
		!gameStatus && navigate('/game', { replace: true });
	}, []);

	const handleClickCard = (key: string) => {
		setCardsEnemy((prevState) => ({
			...prevState,
			[key]: {
				...prevState[key],
				selected: !prevState[key].selected,
			},
		}));

		setNewCard((prevState) => {
			if (prevState[key]) {
				const copyState = { ...prevState };
				delete copyState[key];
				return copyState;
			}
			return {
				...prevState,
				[key]: cardsEnemy[key],
			};
		});

		setDisabled(() => {
			if (
				newCard &&
				Object.keys(newCard).length === 0 &&
				gameWinner === 'player1'
			) {
				return false;
			} else return gameWinner === 'player1';
		});
	};

	const addNewPokemon = async () => {
		if (gameWinner === 'player1') {
			await writePokemon(newCard);
		}
		dispatch(resetGame());
		dispatch(resetCardsPlayerOne());
		navigate('/game');
	};

	return (
		<Layout id='finish' title='Финиш'>
			<div className={style.grid}>
				{Object.entries(playerOneData).map(
					([key, { name, img, id, type, values }]) => (
						<PokemonCard
							key={key}
							name={name}
							img={img}
							id={id}
							type={type}
							values={values}
							active
							className={style.card}
						/>
					)
				)}
			</div>
			<div className={style.flex}>
				<Button
					disabled={gameWinner !== 'player1' ? false : disabled}
					onClick={addNewPokemon}
				>
					Закончить игру
				</Button>
			</div>
			<div className={style.grid}>
				{Object.entries(cardsEnemy).map(
					([key, { name, img, id, type, values, selected }]) => (
						<PokemonCard
							key={key}
							name={name}
							img={img}
							id={id}
							type={type}
							values={values}
							active
							className={style.card}
							onClickCard={() => {
								if (
									gameWinner === 'player1' &&
									(Object.keys(newCard).length < 1 || selected)
								) {
									handleClickCard(key);
								}
							}}
							selected={selected}
						/>
					)
				)}
			</div>
		</Layout>
	);
};
