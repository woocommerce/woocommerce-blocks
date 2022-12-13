/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Notice, ExternalLink } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { useState, createInterpolateElement } from '@wordpress/element';
import { alert } from '@woocommerce/icons';
import { Icon } from '@wordpress/icons';
/**
 * Internal dependencies
 */
import { STORE_KEY as PAYMENT_STORE_KEY } from '../../data/payment/constants';
import './editor.scss';

export function IncompatibilityPaymentGatewaysNotice() {
	// Everything below works the same for Cart/Checkout
	const { incompatiblePaymentMethods } = useSelect( ( select ) => {
		const { getIncompatiblePaymentMethods } = select( PAYMENT_STORE_KEY );
		return {
			incompatiblePaymentMethods: getIncompatiblePaymentMethods(),
		};
	}, [] );
	const [ settingStatus, setStatus ] = useState( 'pristine' );

	if (
		Object.keys( incompatiblePaymentMethods ).length === 0 ||
		settingStatus === 'dismissed'
	) {
		return null;
	}

	const noticeContent = createInterpolateElement(
		__(
			'The following extensions are incompatible with the block-based checkout. <a>Learn more</a>',
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
			onRemove={ () => setStatus( 'dismissed' ) }
			spokenMessage={ noticeContent }
		>
			<p>{ noticeContent }</p>
			<ul>
				{ Object.entries( incompatiblePaymentMethods ).map(
					( [ id, title ] ) => (
						<li
							key={ id }
							className="wc-blocks-incompatible-extension-element"
						>
							<Icon icon={ alert } />
							<span>{ title }</span>
						</li>
					)
				) }
			</ul>
		</Notice>
	);
}
