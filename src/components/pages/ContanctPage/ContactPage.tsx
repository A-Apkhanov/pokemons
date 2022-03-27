import { FC } from 'react';

import { LinkList } from '../../molecules/LinkList';

import classnames from 'classnames';

import { CONTACTS } from '../../../constants/contacts';

import style from './style.module.css';

export const ContactPage: FC = () => {
	return (
		<div className={style.root}>
			<div className={classnames(style.root, style.wrapper)}>
				<div className={classnames(style.desc, style.full)}>
					<h1>Контакты</h1>
					<p>Разработал - Апханов Александр</p>
					<LinkList items={CONTACTS} />
				</div>
			</div>
		</div>
	);
};
