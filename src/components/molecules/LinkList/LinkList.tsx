import { FC } from 'react';
import { Link } from 'react-router-dom';

type TLink = {
	title: string;
	to: string;
};
type TLinkList = {
	items: Array<TLink>;
	onClickLink?: () => void;
	useReactRouterDom?: boolean;
};

export const LinkList: FC<TLinkList> = ({
	items,
	onClickLink,
	useReactRouterDom = false,
}) => {
	const handleClickLink = () => {
		onClickLink && onClickLink();
	};
	return (
		<ul>
			{items.map(({ title, to }, index) => (
				<li key={index}>
					{useReactRouterDom ? (
						<Link to={to} onClick={handleClickLink}>
							{title}
						</Link>
					) : (
						<a href={to} onClick={handleClickLink}>
							{title}
						</a>
					)}
				</li>
			))}
		</ul>
	);
};
