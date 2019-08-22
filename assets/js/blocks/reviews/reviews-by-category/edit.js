/**
 * External dependencies
 */
import { __, _n, sprintf } from '@wordpress/i18n';
import {
	InspectorControls,
} from '@wordpress/editor';
import {
	Button,
	PanelBody,
	Placeholder,
	ToggleControl,
	withSpokenMessages,
} from '@wordpress/components';
import { SearchListItem } from '@woocommerce/components';
import { Fragment } from '@wordpress/element';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import ProductCategoryControl from '../../../components/product-category-control';
import { IconReviewsByCategory } from '../../../components/icons';
import { renderViewMode, getBlockControls, getSharedReviewContentControls, getSharedReviewListControls } from '../edit-utils.js';

/**
 * Component to handle edit mode of "Reviews by Category".
 */
const ReviewsByCategoryEditor = ( { attributes, debouncedSpeak, setAttributes } ) => {
	const { editMode, categoryIds, showProductName, showReviewDate, showReviewerName, showReviewContent, showReviewImage, showReviewRating } = attributes;

	const renderCategoryControlItem = ( args ) => {
		const { item, search, depth = 0 } = args;
		const classes = [
			'woocommerce-product-categories__item',
		];
		if ( search.length ) {
			classes.push( 'is-searching' );
		}
		if ( depth === 0 && item.parent !== 0 ) {
			classes.push( 'is-skip-level' );
		}

		const accessibleName = ! item.breadcrumbs.length ?
			item.name :
			`${ item.breadcrumbs.join( ', ' ) }, ${ item.name }`;

		return (
			<SearchListItem
				className={ classes.join( ' ' ) }
				{ ...args }
				showCount
				aria-label={ sprintf(
					_n(
						'%s, has %d product',
						'%s, has %d products',
						item.count,
						'woo-gutenberg-products-block'
					),
					accessibleName,
					item.count
				) }
			/>
		);
	};

	const getInspectorControls = () => {
		return (
			<InspectorControls key="inspector">
				<PanelBody
					title={ __( 'Category', 'woo-gutenberg-products-block' ) }
					initialOpen={ false }
				>
					<ProductCategoryControl
						selected={ attributes.categoryIds }
						onChange={ ( value = [] ) => {
							const ids = value.map( ( { id } ) => id );
							setAttributes( { categoryIds: ids } );
						} }
						renderItem={ renderCategoryControlItem }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Content', 'woo-gutenberg-products-block' ) }>
					<ToggleControl
						label={ __( 'Product name', 'woo-gutenberg-products-block' ) }
						checked={ attributes.showProductName }
						onChange={ () => setAttributes( { showProductName: ! attributes.showProductName } ) }
					/>
					{ getSharedReviewContentControls( attributes, setAttributes ) }
				</PanelBody>
				<PanelBody title={ __( 'List Settings', 'woo-gutenberg-products-block' ) }>
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
					'Showing Reviews by Category block preview.',
					'woo-gutenberg-products-block'
				)
			);
		};

		return (
			<Placeholder
				icon={ <IconReviewsByCategory className="block-editor-block-icon" /> }
				label={ __( 'Reviews by Category', 'woo-gutenberg-products-block' ) }
			>
				{ __(
					'Show product reviews from specific categories.',
					'woo-gutenberg-products-block'
				) }
				<div className="wc-block-reviews__selection">
					<ProductCategoryControl
						selected={ attributes.categoryIds }
						onChange={ ( value = [] ) => {
							const ids = value.map( ( { id } ) => id );
							setAttributes( { categoryIds: ids } );
						} }
					/>
					<Button isDefault onClick={ onDone }>
						{ __( 'Done', 'woo-gutenberg-products-block' ) }
					</Button>
				</div>
			</Placeholder>
		);
	};

	const renderHiddenContentPlaceholder = () => {
		return (
			<Placeholder
				icon={ <IconReviewsByCategory className="block-editor-block-icon" /> }
				label={ __( 'Reviews by Category', 'woo-gutenberg-products-block' ) }
			>
				{ __( 'The content for this block is hidden due to block settings.', 'woo-gutenberg-products-block' ) }
			</Placeholder>
		);
	};

	if ( ! categoryIds || editMode ) {
		return renderEditMode();
	}

	const isAllContentHidden = ! showReviewContent && ! showReviewRating && ! showReviewDate && ! showReviewerName && ! showReviewImage && ! showProductName;

	return (
		<Fragment>
			{ getBlockControls( editMode, setAttributes ) }
			{ getInspectorControls() }
			{ isAllContentHidden ?
				renderHiddenContentPlaceholder() :
				renderViewMode( 'wc-block-reviews-by-category', attributes )
			}
		</Fragment>
	);
};

ReviewsByCategoryEditor.propTypes = {
	/**
	 * The attributes for this block.
	 */
	attributes: PropTypes.object.isRequired,
	/**
	 * The register block name.
	 */
	name: PropTypes.string.isRequired,
	/**
	 * A callback to update attributes.
	 */
	setAttributes: PropTypes.func.isRequired,
	// from withSpokenMessages
	debouncedSpeak: PropTypes.func.isRequired,
};

export default withSpokenMessages( ReviewsByCategoryEditor );
