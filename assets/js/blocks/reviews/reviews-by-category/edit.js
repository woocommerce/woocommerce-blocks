/**
 * External dependencies
 */
import { __, _n, sprintf } from '@wordpress/i18n';
import {
	BlockControls,
	InspectorControls,
} from '@wordpress/editor';
import {
	Button,
	Notice,
	PanelBody,
	Placeholder,
	RangeControl,
	SelectControl,
	ToggleControl,
	Toolbar,
	withSpokenMessages,
} from '@wordpress/components';
import classNames from 'classnames';
import { SearchListItem } from '@woocommerce/components';
import { Fragment, RawHTML } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import PropTypes from 'prop-types';
import { getAdminLink } from '@woocommerce/navigation';

/**
 * Internal dependencies
 */
import EditorBlock from './editor-block.js';
import ProductCategoryControl from '../../../components/product-category-control';
import ToggleButtonControl from '../../../components/toggle-button-control';
import { IconReviewsByCategory } from '../../../components/icons';

const enableReviewRating = !! ( typeof wc_product_block_data !== 'undefined' && wc_product_block_data.enableReviewRating );
const showAvatars = !! ( typeof wc_product_block_data !== 'undefined' && wc_product_block_data.showAvatars );

/**
 * Component to handle edit mode of "Reviews by Category".
 */
