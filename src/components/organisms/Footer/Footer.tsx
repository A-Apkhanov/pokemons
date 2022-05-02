import { FC } from 'react';
import classnames from 'classnames';

import style from './style.module.css';

type TFooter = {
	hidden?: boolean;
};

export const Footer: FC<TFooter> = ({ hidden = false }) => {
	return (
		<footer
			className={classnames(style.footer, {
				[style.hidden]: hidden,
			})}
		>
			<div className={style.wrapper}>
				<h3>СПАСИБО ЗА ВИЗИТ</h3>
				<p>© Апханов Александр</p>
			</div>
		</footer>
	);
};
