import { FC, ReactNode } from 'react';

import style from './style.module.css';

type TButtonProps = {
	children: ReactNode;
	onClick: () => void;
};

export const Button: FC<TButtonProps> = ({ children, onClick }) => {
	const handleClickButton = () => {
		onClick && onClick();
	};

	return (
		<button className={style.slidingButton} onClick={handleClickButton}>
			{children}
		</button>
	);
};
