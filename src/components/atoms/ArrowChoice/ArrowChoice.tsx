import { FC } from 'react';

import classnames from 'classnames';

import style from './style.module.css';

type TArrowChoice = {
	side?: 0 | 1 | 2;
};

export const ArrowChoice: FC<TArrowChoice> = ({ side = 0 }) => {
	return (
		<div
			className={classnames(style.arrow, {
				[style.rightSide]: side === 2,
				[style.leftSide]: side === 1,
			})}
		/>
	);
};
