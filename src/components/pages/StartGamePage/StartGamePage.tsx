import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { Layout } from '../../organisms/Layout';
import { PokemonCard } from '../../organisms/PokemonCard';
import { Loader } from '../../molecules/Loader';
import { Button } from '../../molecules/Button';

import { getUserPokemons } from '../../../features/pokemons/thunks';
import {
	selectPokemonsData,
	selectPokemonsIsLoading,
} from '../../../features/pokemons/selectors';
import {
	addCardPlayerOne,
	delCardPlayerOne,
} from '../../../features/playerOne/playerOneSlice';
import { selectPlayerOneData } from '../../../features/playerOne/selectors';

import { IPokemonsGamePack } from '../../../types';

import style from './style.module.css';

export const StartGamePage: FC = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [pokemonsState, setPokemonsState] = useState<IPokemonsGamePack>({});
	const isLoading = useSelector(selectPokemonsIsLoading);
	const pokemons = useSelector(selectPokemonsData);
	const playerCards = useSelector(selectPlayerOneData);

	const handleStartGame = () => {
		navigate('/game/board');
	};

	const handleClickCard = (key: string) => {
		const pokemon = { ...pokemonsState[key] };

		if (pokemon.selected) {
			dispatch(delCardPlayerOne(key));
		} else {
			dispatch(addCardPlayerOne({ [key]: pokemons[key] }));
		}

		setPokemonsState((prevState) => ({
			...prevState,
			[key]: {
				...prevState[key],
				selected: !prevState[key].selected,
			},
		}));
	};

	useEffect(() => {
		setPokemonsState(pokemons);
	}, [pokemons]);

	useEffect(() => {
		dispatch(getUserPokemons());
	}, []);

	return (
		<Layout id='game' title='Игра'>
			{isLoading && (
				<div className={style.flex}>
					<Loader />
				</div>
			)}
			{isLoading || (
				<>
					<div className={style.flex}>
						<Button
							onClick={handleStartGame}
							disabled={Object.keys(playerCards).length < 5}
						>
							СТАРТ
						</Button>
					</div>
					<div className={style.grid}>
						{Object.entries(pokemonsState).map(
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
                    if (Object.keys(playerCards).length < 5 || !!selected) {
                      handleClickCard(key)
                    }
                  }}
									selected={selected}
								/>
							)
						)}
					</div>
				</>
			)}
		</Layout>
	);
};
