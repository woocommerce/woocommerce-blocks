/**
 * External dependencies
 */
import { Notice, ExternalLink } from '@wordpress/components';
import { createInterpolateElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useCompatibilityNotice } from '@woocommerce/editor-components/compatibility-notices/use-compatibility-notice';

/**
 * Internal dependencies
 */
import './editor.scss';

export const CartCheckoutSidebarCompatibilityNotice = ( {
	block,
}: {
	block: 'cart' | 'checkout';
} ) => {
	const [ isVisible, dismissNotice ] = useCompatibilityNotice( block );

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
	return isVisible ? (
		<div className="wc-blocks-sidebar-compatibility-notice">
			<Notice
				onRemove={ dismissNotice }
				className={ 'wc-blocks-sidebar-compatibility-notice__notice' }
			>
				{ noticeText }
			</Notice>
		</div>
	) : null;
};

export const CheckoutSidebarCompatibilityNotice = () => (
	<CartCheckoutSidebarCompatibilityNotice block={ 'checkout' } />
);
export const CartSidebarCompatibilityNotice = () => (
	<CartCheckoutSidebarCompatibilityNotice block={ 'cart' } />
);
