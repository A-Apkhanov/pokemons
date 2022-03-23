import { FC } from 'react';

import { Button } from '../../molecules/Button';

import style from './style.module.css';

type TIntroProps = {
	title: string;
	description: string;
};

export const Intro: FC<TIntroProps> = ({ title, description }) => {
	const handleClickButton = () => {
		console.log('####: Hello');
	};
	return (
		<main className={style.root}>
			<div className={style.forest} />
			<div className={style.silhouette} />
			<div className={style.moon} />
			<div className={style.container}>
				{title && <h1>{title}</h1>}
				{description && <p>{description}</p>}
				<Button onClick={handleClickButton}>Новая игра</Button>
			</div>
		</main>
	);
};
