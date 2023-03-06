/**
 * External dependencies
 */
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import type { SyntheticEvent } from 'react';
import { Icon, close } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import './style.scss';
import Button from '../../button';
import { getDefaultPoliteness, getStatusIcon } from '../shared/utils';
import { useSpokenMessage } from '../shared/use-spoken-message';
import { NoticeBannerProps } from './types';

/**
 * Notice Banner
 *
 * An informational UI displayed near the top of the store pages.
 */
function NoticeBanner( {
	className,
	status = 'default',
	children,
	spokenMessage = children,
	onRemove = () => void 0,
	isDismissible = true,
	politeness = getDefaultPoliteness( status ),
}: NoticeBannerProps ) {
	useSpokenMessage( spokenMessage, politeness );

	const dismiss = ( event: SyntheticEvent ) => {
		if ( event && event.preventDefault ) {
			event.preventDefault();
		}
		onRemove();
	};

	const classes = classnames(
		className,
		'wc-block-components-notice-banner',
		'is-' + status,
		{
			'is-dismissible': isDismissible,
		}
	);

	return (
		<div className={ classes }>
			<Icon icon={ getStatusIcon( status ) } />
			<div className="wc-block-components-notice-banner__content">
				{ children }
			</div>
			{ isDismissible && (
				<Button
					className="wc-block-components-notice-banner__dismiss"
					icon={ close }
					label={ __(
						'Dismiss this notice',
						'woo-gutenberg-products-block'
					) }
					onClick={ dismiss }
					showTooltip={ false }
				/>
			) }
		</div>
	);
}

export default NoticeBanner;
