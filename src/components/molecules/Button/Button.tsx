import { FC, ReactNode } from 'react';

import '../../../constants/variables.css';
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
		<button className={style.button} onClick={handleClickButton}>
			{children}
		</button>
	);
};
