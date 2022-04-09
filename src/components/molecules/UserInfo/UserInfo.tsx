import { FC } from 'react';
import { useSelector } from 'react-redux';

import { Text } from '../../atoms/Text';

import { selectUserEmail } from '../../../features/user/selectors';

import style from './style.module.css';

export const UserInfo: FC = () => {
	const email = useSelector(selectUserEmail);

	return (
		<div className={style.userInfo}>
			<Text>Имя: Эш Кетчум</Text>
			<Text>Эл.почта: {email}</Text>
			<Text>
				Начиная свои путешествия по новым регионам, Вы видите (иногда мельком)
				легендарных и мифических покемонов, которые таким образом как бы
				«приветствуют» Вас на своей территории. Благодаря этому Вы -
				единственный кто знакомы с самым большим количеством легендарных и
				мифических покемонов. Хотя некоторые жители тех регионов, по которым Вы
				путешествуете, за всю свою жизнь так никогда и не видели ни разу ни
				одного легендарного или мифического покемона.
			</Text>
		</div>
	);
};
