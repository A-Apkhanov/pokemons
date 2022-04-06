import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { PageTitle } from '../../atoms/PageTitle';
import { Text } from '../../atoms/Text';
import { Button } from '../../molecules/Button';

import classnames from 'classnames';

import { selectUserEmail } from '../../../features/user/selectors';

import style from './style.module.css';
import { deleteUser } from '../../../features/user/thunks';

export const UserPage: FC = () => {
	const dispatch = useDispatch();
	const email = useSelector(selectUserEmail);
	const navigate = useNavigate();

	const handleClickExit = () => {
		dispatch(deleteUser());
		navigate('/');
	};

	return (
		<div className={style.root}>
			<div className={classnames(style.root, style.wrapper)}>
				<div className={classnames(style.desc, style.full)}>
					<PageTitle>Игрок</PageTitle>
					<Text>{email}</Text>
					<Button onClick={handleClickExit}>Выйти</Button>
				</div>
			</div>
		</div>
	);
};
