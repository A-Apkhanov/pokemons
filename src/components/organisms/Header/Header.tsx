import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import { Navigation } from '../Navigation';
import { Menu } from '../Menu';
import { Modal } from '../Modal';
import { LoginForm } from '../LoginForm';

import { fire } from '../../../services/firebase';
import { game } from '../../../services/game';

import { createUser, singUser } from '../../../features/user/thunks';

type THeader = {
	bgActive: boolean;
};

type TAuthData = {
	type: 'login' | 'signup';
	email: string;
	password: string;
};

export const Header: FC<THeader> = ({ bgActive }) => {
	const [isActiveMenu, setActiveMenu] = useState(false);
	const [isOpenModal, setOpenModal] = useState(false);
	const dispatch = useDispatch();

	const handleShowMenu = () => {
		setActiveMenu((prevState) => !prevState);
	};

	const handleClickLogin = () => {
		setOpenModal((prevState) => !prevState);
	};

	const handleSubmitLoginForm = async (authData: TAuthData) => {
		try {
			await loginSingUpUser(authData);
			const userUid = localStorage.getItem('userUid');

			if (authData.type === 'signup' && userUid) {
				const startedPackPokemons = await game.getStartedPackPokemons();

				for (const item of startedPackPokemons) {
					const newKey = fire.getNewKey(`${userUid}/pokemons/`);
					newKey && fire.setData(`${userUid}/pokemons/${newKey}`, item);
					console.log('####: item', item);
				}
			}

			setOpenModal((prevState) => !prevState);
		} catch (error) {
			console.log('Wrong!', (error as Error).message);
		}
	};

	const loginSingUpUser = ({ type, email, password }: TAuthData) => {
		switch (type) {
			case 'login':
				return dispatch(singUser({ email, password }));
			case 'signup':
				return dispatch(createUser({ email, password }));
		}
	};

	return (
		<header>
			<Navigation
				onClickMenuIcon={handleShowMenu}
				onClickLogin={handleClickLogin}
				isActive={isActiveMenu}
				bgActive={bgActive}
			/>
			<Menu isActive={isActiveMenu} onClickMenu={handleShowMenu} />
			<Modal isOpen={isOpenModal} title='Вход' onCloseModal={handleClickLogin}>
				<LoginForm
					onSubmit={handleSubmitLoginForm}
					isResetField={isOpenModal}
				/>
			</Modal>
		</header>
	);
};
