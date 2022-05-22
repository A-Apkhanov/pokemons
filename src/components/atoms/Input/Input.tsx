import { ChangeEvent, FC } from 'react';

import classnames from 'classnames';

import '../../../constants/variables.css';
import style from './style.module.css';

type TInput = {
	value: string;
	label: string;
	name: string;
	type?: string;
	minlength?: number;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Input: FC<TInput> = ({
	value,
	label,
	type = 'text',
	name,
	minlength = 0,
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
				minLength={minlength}
				required
			/>
			<span className={style.highlight}></span>
			<span className={style.bar}></span>
			<label className={style.label}>{label}</label>
		</div>
	);
};
