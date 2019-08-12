/**
 * External dependencies
 */
import { __, _n, sprintf } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import {
	BlockControls,
	InspectorControls,
} from '@wordpress/editor';
import {
	Button,
	PanelBody,
	Placeholder,
	SelectControl,
	TextControl,
	ToggleControl,
	Toolbar,
	withSpokenMessages,
} from '@wordpress/components';
import debounce from 'lodash';
import classNames from 'classnames';
import { SearchListItem } from '@woocommerce/components';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { escapeHTML } from '@wordpress/escape-html';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import Block from './block.js';
import ProductCategoryControl from '../../components/product-category-control';
import { IconReviewsByCategory } from '../../components/icons';

class ReviewsByCategoryEditor extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			category: false,
			loaded: false,
		};

		this.debouncedGetCategory = debounce( this.getCategory.bind( this ), 200 );
		this.renderNoReviewsFound = this.renderNoReviewsFound.bind( this );
	}

	componentDidMount() {
		this.getCategory();
	}

	componentWillUnmount() {
		this.debouncedGetCategory.cancel();
	}

	componentDidUpdate( prevProps ) {
		if ( prevProps.attributes.categoryId !== this.props.attributes.categoryId ) {
			this.getCategory();
		}
	}

	getCategory() {
		const { categoryId } = this.props.attributes;
		if ( ! categoryId ) {
			// We've removed the selected product, or no product is selected yet.
			this.setState( { category: false, loaded: true } );
			return;
		}
		apiFetch( {
			path: `/wc/blocks/products/categories/${ categoryId }`,
		} )
			.then( ( category ) => {
				this.setState( { category, loaded: true } );
			} )
			.catch( () => {
				this.setState( { category: false, loaded: true } );
			} );
	}

	getInspectorControls() {
		const {
			attributes,
			setAttributes,
		} = this.props;
		const minPerPage = 1;
		const maxPerPage = 100;

		return (
			<InspectorControls key="inspector">
				<PanelBody
					title={ __( 'Product', 'woo-gutenberg-products-block' ) }
					initialOpen={ false }
				>
					<ProductCategoryControl
						selected={ attributes.categoryId || 0 }
						onChange={ ( value = [] ) => {
							const id = value[ 0 ] ? value[ 0 ].id : 0;
							setAttributes( { categoryId: id } );
						} }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Content', 'woo-gutenberg-products-block' ) }>
					{ wc_product_block_data.enableReviewRating && (
						<ToggleControl
							label={ __( 'Product rating', 'woo-gutenberg-products-block' ) }
							help={
								attributes.showProductRating ?
									__( 'Product rating is visible.', 'woo-gutenberg-products-block' ) :
									__( 'Product rating is hidden.', 'woo-gutenberg-products-block' )
							}
							checked={ attributes.showProductRating }
							onChange={ () => setAttributes( { showProductRating: ! attributes.showProductRating } ) }
						/>
					) }
					<ToggleControl
						label={ __( 'Reviewer name', 'woo-gutenberg-products-block' ) }
						help={
							attributes.showReviewerName ?
								__( 'Reviewer name is visible.', 'woo-gutenberg-products-block' ) :
								__( 'Reviewer name is hidden.', 'woo-gutenberg-products-block' )
						}
						checked={ attributes.showReviewerName }
						onChange={ () => setAttributes( { showReviewerName: ! attributes.showReviewerName } ) }
					/>
					{ wc_product_block_data.showAvatars && (
						<ToggleControl
							label={ __( 'Avatar', 'woo-gutenberg-products-block' ) }
							help={
								attributes.showAvatar ?
									__( 'Avatar is visible.', 'woo-gutenberg-products-block' ) :
									__( 'Avatar is hidden.', 'woo-gutenberg-products-block' )
							}
							checked={ attributes.showAvatar }
							onChange={ () => setAttributes( { showAvatar: ! attributes.showAvatar } ) }
						/>
					) }
					<ToggleControl
						label={ __( 'Review date', 'woo-gutenberg-products-block' ) }
						help={
							attributes.showReviewDate ?
								__( 'Review date is visible.', 'woo-gutenberg-products-block' ) :
								__( 'Review date is hidden.', 'woo-gutenberg-products-block' )
						}
						checked={ attributes.showReviewDate }
						onChange={ () => setAttributes( { showReviewDate: ! attributes.showReviewDate } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'List Settings', 'woo-gutenberg-products-block' ) }>
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
					<TextControl
						label={ __( 'Reviews shown on page load', 'woo-gutenberg-products-block' ) }
						value={ attributes.perPage }
						onChange={ ( perPage ) => setAttributes( {
							perPage: Math.max( Math.min( parseInt( perPage, 10 ), maxPerPage ), minPerPage ),
						} ) }
						max={ maxPerPage }
						min={ minPerPage }
						type="number"
					/>
				</PanelBody>
			</InspectorControls>
		);
	}

	renderProductCategoryControlItem( args ) {
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
	}

	renderEditMode() {
		const { attributes, debouncedSpeak, setAttributes } = this.props;
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
					'Show product reviews from a specific category',
					'woo-gutenberg-products-block'
				) }
				<div className="wc-block-reviews-by-category__selection">
					<ProductCategoryControl
						selected={ [ attributes.categoryId ] }
						onChange={ ( value = [] ) => {
							const id = value[ 0 ] ? value[ 0 ].id : 0;
							setAttributes( { categoryId: id } );
						} }
						isSingle
					/>
					<Button isDefault onClick={ onDone }>
						{ __( 'Done', 'woo-gutenberg-products-block' ) }
					</Button>
				</div>
			</Placeholder>
		);
	}

	renderNoReviewsFound() {
		const { category } = this.state;

		return (
			<Placeholder
				className="wc-block-reviews-by-category"
				icon={ <IconReviewsByCategory className="block-editor-block-icon" /> }
				label={ __( 'Reviews by Category', 'woo-gutenberg-products-block' ) }
			>
				<div dangerouslySetInnerHTML={ {
					__html: sprintf(
						__(
							"This block lists reviews for products from a selected category. %s doesn't have any reviews yet, but they will show up here when it does.",
							'woo-gutenberg-products-block'
						),
						category ? '<strong>' + escapeHTML( category.name ) + '</strong>' : __( 'The category', 'woo-gutenberg-products-block' )
					),
				} } />
			</Placeholder>
		);
	}

	render() {
		const { attributes, setAttributes } = this.props;
		const { editMode, categoryId } = attributes;

		const { className, showReviewDate, showReviewerName } = attributes;
		const showAvatar = wc_product_block_data.showAvatars && attributes.showAvatar;
		const showProductRating = wc_product_block_data.enableReviewRating && attributes.showProductRating;
		const classes = classNames( 'wc-block-reviews-by-category', className, {
			'has-avatar': showAvatar,
			'has-date': showReviewDate,
			'has-name': showReviewerName,
			'has-rating': showProductRating,
		} );

		return (
			<Fragment>
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
				{ this.getInspectorControls() }
				{ ! categoryId || editMode ? (
					this.renderEditMode()
				) : (
					<div className={ classes }>
						<Block attributes={ attributes } onNoReviews={ this.renderNoReviewsFound } isPreview />
					</div>
				) }
			</Fragment>
		);
	}
}

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
