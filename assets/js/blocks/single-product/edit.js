/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { useState } from '@wordpress/element';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import {
	Disabled,
	Placeholder,
	withSpokenMessages,
	Button,
	Toolbar,
	PanelBody,
} from '@wordpress/components';
import PropTypes from 'prop-types';
import BlockErrorBoundary from '@woocommerce/base-components/block-error-boundary';
import { withProduct } from '@woocommerce/block-hocs';
import ProductControl from '@woocommerce/block-components/product-control';
import ErrorPlaceholder from '@woocommerce/block-components/error-placeholder';

/**
 * Internal dependencies
 */
import Block from './block.js';
import './editor.scss';
import { BLOCK_TITLE, BLOCK_ICON, BLOCK_DESCRIPTION } from './constants';

const EditorControls = ( { isEditing, setIsEditing } ) => {
	return (
		<BlockControls>
			<Toolbar
				controls={ [
					{
						icon: 'edit',
						title: __( 'Edit', 'woo-gutenberg-products-block' ),
						onClick: () => setIsEditing( ! isEditing ),
						isActive: isEditing,
					},
				] }
			/>
		</BlockControls>
	);
};

const SharedProductControl = ( { attributes, setAttributes } ) => (
	<ProductControl
		selected={ attributes.productId || 0 }
		showVariations
		onChange={ ( value = [] ) => {
			const id = value[ 0 ] ? value[ 0 ].id : 0;
			setAttributes( {
				productId: id,
			} );
		} }
	/>
);

const EditorSettings = ( { attributes, setAttributes, isEditing } ) => {
	return (
		<InspectorControls>
			{ ! isEditing && (
				<PanelBody
					title={ __( 'Product', 'woo-gutenberg-products-block' ) }
					initialOpen={ false }
				>
					<SharedProductControl
						attributes={ attributes }
						setAttributes={ setAttributes }
					/>
				</PanelBody>
			) }
		</InspectorControls>
	);
};

const ProductSelector = ( {
	attributes,
	setAttributes,
	debouncedSpeak,
	setIsEditing,
} ) => {
	const onDone = () => {
		setIsEditing( false );
		debouncedSpeak(
			__(
				'Showing Single Product block preview.',
				'woo-gutenberg-products-block'
			)
		);
	};

	return (
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
				<Button isDefault onClick={ onDone }>
					{ __( 'Done', 'woo-gutenberg-products-block' ) }
				</Button>
			</div>
		</Placeholder>
	);
};

const ApiError = ( { error, isLoading, getProduct } ) => (
	<ErrorPlaceholder
		className="wc-block-single-product-error"
		error={ error }
		isLoading={ isLoading }
		onRetry={ getProduct }
	/>
);

/**
 * Component to handle edit mode of the "Single Product Block".
 */
const Editor = ( {
	className,
	attributes,
	setAttributes,
	debouncedSpeak,
	error,
	getProduct,
	isLoading,
} ) => {
	const [ isEditing, setIsEditing ] = useState( ! attributes.productId );

	if ( attributes.isPreview ) {
		return null; // @todo Add preview
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
				text={ __(
					'There was an error whilst rendering the single product block. If this problem continues, try re-creating the block.',
					'woo-gutenberg-products-block'
				) }
				showErrorMessage={ true }
				errorMessagePrefix={ __(
					'Error message:',
					'woo-gutenberg-products-block'
				) }
			>
				<>
					<EditorControls
						setIsEditing={ setIsEditing }
						isEditing={ isEditing }
					/>
					<EditorSettings
						attributes={ attributes }
						setAttributes={ setAttributes }
						setIsEditing={ setIsEditing }
						isEditing={ isEditing }
					/>
					{ isEditing ? (
						<ProductSelector
							attributes={ attributes }
							setAttributes={ setAttributes }
							setIsEditing={ setIsEditing }
							isEditing={ isEditing }
							debouncedSpeak={ debouncedSpeak }
						/>
					) : (
						<Disabled>
							<Block attributes={ attributes } />
						</Disabled>
					) }
				</>
			</BlockErrorBoundary>
		</div>
	);
};

Editor.propTypes = {
	className: PropTypes.string,
	// from withProduct
	error: PropTypes.object,
	getProduct: PropTypes.func,
	isLoading: PropTypes.bool,
	product: PropTypes.shape( {
		name: PropTypes.node,
		variation: PropTypes.node,
		description: PropTypes.node,
		price_html: PropTypes.node,
		permalink: PropTypes.string,
	} ),
	// from withSpokenMessages
	debouncedSpeak: PropTypes.func.isRequired,
};

export default compose( [ withProduct, withSpokenMessages ] )( Editor );
