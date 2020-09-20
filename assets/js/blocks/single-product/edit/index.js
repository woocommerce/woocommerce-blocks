/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { Placeholder, Button, PanelBody } from '@wordpress/components';
import { withProduct } from '@woocommerce/block-hocs';
import BlockErrorBoundary from '@woocommerce/base-components/block-error-boundary';
import EditProductLink from '@woocommerce/editor-components/edit-product-link';
import { singleProductBlockPreview } from '@woocommerce/resource-previews';
import { InspectorControls } from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import './editor.scss';
import ApiError from './api-error';
import SharedProductControl from './shared-product-control';
import EditorBlockControls from './editor-block-controls';
import LayoutEditor from './layout-editor';
import { BLOCK_TITLE, BLOCK_ICON, BLOCK_DESCRIPTION } from '../constants';

/**
 * Component to handle edit mode of the "Single Product Block".
 *
 * @param {Object} props Incoming props for the component.
 * @param {string} props.className
 * @param {Object} props.attributes Incoming block attributes.
 * @param {function(any):any} props.setAttributes Setter for block attributes.
 * @param {string} props.error
 * @param {function(any):any} props.getProduct
 * @param {Object} props.product
 * @param {boolean} props.isLoading
 * @param {string} props.clientId
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
	const { productId, isPreview } = attributes;
	const [ isEditing, setIsEditing ] = useState( ! productId );

	if ( isPreview ) {
		return singleProductBlockPreview;
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
						<InspectorControls>
							<PanelBody
								title={ __(
									'Product',
									'woo-gutenberg-products-block'
								) }
								initialOpen={ false }
							>
								<SharedProductControl
									attributes={ attributes }
									setAttributes={ setAttributes }
								/>
							</PanelBody>
						</InspectorControls>
						<EditProductLink productId={ productId } />
						<LayoutEditor
							clientId={ clientId }
							product={ product }
							isLoading={ isLoading }
						/>
					</>
				) }
			</BlockErrorBoundary>
		</div>
	);
};

export default withProduct( Editor );
