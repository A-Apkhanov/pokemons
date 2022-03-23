import { FC } from 'react';

type TLink = {
	title: string;
	to: string;
};
type TLinkList = {
	items: Array<TLink>;
	onClickLink: () => void;
};

export const LinkList: FC<TLinkList> = ({ items, onClickLink }) => {
	return (
		<ul>
			{items.map(({ title, to }, index) => (
				<li key={index}>
					<a href={to} onClick={onClickLink}>
						{title}
					</a>
				</li>
			))}
		</ul>
	);
};
