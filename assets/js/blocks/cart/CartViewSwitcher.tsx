/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/icons';
import { filledCart, removeCart } from '@woocommerce/icons';
import { BlockControls } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { useViewSwitcher } from '../cart-checkout-shared/use-view-switcher';

const views = [
	{
		view: 'woocommerce/filled-cart-block',
		label: __( 'Filled Cart', 'woo-gutenberg-products-block' ),
		icon: <Icon icon={ filledCart } />,
	},
	{
		view: 'woocommerce/empty-cart-block',
		label: __( 'Empty Cart', 'woo-gutenberg-products-block' ),
		icon: <Icon icon={ removeCart } />,
	},
];

export const CartViewSwitcher = ( { clientId }: { clientId: string } ) => {
	const { component: ViewSwitcherComponent } = useViewSwitcher(
		clientId,
		views
	);

	return (
		<>
			<BlockControls>{ ViewSwitcherComponent }</BlockControls>
		</>
	);
};
