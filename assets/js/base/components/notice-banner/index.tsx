/**
 * External dependencies
 */
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { speak } from '@wordpress/a11y';
import { useRef, useEffect, renderToString } from '@wordpress/element';
import { Icon, close } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import './style.scss';
import { getDefaultPoliteness, getStatusIcon } from './utils';
import Button from '../button';
import { useSpokenMessage } from '../../hooks';

export interface NoticeBannerProps {
	// The displayed message of a notice. Also used as the spoken message for assistive technology, unless `spokenMessage` is provided as an alternative message.
	children: React.ReactNode;
	// Additional class name to give to the notice.
	className?: string | undefined;
	// Determines whether the notice can be dismissed by the user.
	isDismissible?: boolean | undefined;
	// Function called when dismissing the notice.
	onRemove?: ( () => void ) | undefined;
	// Determines the level of politeness for the notice for assistive technology.
	politeness?: 'polite' | 'assertive' | undefined;
	// Optionally provided to change the spoken message for assistive technology.
	spokenMessage?: string | React.ReactNode | undefined;
	// Status determines the color of the notice and the icon.
	status: 'success' | 'error' | 'info' | 'warning' | 'default';
	// Optional summary text shown above notice content, used when several notices are listed together.
	summary?: string | undefined;
	// If this notice should be specifically highlighted to the shopper, if true then the window will scroll to this notice.
	isHighlighted?: boolean | undefined;
}

/**
 * NoticeBanner: An informational UI displayed near the top of the store pages.
 *
 * Notices are informational UI displayed near the top of store pages. WooCommerce blocks, themes, and plugins all use
 * notices to indicate the result of an action, or to draw the user’s attention to necessary information.
 */
const NoticeBanner = ( {
	className,
	status = 'default',
	children,
	spokenMessage = children,
	onRemove = () => void 0,
	isDismissible = true,
	politeness = getDefaultPoliteness( status ),
	summary,
	isHighlighted = false,
}: NoticeBannerProps ) => {
	useSpokenMessage( spokenMessage, politeness );
	const noticeRef = useRef< HTMLDivElement >( null );

	useEffect( () => {
		if ( ! noticeRef?.current || ! isHighlighted ) {
			return;
		}
		// Speak message when the notice is highlighted.
		const messageToSpeak =
			typeof spokenMessage === 'string'
				? spokenMessage
				: renderToString( spokenMessage );
		speak( messageToSpeak, politeness );
		noticeRef.current.scrollIntoView( { behavior: 'smooth' } );
		noticeRef.current.focus();
	}, [ isHighlighted, politeness, spokenMessage ] );

	const dismiss = ( event: React.SyntheticEvent ) => {
		if (
			typeof event?.preventDefault === 'function' &&
			event.preventDefault
		) {
			event.preventDefault();
		}
		onRemove();
	};

	return (
		<div
			ref={ noticeRef }
			className={ classnames(
				className,
				'wc-block-components-notice-banner',
				'is-' + status,
				{
					'is-dismissible': isDismissible,
				}
			) }
			tabIndex={ isHighlighted ? 0 : -1 }
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
			{ !! isDismissible && (
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
};

export default NoticeBanner;
