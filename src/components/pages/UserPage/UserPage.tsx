import { FC } from 'react';

import { Profile } from '../../organisms/Profile';
import { PageTitle } from '../../atoms/PageTitle';
import { SectionTitle } from '../../atoms/SectionTitle';

import classnames from 'classnames';

import style from './style.module.css';

export const UserPage: FC = () => {
	return (
		<main className={style.root}>
			<div className={classnames(style.root, style.wrapper)}>
				<div className={classnames(style.desc, style.full)}>
					<PageTitle>Ваш профиль</PageTitle>
					<Profile />
					<section>
						<SectionTitle>Ваши карты</SectionTitle>
					</section>
				</div>
			</div>
		</main>
	);
};
