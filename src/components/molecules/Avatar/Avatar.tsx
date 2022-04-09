import { FC } from 'react';

import Image from '../../assets/avatar.png';

import style from './style.module.css';

export const Avatar: FC = () => {
	return <img src={Image} alt='Эш Кетчум' className={style.avatar} />;
};
