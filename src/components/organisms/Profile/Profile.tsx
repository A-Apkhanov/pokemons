import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../molecules/Button';
import { Avatar } from '../../molecules/Avatar';
import { UserInfo } from '../../molecules/UserInfo';

import { deleteUser } from '../../../features/user/thunks';

import style from './style.module.css';

export const Profile: FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleClickExit = () => {
		dispatch(deleteUser());
		navigate('/');
	};

	return (
		<section>
			<div className={style.profile}>
				<div className={style.columnLeft}>
					<Avatar />
				</div>
				<div className={style.columnRight}>
					<UserInfo />
					<div className={style.buttons}>
						<Button onClick={handleClickExit}>Выйти</Button>
					</div>
				</div>
			</div>
		</section>
	);
};