const ReviewsByCategoryEditor = ( { attributes, debouncedSpeak, setAttributes } ) => {
	const { className, editMode, categoryIds, showReviewDate, showReviewerName, showReviewContent, showProductName } = attributes;

	const getBlockControls = () => (
		<BlockControls>
			<Toolbar
				controls={ [
					{
						icon: 'edit',
						title: __( 'Edit' ),
						onClick: () => setAttributes( { editMode: ! editMode } ),
						isActive: editMode,
					},
				] }
			/>
		</BlockControls>
	);

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
		const minPerPage = 1;
		const maxPerPage = 20;

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
						label={ __( 'Product rating', 'woo-gutenberg-products-block' ) }
						checked={ attributes.showReviewRating }
						onChange={ () => setAttributes( { showReviewRating: ! attributes.showReviewRating } ) }
					/>
					{ ( attributes.showReviewRating && ! enableReviewRating ) && (
						<Notice className="wc-block-reviews-by-category__notice" isDismissible={ false }>
							<RawHTML>
								{ sprintf( __( 'Product rating is disabled in your %sstore settings%s.', 'woo-gutenberg-products-block' ), `<a href="${ getAdminLink( 'admin.php?page=wc-settings&tab=products' ) }" target="_blank">`, '</a>' ) }
							</RawHTML>
						</Notice>
					) }
					<ToggleControl
						label={ __( 'Product name', 'woo-gutenberg-products-block' ) }
						checked={ attributes.showProductName }
						onChange={ () => setAttributes( { showProductName: ! attributes.showProductName } ) }
					/>
					<ToggleControl
						label={ __( 'Reviewer name', 'woo-gutenberg-products-block' ) }
						checked={ attributes.showReviewerName }
						onChange={ () => setAttributes( { showReviewerName: ! attributes.showReviewerName } ) }
					/>
					<ToggleControl
						label={ __( 'Image', 'woo-gutenberg-products-block' ) }
						checked={ attributes.showReviewImage }
						onChange={ () => setAttributes( { showReviewImage: ! attributes.showReviewImage } ) }
					/>
					<ToggleControl
						label={ __( 'Review date', 'woo-gutenberg-products-block' ) }
						checked={ attributes.showReviewDate }
						onChange={ () => setAttributes( { showReviewDate: ! attributes.showReviewDate } ) }
					/>
					<ToggleControl
						label={ __( 'Review content', 'woo-gutenberg-products-block' ) }
						checked={ attributes.showReviewContent }
						onChange={ () => setAttributes( { showReviewContent: ! attributes.showReviewContent } ) }
					/>
					{ attributes.showReviewImage && (
						<Fragment>
							<ToggleButtonControl
								label={ __( 'Review image', 'woo-gutenberg-products-block' ) }
								value={ attributes.imageType }
								options={ [
									{ label: __( 'Reviewer photo', 'woo-gutenberg-products-block' ), value: 'reviewer' },
									{ label: __( 'Product', 'woo-gutenberg-products-block' ), value: 'product' },
								] }
								onChange={ ( value ) => setAttributes( { imageType: value } ) }
							/>
							{ ( attributes.imageType === 'reviewer' && ! showAvatars ) && (
								<Notice className="wc-block-reviews-by-category__notice" isDismissible={ false }>
									<RawHTML>
										{ sprintf( __( 'Reviewer photo is disabled in your %ssite settings%s.', 'woo-gutenberg-products-block' ), `<a href="${ getAdminLink( 'options-discussion.php' ) }" target="_blank">`, '</a>' ) }
									</RawHTML>
								</Notice>
							) }
						</Fragment>
					) }
				</PanelBody>
				<PanelBody title={ __( 'List Settings', 'woo-gutenberg-products-block' ) }>
					<ToggleControl
						label={ __( 'Order by', 'woo-gutenberg-products-block' ) }
						checked={ attributes.showOrderby }
						onChange={ () => setAttributes( { showOrderby: ! attributes.showOrderby } ) }
					/>
					<SelectControl
						label={ __( 'Order Product Reviews by', 'woo-gutenberg-products-block' ) }
						value={ attributes.orderby }
						options={ [
							{ label: 'Most recent', value: 'most-recent' },
							{ label: 'Highest Rating', value: 'highest-rating' },
							{ label: 'Lowest Rating', value: 'lowest-rating' },
						] }
						onChange={ ( orderby ) => setAttributes( { orderby } ) }
					/>
					<RangeControl
						label={ __( 'Starting Number of Reviews', 'woo-gutenberg-products-block' ) }
						value={ attributes.reviewsOnPageLoad }
						onChange={ ( reviewsOnPageLoad ) => setAttributes( { reviewsOnPageLoad } ) }
						max={ maxPerPage }
						min={ minPerPage }
					/>
					<ToggleControl
						label={ __( 'Load more', 'woo-gutenberg-products-block' ) }
						checked={ attributes.showLoadMore }
						onChange={ () => setAttributes( { showLoadMore: ! attributes.showLoadMore } ) }
					/>
					{ attributes.showLoadMore && (
						<RangeControl
							label={ __( 'Load More Reviews', 'woo-gutenberg-products-block' ) }
							value={ attributes.reviewsOnLoadMore }
							onChange={ ( reviewsOnLoadMore ) => setAttributes( { reviewsOnLoadMore } ) }
							max={ maxPerPage }
							min={ minPerPage }
						/>
					) }
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
				className="wc-block-reviews-by-category"
			>
				{ __(
					'Show product reviews from specific categories.',
					'woo-gutenberg-products-block'
				) }
				<div className="wc-block-reviews-by-category__selection">
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

	const renderViewMode = () => {
		const showReviewImage = ( showAvatars || attributes.imageType === 'product' ) && attributes.showReviewImage;
		const showReviewRating = enableReviewRating && attributes.showReviewRating;

		if ( ! showReviewContent && ! showReviewRating && ! showReviewDate && ! showReviewerName && ! showReviewImage && ! showProductName ) {
			return (
				<Placeholder
					className="wc-block-reviews-by-category"
					icon={ <IconReviewsByCategory className="block-editor-block-icon" /> }
					label={ __( 'Reviews by Category', 'woo-gutenberg-products-block' ) }
				>
					{ __( 'The content for this block is hidden due to block settings.', 'woo-gutenberg-products-block' ) }
				</Placeholder>
			);
		}

		const classes = classNames( 'wc-block-reviews-by-category', className, {
			'has-image': showReviewImage,
			'has-name': showReviewerName,
			'has-date': showReviewDate,
			'has-rating': showReviewRating,
			'has-content': showReviewContent,
			'has-product-name': showProductName,
		} );

		return (
			<div className={ classes }>
				<EditorBlock attributes={ attributes } />
			</div>
		);
	};

	if ( ! categoryIds || editMode ) {
		return renderEditMode();
	}

	return (
		<Fragment>
			{ getBlockControls() }
			{ getInspectorControls() }
			{ renderViewMode() }
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

export default compose( [
	withSpokenMessages,
] )( ReviewsByCategoryEditor );
