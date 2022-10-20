// /**
//  * External dependencies
//  */
// import { createHigherOrderComponent } from '@wordpress/compose';
// import {
// 	BlockControls,
// 	store as blockEditorStore,
// } from '@wordpress/block-editor';
// import { addFilter, hasFilter } from '@wordpress/hooks';
// import { filledCart, removeCart } from '@woocommerce/icons';
// import { Icon } from '@wordpress/icons';
// import { __ } from '@wordpress/i18n';
// import { useSelect } from '@wordpress/data';
// import { EditorProvider, useEditorContext } from '@woocommerce/base-context';

// /**
//  * Internal dependencies
//  */
// import { useViewSwitcher } from '../../cart-checkout-shared';
// import { previewCart } from '@woocommerce/resource-previews';

// const cartViews = [
// 	{
// 		view: 'woocommerce/filled-cart-block',
// 		label: __( 'Filled Cart', 'woo-gutenberg-products-block' ),
// 		icon: <Icon icon={ filledCart } />,
// 	},
// 	{
// 		view: 'woocommerce/empty-cart-block',
// 		label: __( 'Empty Cart', 'woo-gutenberg-products-block' ),
// 		icon: <Icon icon={ removeCart } />,
// 	},
// ];
// interface View {
// 	view: string;
// 	label: string;
// 	icon: string | JSX.Element;
// }

// const withViewSwitcher = createHigherOrderComponent(
// 	( BlockEdit ) => ( props ) => {
// 		const { clientId } = props;
// 		const { currentView, setCurrentView } = useEditorContext();
// 		const onViewChange = ( view: View ) => {
// 			console.log( 'it is working' );
// 			setCurrentView( view );
// 		};
// 		const { component: ViewSwitcherComponent } = useViewSwitcher(
// 			clientId,
// 			cartViews,
// 			onViewChange
// 		);
// 		const { isCartBlock } = useSelect( ( select ) => {
// 			const { getBlockName } = select( blockEditorStore );
// 			const currentBlockName = getBlockName( clientId );
// 			return {
// 				isCartBlock: currentBlockName === 'woocommerce/cart',
// 			};
// 		} );
// 		console.log( isCartBlock );
// 		return (
// 			<>
// 				<EditorProvider
// 					currentView={ currentView }
// 					previewData={ { previewCart } }
// 				>
// 					{ ! isCartBlock && (
// 						<BlockControls>{ ViewSwitcherComponent }</BlockControls>
// 					) }
// 					<BlockEdit { ...props } />
// 				</EditorProvider>
// 			</>
// 		);
// 	},
// 	'withViewSwitcher'
// );

// if ( ! hasFilter( 'editor.BlockEdit', 'woocommerce/add/cart-view-switcher' ) ) {
// 	addFilter(
// 		'editor.BlockEdit',
// 		'woocommerce/add/cart-view-switcher',
// 		withViewSwitcher,
// 		11
// 	);
// }
