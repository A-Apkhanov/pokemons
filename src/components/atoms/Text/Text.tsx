import { FC, ReactNode } from 'react';

import '../../../constants/variables.css';
import style from './style.module.css';

type TText = {
	children: ReactNode;
};
export const Text: FC<TText> = ({ children }) => {
	return <p className={style.text}>{children}</p>;
};
