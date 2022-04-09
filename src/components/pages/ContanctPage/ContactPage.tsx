import { FC } from 'react';

import { LinkList } from '../../molecules/LinkList';
import { PageTitle } from '../../atoms/PageTitle';
import { Text } from '../../atoms/Text';

import classnames from 'classnames';

import { CONTACTS } from '../../../constants/contacts';

import '../../../constants/variables.css';
import style from './style.module.css';

export const ContactPage: FC = () => {
	return (
		<main className={style.root}>
			<div className={classnames(style.root, style.wrapper)}>
				<div className={classnames(style.desc, style.full)}>
					<PageTitle>Контакты</PageTitle>
					<Text>Разработал: Апханов Александр</Text>
					<div className={style.contactsList}>
						<LinkList items={CONTACTS} />
					</div>
				</div>
			</div>
		</main>
	);
};
