import { FC, useState } from 'react';

import { Navigation } from '../Navigation';
import { Menu } from '../Menu';
import { Modal } from '../Modal';
import { LoginForm } from '../LoginForm';

import { fire } from '../../../services/firebase';

type THeader = {
	bgActive?: boolean;
};

type TAuthData = {
	type: 'login' | 'signup';
	email: string;
	password: string;
};

const loginSingUpUser = async ({ type, email, password }: TAuthData) => {
	switch (type) {
		case 'login':
			return await fire
				.singWithEmail({ email, password })
				.then((userCredential) => userCredential.user);
		case 'signup':
			return await fire
				.createUserWithEmail({ email, password })
				.then((userCredential) => userCredential.user);
	}
};

export const Header: FC<THeader> = ({ bgActive = false }) => {
	const [isActiveMenu, setActiveMenu] = useState(false);
	const [isOpenModal, setOpenModal] = useState(false);

	const handleShowMenu = () => {
		setActiveMenu((prevState) => !prevState);
	};

	const handleClickLogin = () => {
		setOpenModal((prevState) => !prevState);
	};

	const handleSubmitLoginForm = async (authData: TAuthData) => {
		try {
			const user = await loginSingUpUser(authData);

			if (authData.type === 'signup' && user) {
				const pokemonsStart = await fetch(
					'https://reactmarathon-api.herokuapp.com/api/pokemons/starter'
				).then((res) => res.json());

				for (const item of pokemonsStart.data) {
					const newKey = fire.getNewKey(`${user.uid}/pokemons/`);
					await fire.setData(`${user.uid}/pokemons/${newKey}`, item);
				}
			}

			user && localStorage.setItem('userUid', user.uid);
			handleClickLogin();
		} catch (error) {
			console.log('Wrong!', (error as Error).message);
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
