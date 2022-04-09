import { FC, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classnames from 'classnames';

import { ReactComponent as LoginSVG } from '../../assets/login.svg';
import { ReactComponent as UserSVG } from '../../assets/user.svg';
import { ReactComponent as LogoSVG } from '../../assets/logo.svg';

import { selectUserAuth } from '../../../features/user/selectors';

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
	const navigate = useNavigate();
	const isAuth = useSelector(selectUserAuth);

	const handleClickMenu = () => {
		onClickMenuIcon && onClickMenuIcon();
		isActiveMenu((prevState) => !prevState);
		navigate('/user');
	};

	return (
		<nav
			className={classnames(style.navbar, {
				[style.bgActive]: activeMenu && bgActive,
			})}
		>
			<div className={style.navWrapper}>
				<div className={style.logoWrap}>
					<LogoSVG />
				</div>
				<div className={style.loginAndMenu}>
					{isAuth ? (
						<Link className={style.loginWrap} to='user'>
							<UserSVG />
						</Link>
					) : (
						<div className={style.loginWrap} onClick={onClickLogin}>
							<LoginSVG />
						</div>
					)}
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
