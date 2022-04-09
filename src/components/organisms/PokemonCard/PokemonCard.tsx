import { FC, useCallback } from 'react';

import classnames from 'classnames';

import style from './style.module.css';

type TValues = {
	bottom: number;
	left: number;
	right: number;
	top: number;
};

type TPokemonCard = {
	name: string;
	img: string;
	id: number;
	type: string;
	values: TValues;
	active: boolean;
	minimize?: boolean;
	className: string;
	selected?: boolean;
	onClickCard: () => void;
	possession?: string;
};

export const PokemonCard: FC<TPokemonCard> = ({
	name,
	img,
	id,
	type,
	values,
	active,
	minimize,
	className,
	selected,
	onClickCard,
	possession,
}) => {
	const handleClickCard = useCallback(() => {
		onClickCard && onClickCard();
	}, [onClickCard]);

	return (
		<div
			className={classnames(
				className,
				style.pokemonCard,
				{ [style.active]: active },
				{ [style.selected]: selected }
			)}
			onClick={handleClickCard}
		>
			<div className={style.cardFront}>
				<div
					className={classnames(style.wrap, style.front, {
						[style.selected]: selected,
					})}
				>
					<div
						className={classnames(
							style.pokemon,
							style[type],
							possession && style[possession]
						)}
					>
						<div className={style.values}>
							<div className={classnames(style.count, style.top)}>
								{values.top}
							</div>
							<div className={classnames(style.count, style.right)}>
								{values.right}
							</div>
							<div className={classnames(style.count, style.bottom)}>
								{values.bottom}
							</div>
							<div className={classnames(style.count, style.left)}>
								{values.left}
							</div>
						</div>
						<div className={style.imgContainer}>
							<img src={img} alt={name} />
						</div>
						{!minimize && (
							<div className={style.info}>
								<span className={style.number}>#{id}</span>
								<h3 className={style.name}>{name}</h3>
								<small className={style.type}>
									Type: <span>{type}</span>
								</small>
							</div>
						)}
					</div>
				</div>
			</div>

			<div className={style.cardBack}>
				<div className={classnames(style.wrap, style.back)} />
			</div>
		</div>
	);
};
