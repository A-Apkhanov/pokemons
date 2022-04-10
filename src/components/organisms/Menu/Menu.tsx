import { FC } from 'react';

import classnames from 'classnames';

import { LinkList } from '../../molecules/LinkList';

import style from './style.module.css';

import { MENU } from '../../../constants/menu';

type TMenu = {
	onClickMenu: () => void;
	isActive: boolean;
};

export const Menu: FC<TMenu> = ({ isActive, onClickMenu }) => {
	const handleCloseMenu = () => {
		onClickMenu && onClickMenu();
	};

	return (
		<div
			className={classnames(style.menuContainer, {
				[style.active]: isActive,
				[style.deactive]: isActive,
			})}
		>
			<div className={style.overlay} />
			<div className={style.menuItems}>
				<LinkList
					items={MENU}
					onClickLink={handleCloseMenu}
					useReactRouterDom
				/>
			</div>
		</div>
	);
};
