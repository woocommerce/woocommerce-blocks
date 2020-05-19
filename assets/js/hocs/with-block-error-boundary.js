/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent, pure } from '@wordpress/compose';
import BlockErrorBoundary from '@woocommerce/base-components/block-error-boundary';

/**
 * HOC that wraps a block with an error boundary.
 */
const withBlockErrorBoundary = ( {
	header = __( 'Block Error', 'woo-gutenberg-products-block' ),
	text = __(
		'There was an error whilst rendering the block. If this problem continues, try re-creating the block.',
		'woo-gutenberg-products-block'
	),
	showErrorMessage = true,
	errorMessagePrefix = __( 'Error message:', 'woo-gutenberg-products-block' ),
} ) =>
	createHigherOrderComponent(
		( WrappedComponent ) =>
			pure( ( ownProps ) => (
				<BlockErrorBoundary
					header={ header }
					text={ text }
					showErrorMessage={ showErrorMessage }
					errorMessagePrefix={ errorMessagePrefix }
				>
					<WrappedComponent { ...ownProps } />
				</BlockErrorBoundary>
			) ),
		'withBlockErrorBoundary'
	);

export default withBlockErrorBoundary;
