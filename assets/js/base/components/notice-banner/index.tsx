/**
 * External dependencies
 */
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { Icon, close } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import './style.scss';
import { NoticeBannerProps } from './types';
import { getDefaultPoliteness, getStatusIcon } from './utils';
import Button from '../button';
import { useSpokenMessage } from '../../hooks';

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
	summary,
}: NoticeBannerProps ) {
	useSpokenMessage( spokenMessage, politeness );

	const dismiss = ( event: React.SyntheticEvent ) => {
		if ( event && event.preventDefault ) {
			event.preventDefault();
		}
		onRemove();
	};

	return (
		<div
			className={ classnames(
				className,
				'wc-block-components-notice-banner',
				'is-' + status,
				{
					'is-dismissible': isDismissible,
				}
			) }
		>
			<Icon icon={ getStatusIcon( status ) } />
			<div className="wc-block-components-notice-banner__content">
				{ summary && (
					<p className="wc-block-components-notice-banner__summary">
						{ summary }
					</p>
				) }
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
