/**
 * External dependencies
 */
import classnames from 'classnames';
import { useReducedMotion } from '@wordpress/compose';
import { useRef } from '@wordpress/element';
import {
	__unstableMotion as motion,
	__unstableAnimatePresence as AnimatePresence,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import './style.scss';
import Snackbar from './snackbar';
import { SNACKBAR_VARIANTS } from './constants';
import type { SnackbarListProps } from './types';

/**
 * Component which renders a list of snackbar notices.
 */
const SnackbarList = ( {
	notices,
	className,
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
