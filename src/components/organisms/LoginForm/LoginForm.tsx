import { FC, useState, useEffect, ChangeEvent, FormEvent } from 'react';

import { Input } from '../../atoms/Input';
import { Button } from '../../molecules/Button';

import '../../../constants/variables.css';
import style from './style.module.css';

type TAuthData = {
	type: 'login' | 'signup';
	email: string;
	password: string;
};

type TLoginForm = {
	isResetField?: boolean;
	onSubmit: ({}: TAuthData) => void;
};

export const LoginForm: FC<TLoginForm> = ({
	onSubmit,
	isResetField = false,
}) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isLogin, setLogin] = useState(true);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onSubmit &&
			onSubmit({ type: isLogin ? 'login' : 'signup', email, password });
		setEmail('');
		setPassword('');
	};

	const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
	};

	const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
	};

	useEffect(() => {
		setEmail('');
		setPassword('');
	}, [isResetField]);

	return (
		<form onSubmit={handleSubmit}>
			<Input
				label='Эл.почта'
				value={email}
				type='email'
				name='email'
				onChange={handleChangeEmail}
			/>
			<Input
				label='Пароль'
				value={password}
				type='password'
				name='password'
				minlength={6}
				onChange={handleChangePassword}
			/>
			<div className={style.wrapper}>
				<Button>{isLogin ? 'Войти' : 'Зарегистрироваться'}</Button>
				<div
					className={style.choice}
					onClick={() => {
						setLogin((prevState) => !prevState);
					}}
				>
					<span>{isLogin ? 'Регистрация' : 'Вход'}</span>
				</div>
			</div>
		</form>
	);
};
