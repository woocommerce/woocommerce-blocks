/**
 * External dependencies
 */
import { __, _n, sprintf } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	Placeholder,
	withSpokenMessages,
} from '@wordpress/components';
import { SearchListItem } from '@woocommerce/editor-components/search-list-control';
import ProductControl from '@woocommerce/editor-components/product-control';
import { Icon, commentContent } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import EditorContainerBlock from '../editor-container-block.js';
import {
	getBlockControls,
	getSharedReviewContentControls,
	getSharedReviewListControls,
} from '../edit-utils.js';
import type { ReviewsByProductEditorProps, SearchListItemProps } from './types';
import NoReviewsPlaceholder from './no-reviews-placeholder';

/**
 * Component to handle edit mode of "Reviews by Product".
 *
 */
const ReviewsByProductEditor = ( {
	attributes,
	debouncedSpeak,
	setAttributes,
}: ReviewsByProductEditorProps ) => {
	const { editMode, productId } = attributes;

	const renderProductControlItem = ( args: SearchListItemProps ) => {
		return (
			<SearchListItem
				{ ...args }
				countLabel={ sprintf(
					/* translators: %d is the review count. */
					_n(
						'%d review',
						'%d reviews',
						args.reviewCount,
						'woo-gutenberg-products-block'
					),
					args.reviewCount
				) }
				aria-label={ sprintf(
					/* translators: %1$s is the item name, and %2$d is the number of reviews for the item. */
					_n(
						'%1$s, has %2$d review',
						'%1$s, has %2$d reviews',
						args.reviewCount,
						'woo-gutenberg-products-block'
					),
					args.name,
					args.reviewCount
				) }
			/>
		);
	};

	const getInspectorControls = () => {
		return (
			<InspectorControls key="inspector">
				<PanelBody
					title={ __( 'Product', 'woo-gutenberg-products-block' ) }
					initialOpen={ false }
				>
					<ProductControl
						selected={ attributes.productId || 0 }
						onChange={ ( value = [] ) => {
							const id = value[ 0 ] ? value[ 0 ].id : 0;
							setAttributes( { productId: id } );
						} }
						renderItem={ renderProductControlItem }
						isCompact={ true }
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Content', 'woo-gutenberg-products-block' ) }
				>
					{ getSharedReviewContentControls(
						attributes,
						setAttributes
					) }
				</PanelBody>
				<PanelBody
					title={ __(
						'List Settings',
						'woo-gutenberg-products-block'
					) }
				>
					{ getSharedReviewListControls( attributes, setAttributes ) }
				</PanelBody>
			</InspectorControls>
		);
	};

	const renderEditMode = () => {
		const onDone = () => {
			setAttributes( { editMode: false } );
			debouncedSpeak(
				__(
					'Showing Reviews by Product block preview.',
					'woo-gutenberg-products-block'
				)
			);
		};

		return (
			<Placeholder
				icon={
					<Icon
						icon={ commentContent }
						className="block-editor-block-icon"
					/>
				}
				label={ __(
					'Reviews by Product',
					'woo-gutenberg-products-block'
				) }
				className="wc-block-reviews-by-product"
			>
				{ __(
					'Show reviews of your product to build trust',
					'woo-gutenberg-products-block'
				) }
				<div className="wc-block-reviews__selection">
					<ProductControl
						selected={ attributes.productId || 0 }
						onChange={ ( value = [] ) => {
							const id = value[ 0 ] ? value[ 0 ].id : 0;
							setAttributes( { productId: id } );
						} }
						queryArgs={ {
							orderby: 'comment_count',
							order: 'desc',
						} }
						renderItem={ renderProductControlItem }
					/>
					<Button isPrimary onClick={ onDone }>
						{ __( 'Done', 'woo-gutenberg-products-block' ) }
					</Button>
				</div>
			</Placeholder>
		);
	};

	if ( ! productId || editMode ) {
		return renderEditMode();
	}

	const buttonTitle = __(
		'Edit selected product',
		'woo-gutenberg-products-block'
	);

	return (
		<>
			{ getBlockControls( editMode, setAttributes, buttonTitle ) }
			{ getInspectorControls() }
			<EditorContainerBlock
				attributes={ attributes }
				icon={
					<Icon
						icon={ commentContent }
						className="block-editor-block-icon"
					/>
				}
				name={ __(
					'Reviews by Product',
					'woo-gutenberg-products-block'
				) }
				noReviewsPlaceholder={ NoReviewsPlaceholder }
			/>
		</>
	);
};

export default withSpokenMessages( ReviewsByProductEditor );
