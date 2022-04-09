import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

type TPrivateRoute = {
	children: ReactElement;
	redirectTo: string;
};

export const PrivateRoute: FC<TPrivateRoute> = ({ children, redirectTo }) => {
	const isAuth = !!localStorage.getItem('userUid');
	return isAuth ? children : <Navigate to={redirectTo} />;
};
