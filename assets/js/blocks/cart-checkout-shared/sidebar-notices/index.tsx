/**
 * External dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import {
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { addFilter, hasFilter } from '@wordpress/hooks';
import type { StoreDescriptor } from '@wordpress/data';
import { CartCheckoutSidebarCompatibilityNotice } from '@woocommerce/editor-components/sidebar-compatibility-notice';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import './editor.scss';
import { DefaultNotice } from '../default-notice';

declare module '@wordpress/editor' {
	let store: StoreDescriptor;
}

declare module '@wordpress/core-data' {
	let store: StoreDescriptor;
}

declare module '@wordpress/block-editor' {
	let store: StoreDescriptor;
}

const withSidebarNotices = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => {
		const { clientId } = props;
		const { isCart, isCheckout } = useSelect( ( select ) => {
			const { getBlockParentsByBlockName, getBlockName } =
				select( blockEditorStore );
			const parent = getBlockParentsByBlockName( clientId, [
				'woocommerce/cart',
				'woocommerce/checkout',
			] ).map( getBlockName );
			return {
				isCart:
					parent.includes( 'woocommerce/cart' ) ||
					getBlockName( clientId ) === 'woocommerce/cart',
				isCheckout:
					parent.includes( 'woocommerce/checkout' ) ||
					getBlockName( clientId ) === 'woocommerce/checkout',
			};
		} );
		return (
			<>
				{ ( isCart || isCheckout ) && (
					<InspectorControls>
						<CartCheckoutSidebarCompatibilityNotice
							block={ isCheckout ? 'checkout' : 'cart' }
						/>
						<DefaultNotice
							page={ isCheckout ? 'checkout' : 'cart' }
						/>
					</InspectorControls>
				) }

				<BlockEdit { ...props } />
			</>
		);
	},
	'withSidebarNotices'
);

if (
	! hasFilter(
		'editor.BlockEdit',
		'woocommerce/add/sidebar-compatibility-notice'
	)
) {
	addFilter(
		'editor.BlockEdit',
		'woocommerce/add/sidebar-compatibility-notice',
		withSidebarNotices,
		11
	);
}
