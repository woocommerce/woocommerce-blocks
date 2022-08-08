/**
 * External dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { addFilter, hasFilter } from '@wordpress/hooks';
import type { StoreDescriptor } from '@wordpress/data';
import { CartCheckoutSidebarCompatibilityNotice } from '@woocommerce/editor-components/sidebar-compatibility-notice';

/**
 * Internal dependencies
 */
import './editor.scss';
import { useIsCartOrCheckoutOrInnerBlock } from '../../../editor-components/utils';
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

const withSidebarCompatibilityNotice = createHigherOrderComponent(
	( BlockEdit ) => ( props ) => {
		const { clientId } = props;
		const { isCart, isCheckout } =
			useIsCartOrCheckoutOrInnerBlock( clientId );
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
	'withSidebarCompatibilityNotice'
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
		withSidebarCompatibilityNotice,
		11
	);
}
