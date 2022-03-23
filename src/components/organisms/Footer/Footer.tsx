import { FC } from 'react';

import style from './style.module.css';

export const Footer: FC = () => {
	return (
		<footer className={style.footer}>
			<div className={style.wrapper}>
				<h3>СПАСИБО ЗА ВИЗИТ</h3>
				<p>© Апханов Александр</p>
			</div>
		</footer>
	);
};
