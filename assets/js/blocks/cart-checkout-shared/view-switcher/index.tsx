/**
 * External dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { addFilter, hasFilter } from '@wordpress/hooks';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { CartViewSwitcher } from '../../cart/CartViewSwitcher';

const withViewSwitcher = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => {
		const { clientId } = props;
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
					<CartViewSwitcher clientId={ clientId }></CartViewSwitcher>
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
