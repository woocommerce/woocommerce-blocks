/**
 * External dependencies
 */
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import type { SyntheticEvent } from 'react';
import { Icon, info, close, megaphone } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import './style.scss';
import Button from '../button';
import { getDefaultPoliteness } from './utils';
import useSpokenMessage from './use-spoken-message';
import type { NoticeProps } from './types';

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
}: NoticeProps ) {
	useSpokenMessage( spokenMessage, politeness );

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
			<Icon icon={ status === 'default' ? megaphone : info } />
			<div className="components-notice__content">{ children }</div>
			{ isDismissible && (
				<Button
					className="components-notice__dismiss"
					icon={ close }
					label={ __(
						'Dismiss this notice',
						'woo-gutenberg-products-block'
					) }
					onClick={ ( event: SyntheticEvent ) => {
						event?.preventDefault?.();
						onRemove();
					} }
					showTooltip={ false }
				/>
			) }
		</div>
	);
}

export default NoticeBanner;
