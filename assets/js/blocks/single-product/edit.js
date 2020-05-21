/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';
import { Placeholder, Button } from '@wordpress/components';
import { withProduct } from '@woocommerce/block-hocs';
import { InnerBlocks } from '@wordpress/block-editor';
import { getAllowedInnerBlocks } from '@woocommerce/atomic-utils';
import {
	InnerBlockConfigurationProvider,
	ProductDataContextProvider,
} from '@woocommerce/shared-context';
import { useSyncedLayoutConfig } from '@woocommerce/base-hooks';
import BlockErrorBoundary from '@woocommerce/base-components/block-error-boundary';

/**
 * Internal dependencies
 */
import './editor.scss';
import {
	BLOCK_TITLE,
	BLOCK_ICON,
	BLOCK_DESCRIPTION,
	DEFAULT_PRODUCT_LAYOUT,
	BLOCK_NAME,
} from './constants';
import {
	ApiError,
	SharedProductControl,
	EditorBlockControls,
	LayoutInspectorControls,
} from './edit/index.js';

/**
 * Component to handle inner blocks.
 */
const LayoutEditor = ( { product } ) => {
	return (
		<InnerBlockConfigurationProvider
			parentName={ BLOCK_NAME }
			layoutStyleClassPrefix="wc-block-single-product"
		>
			<ProductDataContextProvider product={ product }>
				<InnerBlocks
					template={ DEFAULT_PRODUCT_LAYOUT }
					templateLock={ false }
					allowedBlocks={ [
						'core/columns',
						'core/column',
						...getAllowedInnerBlocks( BLOCK_NAME ),
					] }
					renderAppender={ false }
				/>
			</ProductDataContextProvider>
		</InnerBlockConfigurationProvider>
	);
};

/**
 * Component to handle edit mode of the "Single Product Block".
 */
const Editor = ( {
	className,
	attributes,
	setAttributes,
	error,
	getProduct,
	product,
	isLoading,
	clientId,
} ) => {
	const { productId, isPreview, layoutConfig } = attributes;
	const [ isEditing, setIsEditing ] = useState( ! productId );
	const { syncedLayoutConfig, resetLayout } = useSyncedLayoutConfig( {
		clientId,
		initialLayoutConfig: layoutConfig,
		defaultLayoutConfig: DEFAULT_PRODUCT_LAYOUT,
	} );

	useEffect( () => {
		setAttributes( {
			layoutConfig: syncedLayoutConfig,
		} );
	}, [ setAttributes, syncedLayoutConfig ] );

	if ( isPreview ) {
		return null; // @todo Add preview state for single product block
	}

	if ( error ) {
		return (
			<ApiError
				error={ error }
				isLoading={ isLoading }
				getProduct={ getProduct }
			/>
		);
	}

	return (
		<div className={ className }>
			<BlockErrorBoundary
				header={ __(
					'Single Product Block Error',
					'woo-gutenberg-products-block'
				) }
			>
				<EditorBlockControls
					setIsEditing={ setIsEditing }
					isEditing={ isEditing }
				/>
				{ isEditing ? (
					<Placeholder
						icon={ BLOCK_ICON }
						label={ BLOCK_TITLE }
						className="wc-block-single-product"
					>
						{ BLOCK_DESCRIPTION }
						<div className="wc-block-single-product__selection">
							<SharedProductControl
								attributes={ attributes }
								setAttributes={ setAttributes }
							/>
							<Button
								isDefault
								onClick={ () => {
									setIsEditing( false );
								} }
							>
								{ __( 'Done', 'woo-gutenberg-products-block' ) }
							</Button>
						</div>
					</Placeholder>
				) : (
					<>
						<LayoutInspectorControls
							attributes={ attributes }
							setAttributes={ setAttributes }
							onReset={ resetLayout }
						/>
						<LayoutEditor product={ product } />
					</>
				) }
			</BlockErrorBoundary>
		</div>
	);
};

export default compose( [ withProduct ] )( Editor );
