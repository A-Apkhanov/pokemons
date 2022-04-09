import { FC, ReactNode } from 'react';

import '../../../constants/variables.css';
import style from './style.module.css';

type TSectionTitle = {
	children: ReactNode;
};

export const SectionTitle: FC<TSectionTitle> = ({ children }) => {
	return <h3 className={style.title}>{children}</h3>;
};
