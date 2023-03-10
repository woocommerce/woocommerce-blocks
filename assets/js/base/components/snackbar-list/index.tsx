/**
 * External dependencies
 */
import classnames from 'classnames';
import type { NoticeType } from '@woocommerce/types';
import { useReducedMotion } from '@wordpress/compose';
import { useRef } from '@wordpress/element';
import { motion, AnimatePresence } from 'framer-motion/dist/framer-motion';

/**
 * Internal dependencies
 */
import './style.scss';
import Snackbar from './snackbar';
import { SNACKBAR_VARIANTS } from './constants';

export type SnackbarListProps = {
	// Class name to be added to the container.
	className?: string | undefined;
	// List of notices to be rendered.
	notices: Partial< NoticeType >[];
	// Callback to be called when a notice is dismissed.
	onRemove: ( id: string ) => void;
};

/**
 * A temporary informational UI displayed at the bottom left of store pages.
 */
const SnackbarList = ( {
	notices,
	className,
	onRemove = () => void 0,
}: SnackbarListProps ): JSX.Element => {
	const listRef = useRef< HTMLDivElement | null >( null );
	const isReducedMotion = useReducedMotion();

	const removeNotice = ( notice: NoticeType ) => () =>
		onRemove( notice?.id || '' );

	return (
		<div
			className={ classnames(
				className,
				'wc-block-components-notice-snackbar-list'
			) }
			tabIndex={ -1 }
			ref={ listRef }
		>
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
							<Snackbar
								{ ...restNotice }
								onRemove={ removeNotice( notice ) }
								listRef={ listRef }
							>
								{ notice.content }
							</Snackbar>
						</motion.div>
					);
				} ) }
			</AnimatePresence>
		</div>
	);
};

export default SnackbarList;
