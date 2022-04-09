import { FC, ReactNode } from 'react';

import classnames from 'classnames';

import style from './style.module.css';

type TLayout = {
	id: string;
	title: string;
	urlBg?: string;
	colorBg?: string;
	children: ReactNode;
};

export const Layout: FC<TLayout> = ({
	id,
	title,
	urlBg = 'none',
	colorBg = 'none',
	children,
}) => {
	const styleRoot = {
		backgroundImage: `url(${urlBg})`,
		backgroundColor: colorBg,
	};

	return (
		<section className={style.root} id={id} style={styleRoot}>
			<div className={style.wrapper}>
				<article>
					<div className={style.title}>
						{title && <h3>{title}</h3>}
						<span className={style.separator}></span>
					</div>
					<div className={classnames(style.desc, style.full)}>{children}</div>
				</article>
			</div>
		</section>
	);
};
