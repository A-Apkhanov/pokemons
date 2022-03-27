import { FC } from 'react';

import { PageTitle } from '../../atoms/PageTitle';
import { Text } from '../../atoms/Text';

import classnames from 'classnames';

import style from './style.module.css';

export const AboutPage: FC = () => {
	return (
		<div className={style.root}>
			<div className={classnames(style.root, style.wrapper)}>
				<div className={classnames(style.desc, style.full)}>
					<PageTitle>Правила</PageTitle>
					<Text>
						В игре двое игроков противостоят друг другу, один игрок играет за
						"синих", а другой за "красных" на поле 3х3.
					</Text>
					<Text>
						У каждого игрока есть пять карт в руке. Цель игры состоит в том,
						чтобы захватить карты противника, превратив их в красный или синий
						цвет игрока.
					</Text>
					<Text>
						Для победы необходимо к концу игры иметь больше карт цвета игрока
						чем у противника. Для этого игрок должен захватывать карты, помещая
						карты рядом с картами противника, после чего "ранги" сторон где две
						карты соприкасаются будут сравниваться. Если ранг карты игрока выше,
						карта противника будет захвачена и окрашена в цвет игрока. Если ранг
						карты противника выше карты игрока, карты игрока будет захвачена и
						окрашена в цвет противника.
					</Text>
				</div>
			</div>
		</div>
	);
};
