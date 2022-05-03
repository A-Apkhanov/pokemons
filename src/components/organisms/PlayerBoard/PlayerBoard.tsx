import { FC, useState } from 'react';

import { PokemonCard } from '../PokemonCard';

import classnames from 'classnames';

import { TPokemonBoardCards, IPokemonBoardCard } from '../../../types';

import style from './style.module.css';

type TPlayer = 1 | 2;

type TPlayerBoard = {
	player: TPlayer;
	cards: TPokemonBoardCards;
	onClickCard?: (card: IPokemonBoardCard) => void;
};

export const PlayerBoard: FC<TPlayerBoard> = ({
	player,
	cards,
	onClickCard,
}) => {
	const [isSelected, setSelected] = useState<number>();
	return (
		<>
			{cards.map((item) => (
				<div
					className={classnames(style.cardBoard, {
						[style.selected]: isSelected === item.id,
					})}
					onClick={() => {
						setSelected(item.id);
						onClickCard &&
							onClickCard({
								player,
								...item,
							});
					}}
					key={item.key}
				>
					<PokemonCard
						name={item.name}
						img={item.img}
						id={item.id}
						type={item.type}
						values={item.values}
						className={style.card}
						active
						minimize
					/>
				</div>
			))}
		</>
	);
};
