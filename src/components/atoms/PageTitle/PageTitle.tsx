import { FC, ReactNode } from 'react';

import '../../../constants/variables.css';
import style from './style.module.css';

type TPageTitle = {
	children: ReactNode;
};

export const PageTitle: FC<TPageTitle> = ({ children }) => {
	return <h1 className={style.title}>{children}</h1>;
};
