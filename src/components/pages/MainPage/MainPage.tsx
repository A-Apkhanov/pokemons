import { FC } from 'react';

import { Intro } from '../../organisms/Intro';
import { Footer } from '../../organisms/Footer';

export const MainPage: FC = () => {
	return (
		<>
			<Intro title='Pokemons' description='Карточная игра' />
			<Footer />
		</>
	);
};
