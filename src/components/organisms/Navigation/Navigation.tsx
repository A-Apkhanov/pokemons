import { FC, useState } from 'react';
import { Link } from 'react-router-dom';

import classnames from 'classnames';

import { ReactComponent as LoginSVG } from '../../assets/login.svg';
import { ReactComponent as UserSVG } from '../../assets/user.svg';

import style from './style.module.css';

type TNavigation = {
	onClickMenuIcon: () => void;
	onClickLogin: () => void;
	isActive: boolean;
	bgActive: boolean;
};

export const Navigation: FC<TNavigation> = ({
	onClickMenuIcon,
	onClickLogin,
	isActive,
	bgActive,
}) => {
	const [activeMenu, isActiveMenu] = useState(true);

	const handleClickMenu = () => {
		onClickMenuIcon && onClickMenuIcon();
		isActiveMenu((prevState) => !prevState);
	};

	return (
		<nav
			className={classnames(style.navbar, {
				[style.bgActive]: activeMenu && bgActive,
			})}
		>
			<div className={style.navWrapper}>
				<p className={style.brand}>LOGO</p>
				<div className={style.loginAndMenu}>
					<div className={style.loginWrap} onClick={onClickLogin}>
						<LoginSVG />
					</div>
					<Link className={style.loginWrap} to='/user'>
						<UserSVG />
					</Link>
					<div
						className={classnames(style.menuButton, {
							[style.active]: isActive,
						})}
						onClick={handleClickMenu}
					>
						<span />
					</div>
				</div>
			</div>
		</nav>
	);
};
