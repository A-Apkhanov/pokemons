import { ChangeEvent, FC } from 'react';

import classnames from 'classnames';

import '../../../constants/variables.css';
import style from './style.module.css';

type TInput = {
	value: string;
	label: string;
	name: string;
	type?: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Input: FC<TInput> = ({
	value,
	label,
	type = 'text',
	name,
	onChange,
}) => {
	const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
		onChange && onChange(event);
	};
	return (
		<div className={style.root}>
			<input
				type={type}
				name={name}
				value={value}
				className={classnames(style.input, { [style.valid]: !!value })}
				onChange={handleChangeInput}
				required
			/>
			<span className={style.highlight}></span>
			<span className={style.bar}></span>
			<label className={style.label}>{label}</label>
		</div>
	);
};
