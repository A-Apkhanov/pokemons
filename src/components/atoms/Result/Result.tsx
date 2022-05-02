import { FC, useEffect, useState } from 'react';

import YouWin from '../../assets/you-win.png';
import YouLose from '../../assets/you-lose.png';
import Draw from '../../assets/draw.png';

import style from './style.module.css';

type TResult = {
	type: null | 'win' | 'lose' | 'draw';
};

export const Result: FC<TResult> = ({ type }) => {
	const [url, setUrl] = useState<string | undefined>(undefined);

	useEffect(() => {
		switch (type) {
			case 'win':
				setUrl(YouWin);
				break;
			case 'lose':
				setUrl(YouLose);
				break;
			case 'draw':
				setUrl(Draw);
				break;
			default:
				setUrl(YouWin);
		}
	}, [type]);

	return (
		<div className={style.result}>
			<img src={url} alt='result' />
		</div>
	);
};
