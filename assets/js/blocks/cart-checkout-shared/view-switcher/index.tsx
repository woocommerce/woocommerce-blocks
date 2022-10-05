/**
 * External dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { BlockControls } from '@wordpress/block-editor';
import { previewCart } from '@woocommerce/resource-previews';
import { EditorProvider } from '@woocommerce/base-context';
import { addFilter, hasFilter } from '@wordpress/hooks';
import { filledCart, removeCart } from '@woocommerce/icons';
import { Icon } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

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

		const { currentView, component: ViewSwitcherComponent } =
			useViewSwitcher( clientId, cartViews );

		return (
			<>
				<EditorProvider
					currentView={ currentView }
					previewData={ { previewCart } }
				>
					<BlockControls>{ ViewSwitcherComponent }</BlockControls>
					<BlockEdit { ...props } />
				</EditorProvider>
			</>
		);
	},
	'withViewSwitcher'
);

if ( ! hasFilter( 'editor.BlockEdit', 'woocommerce/add/view-switcher' ) ) {
	addFilter(
		'editor.BlockEdit',
		'woocommerce/add/view-switcher',
		withViewSwitcher,
		11
	);
}
