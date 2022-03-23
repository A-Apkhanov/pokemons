import { FC } from 'react';

import { Intro } from '../../organisms/Intro';
import { Footer } from '../../organisms/Footer';
import { Header } from '../../organisms/Header';

export const MainPage: FC = () => {
	return (
		<>
			<Header />
			<Intro title='Pokemons' description='Карточная игра' />
			<Footer />
		</>
	);
};
