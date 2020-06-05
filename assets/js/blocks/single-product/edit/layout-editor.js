/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useCallback } from '@wordpress/element';
import { useDispatch } from '@wordpress/data';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import {
	InnerBlockLayoutContextProvider,
	ProductDataContextProvider,
} from '@woocommerce/shared-context';
import { createBlocksFromTemplate } from '@woocommerce/atomic-utils';
import { PanelBody, Button } from '@wordpress/components';
import { Icon, restore } from '@woocommerce/icons';

/**
 * Internal dependencies
 */
import {
	BLOCK_NAME,
	DEFAULT_INNER_BLOCKS,
	ALLOWED_INNER_BLOCKS,
} from '../constants';

/**
 * Component to handle edit mode of the "Single Product Block".
 */
const LayoutEditor = ( { isLoading, product, clientId } ) => {
	const baseClassName = 'wc-block-single-product';
	const { replaceInnerBlocks } = useDispatch( 'core/block-editor' );

	const resetInnerBlocks = useCallback( () => {
		replaceInnerBlocks(
			clientId,
			createBlocksFromTemplate( DEFAULT_INNER_BLOCKS ),
			false
		);
	}, [ clientId, replaceInnerBlocks ] );

	return (
		<InnerBlockLayoutContextProvider
			parentName={ BLOCK_NAME }
			parentClassName={ baseClassName }
			isLoading={ isLoading }
		>
			<ProductDataContextProvider product={ product }>
				<InspectorControls>
					<PanelBody
						title={ __( 'Layout', 'woo-gutenberg-products-block' ) }
						initialOpen={ true }
					>
						<Button
							label={ __(
								'Reset layout to default',
								'woo-gutenberg-products-block'
							) }
							onClick={ resetInnerBlocks }
							isTertiary
							className="wc-block-single-product__reset-layout"
						>
							<Icon srcElement={ restore } />{ ' ' }
							{ __(
								'Reset layout',
								'woo-gutenberg-products-block'
							) }
						</Button>
					</PanelBody>
				</InspectorControls>
				<div className={ baseClassName }>
					<InnerBlocks
						template={ DEFAULT_INNER_BLOCKS }
						allowedBlocks={ ALLOWED_INNER_BLOCKS }
						templateLock={ false }
						renderAppender={ false }
					/>
				</div>
			</ProductDataContextProvider>
		</InnerBlockLayoutContextProvider>
	);
};

export default LayoutEditor;
