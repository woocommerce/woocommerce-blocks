/**
 * External dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import {
	BlockControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { addFilter, hasFilter } from '@wordpress/hooks';
import { filledCart, removeCart } from '@woocommerce/icons';
import { Icon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { useViewSwitcher } from '../../cart-checkout-shared';

const cartViews = [
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

const withViewSwitcher = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => {
		const { clientId } = props;

		const { component: ViewSwitcherComponent } = useViewSwitcher(
			clientId,
			cartViews
		);
		const { isCartBlock } = useSelect( ( select ) => {
			const { getBlockName } = select( blockEditorStore );
			const currentBlockName = getBlockName( clientId );
			return {
				isCartBlock: currentBlockName === 'woocommerce/cart',
			};
		} );

		return (
			<>
				{ ! isCartBlock && (
					<BlockControls>{ ViewSwitcherComponent }</BlockControls>
				) }
				<BlockEdit { ...props } />
			</>
		);
	},
	'withViewSwitcher'
);

if ( ! hasFilter( 'editor.BlockEdit', 'woocommerce/add/cart-view-switcher' ) ) {
	addFilter(
		'editor.BlockEdit',
		'woocommerce/add/cart-view-switcher',
		withViewSwitcher,
		11
	);
}
