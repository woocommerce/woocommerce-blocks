/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { useState, useCallback } from '@wordpress/element';
import { Placeholder, Button } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { withProduct } from '@woocommerce/block-hocs';
import { InnerBlocks } from '@wordpress/block-editor';
import {
	InnerBlockConfigurationProvider,
	ProductDataContextProvider,
} from '@woocommerce/shared-context';
import BlockErrorBoundary from '@woocommerce/base-components/block-error-boundary';
import { createBlocksFromTemplate } from '@woocommerce/atomic-utils';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import './editor.scss';
import {
	BLOCK_TITLE,
	BLOCK_ICON,
	BLOCK_DESCRIPTION,
	DEFAULT_INNER_BLOCKS,
	ALLOWED_INNER_BLOCKS,
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
const LayoutEditor = ( {
	product,
	attributes,
	setAttributes,
	clientId,
	isLoading,
} ) => {
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
		<InnerBlockConfigurationProvider
			parentName={ BLOCK_NAME }
			layoutStyleClassPrefix={ baseClassName }
		>
			<ProductDataContextProvider product={ product }>
				<LayoutInspectorControls
					attributes={ attributes }
					setAttributes={ setAttributes }
					onReset={ resetInnerBlocks }
				/>
				<div
					className={ classnames( baseClassName, {
						'is-loading': isLoading,
					} ) }
				>
					<InnerBlocks
						template={ DEFAULT_INNER_BLOCKS }
						allowedBlocks={ ALLOWED_INNER_BLOCKS }
						templateLock={ false }
						renderAppender={ false }
					/>
				</div>
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
	const { productId, isPreview } = attributes;
	const [ isEditing, setIsEditing ] = useState( ! productId );

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
					<LayoutEditor
						clientId={ clientId }
						product={ product }
						attributes={ attributes }
						setAttributes={ setAttributes }
						isLoading={ isLoading }
					/>
				) }
			</BlockErrorBoundary>
		</div>
	);
};

export default compose( [ withProduct ] )( Editor );
