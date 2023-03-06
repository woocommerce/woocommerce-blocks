/**
 * External dependencies
 */
import classnames from 'classnames';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import type { SyntheticEvent } from 'react';
import { Icon, close } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import Button from '../../button';
import { getDefaultPoliteness, getStatusIcon } from '../shared/utils';
import { useSpokenMessage } from '../shared/use-spoken-message';
import { NoticeSnackbarProps } from './types';

const NOTICE_TIMEOUT = 10000;

export const NoticeSnackbar = ( {
	className,
	status = 'default',
	children,
	spokenMessage = children,
	onRemove = () => void 0,
	explicitDismiss = false,
	politeness = getDefaultPoliteness( status ),
	listRef,
}: NoticeSnackbarProps ) => {
	useSpokenMessage( spokenMessage, politeness );

	const dismiss = ( event: SyntheticEvent ) => {
		if ( event && event.preventDefault ) {
			event.preventDefault();
		}

		// Prevent focus loss by moving it to the list element.
		if ( listRef && listRef.current ) {
			listRef.current.focus();
		}

		onRemove();
	};

	// Only set up the timeout dismiss if we're not explicitly dismissing.
	useEffect( () => {
		const timeoutHandle = setTimeout( () => {
			if ( ! explicitDismiss ) {
				onRemove();
			}
		}, NOTICE_TIMEOUT );

		return () => clearTimeout( timeoutHandle );
	}, [ onRemove, explicitDismiss ] );

	const classes = classnames(
		className,
		'wc-block-components-notice-snackbar',
		'is-' + status
	);

	return (
		<div className={ classes }>
			<Icon icon={ getStatusIcon( status ) } />
			<div className="wc-block-components-notice-snackbar__content">
				{ children }
			</div>
			<Button
				className="wc-block-components-notice-snackbar__dismiss"
				icon={ close }
				tabIndex={ 0 }
				label={ __(
					'Dismiss this notice',
					'woo-gutenberg-products-block'
				) }
				onClick={ dismiss }
				onKeyPress={ dismiss }
				showTooltip={ false }
			/>
		</div>
	);
};

export default NoticeSnackbar;
