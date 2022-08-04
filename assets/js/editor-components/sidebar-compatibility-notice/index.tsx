/**
 * External dependencies
 */
import { Notice, ExternalLink } from '@wordpress/components';
import { createInterpolateElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import './style.scss';

export const CartCheckoutSidebarCompatibilityNotice = () => {
	const noticeText = createInterpolateElement(
		__(
			'The Cart & Checkout Blocks are a beta feature to optimize for faster checkout. To make sure this feature is right for your store, <a>review the list of compatible extensions</a>.',
			'woo-gutenberg-products-block'
		),
		{
			a: (
				// Suppress the warning as this <a> will be interpolated into the string with content.
				// eslint-disable-next-line jsx-a11y/anchor-has-content
				<ExternalLink href="https://woocommerce.com/document/cart-checkout-blocks-support-status/#section-7" />
			),
		}
	);
	return (
		<Notice className={ 'wc-blocks-sidebar-compatibility-notice' }>
			{ noticeText }
		</Notice>
	);
};

export default CartCheckoutSidebarCompatibilityNotice;
