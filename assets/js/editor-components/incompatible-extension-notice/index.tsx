/**
 * External dependencies
 */
import { _n } from '@wordpress/i18n';
import { Notice, ExternalLink } from '@wordpress/components';
import { createInterpolateElement, useEffect } from '@wordpress/element';
import { Alert } from '@woocommerce/icons';
import { Icon } from '@wordpress/icons';
/**
 * Internal dependencies
 */
import { useCombinedIncompatibilityNotice } from './use-combined-incompatibility-notice';
import './editor.scss';

interface ExtensionNoticeProps {
	toggleDismissedStatus: ( status: boolean ) => void;
	block: 'woocommerce/cart' | 'woocommerce/checkout';
}

export function IncompatibleExtensionsNotice( {
	toggleDismissedStatus,
	block,
}: ExtensionNoticeProps ) {
	const [
		isVisible,
		dismissNotice,
		incompatiblePaymentMethods,
		numberOfIncompatiblePaymentMethods,
	] = useCombinedIncompatibilityNotice( block );

	useEffect( () => {
		toggleDismissedStatus( ! isVisible );
	}, [ isVisible, toggleDismissedStatus ] );

	if ( ! isVisible ) {
		return null;
	}

	const noticeContent = createInterpolateElement(
		_n(
			'The following extension may be incompatible with the block-based checkout. <a>Learn more</a>',
			'The following extensions may be incompatible with the block-based checkout. <a>Learn more</a>',
			numberOfIncompatiblePaymentMethods,
			'woo-gutenberg-products-block'
		),
		{
			a: (
				// Suppress the warning as this <a> will be interpolated into the string with content.
				// eslint-disable-next-line jsx-a11y/anchor-has-content
				<ExternalLink href="https://woocommerce.com/document/cart-checkout-blocks-support-status/" />
			),
		}
	);

	return (
		<Notice
			className="wc-blocks-incompatible-extensions-notice"
			status={ 'warning' }
			onRemove={ dismissNotice }
			spokenMessage={ noticeContent }
		>
			<div className="wc-blocks-incompatible-extensions-notice__content">
				<Icon
					className="wc-blocks-incompatible-extensions-notice__warning-icon"
					icon={ <Alert /> }
				/>
				<div>
					<p>{ noticeContent }</p>
					<ul>
						{ Object.entries( incompatiblePaymentMethods ).map(
							( [ id, title ] ) => (
								<li
									key={ id }
									className="wc-blocks-incompatible-extensions-notice__element"
								>
									{ title }
								</li>
							)
						) }
					</ul>
				</div>
			</div>
		</Notice>
	);
}
