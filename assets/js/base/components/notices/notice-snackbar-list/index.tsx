/**
 * External dependencies
 */
import classnames from 'classnames';
import { useReducedMotion } from '@wordpress/compose';
import { useRef } from '@wordpress/element';
import {
	__unstableMotion as motion,
	__unstableAnimatePresence as AnimatePresence,
} from '@wordpress/components'; // This should be replaced by framer-motion if possible to avoid the componets dependency.

/**
 * Internal dependencies
 */
import './style.scss';
import NoticeSnackbar from '../notice-snackbar';
import { SnackbarListProps } from './types';
import { SNACKBAR_VARIANTS } from './constants';

const NoticeSnackbarList = ( {
	notices,
	className,
	children,
	onRemove = () => void 0,
}: SnackbarListProps ): JSX.Element => {
	const listRef = useRef< HTMLDivElement | null >( null );
	const isReducedMotion = useReducedMotion();

	const removeNotice =
		( notice: SnackbarListProps[ 'notices' ][ number ] ) => () =>
			onRemove( notice.id );

	return (
		<div
			className={ classnames(
				className,
				'wc-block-components-notice-snackbar-list'
			) }
			tabIndex={ -1 }
			ref={ listRef }
		>
			{ children }
			<AnimatePresence>
				{ notices.map( ( notice ) => {
					const { content, ...restNotice } = notice;

					return (
						<motion.div
							layout={ ! isReducedMotion }
							initial={ 'init' }
							animate={ 'open' }
							exit={ 'exit' }
							key={ notice.id }
							variants={
								isReducedMotion ? undefined : SNACKBAR_VARIANTS
							}
						>
							<div className="wc-block-components-notice-snackbar-list__notice-container">
								<NoticeSnackbar
									{ ...restNotice }
									onRemove={ removeNotice( notice ) }
									listRef={ listRef }
								>
									{ notice.content }
								</NoticeSnackbar>
							</div>
						</motion.div>
					);
				} ) }
			</AnimatePresence>
		</div>
	);
};

export default NoticeSnackbarList;
