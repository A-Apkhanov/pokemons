import { FC, useState } from 'react';

import { Navigation } from '../Navigation';
import { Menu } from '../Menu';

type THeader = {
	bgActive?: boolean;
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

	return (
		<header>
			<Navigation
				onClickMenuIcon={handleShowMenu}
				onClickLogin={handleClickLogin}
				isActive={isActiveMenu}
				bgActive={bgActive}
			/>
			<Menu isActive={isActiveMenu} onClickMenu={handleShowMenu} />
		</header>
	);
};
