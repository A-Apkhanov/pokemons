import { FC, useRef, useEffect, ReactNode, MouseEvent } from 'react';

import classnames from 'classnames';

import style from './style.module.css';

type TModal = {
	isOpen: boolean;
	title: string;
	onCloseModal: () => void;
	children: ReactNode;
};

export const Modal: FC<TModal> = ({
	isOpen,
	title,
	onCloseModal,
	children,
}) => {
	const modalEl = useRef<HTMLDivElement>(null);

	const handleCloseModal = () => {
		onCloseModal && onCloseModal();
	};

	const handleClickModal = (event: MouseEvent<HTMLDivElement>) => {
		const target = event.target as HTMLDivElement;
		if (!modalEl.current?.contains(target)) {
			handleCloseModal();
		}
	};

	useEffect(() => {
		(document.querySelector('body') as HTMLBodyElement).style.overflow = isOpen
			? 'hidden'
			: 'visible';
	}, [isOpen]);

	return (
		<div
			className={classnames(style.root, {
				[style.open]: isOpen,
			})}
			onClick={handleClickModal}
		>
			<div ref={modalEl} className={style.modal}>
				<div className={style.head}>
					{title}
					<span className={style.btnClose} onClick={handleCloseModal} />
				</div>
				<div className={style.content}>{children}</div>
			</div>
		</div>
	);
};
