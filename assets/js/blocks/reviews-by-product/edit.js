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
import classNames from 'classnames';
import { SearchListItem } from '@woocommerce/components';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { debounce } from 'lodash';
import { escapeHTML } from '@wordpress/escape-html';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import Block from './block.js';
import ProductControl from '../../components/product-control';
import ToggleButtonControl from '../../components/toggle-button-control';
import { IconReviewsByProduct } from '../../components/icons';

class ReviewsByProductEditor extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			product: false,
		};

		this.getProduct = this.getProduct.bind( this );
		this.debouncedGetProduct = debounce( this.getProduct, 200 );
	}

	componentWillUnmount() {
		this.debouncedGetProduct.cancel();
	}

	componentDidMount() {
		this.getProduct();
	}

	componentDidUpdate( prevProps ) {
		if ( prevProps.attributes.productId !== this.props.attributes.productId ) {
			this.debouncedGetProduct();
		}
	}

	getProduct() {
		const { productId } = this.props.attributes;

		if ( ! productId ) {
			// We've removed the selected product, or no product is selected yet.
			this.setState( { product: false } );
			return;
		}
		apiFetch( {
			path: `/wc/blocks/products/${ productId }`,
		} )
			.then( ( product ) => {
				this.setState( { product } );
			} )
			.catch( () => {
				this.setState( { product: false } );
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
					<ProductControl
						selected={ attributes.productId || 0 }
						onChange={ ( value = [] ) => {
							const id = value[ 0 ] ? value[ 0 ].id : 0;
							setAttributes( { productId: id } );
						} }
						renderItem={ this.renderProductControlItem }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Content', 'woo-gutenberg-products-block' ) }>
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
					<ToggleControl
						label={ __( 'Image', 'woo-gutenberg-products-block' ) }
						help={
							attributes.showReviewImage ?
								__( 'Image is visible.', 'woo-gutenberg-products-block' ) :
								__( 'Image is hidden.', 'woo-gutenberg-products-block' )
						}
						checked={ attributes.showReviewImage }
						onChange={ () => setAttributes( { showReviewImage: ! attributes.showReviewImage } ) }
					/>
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
					<ToggleButtonControl
						label={ __( 'Review image', 'woo-gutenberg-products-block' ) }
						value={ attributes.imageType }
						options={ [
							{ label: __( "Reviewer's photo", 'woo-gutenberg-products-block' ), value: 'reviewer' },
							{ label: __( 'Product', 'woo-gutenberg-products-block' ), value: 'product' },
						] }
						onChange={ ( value ) => setAttributes( { imageType: value } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'List Settings', 'woo-gutenberg-products-block' ) }>
					<ToggleControl
						label={ __( 'Order by', 'woo-gutenberg-products-block' ) }
						help={
							attributes.showOrderby ?
								__( 'Order by selector is visible.', 'woo-gutenberg-products-block' ) :
								__( 'Order by selector is hidden.', 'woo-gutenberg-products-block' )
						}
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
					<TextControl
						label={ __( 'Starting Number of Reviews', 'woo-gutenberg-products-block' ) }
						value={ attributes.reviewsOnPageLoad }
						onChange={ ( reviewsOnPageLoad ) => setAttributes( {
							reviewsOnPageLoad: Math.max( Math.min( parseInt( reviewsOnPageLoad, 10 ), maxPerPage ), minPerPage ),
						} ) }
						max={ maxPerPage }
						min={ minPerPage }
						type="number"
					/>
					<ToggleControl
						label={ __( 'Load more', 'woo-gutenberg-products-block' ) }
						help={
							attributes.showLoadMore ?
								__( 'Load more is visible.', 'woo-gutenberg-products-block' ) :
								__( 'Load more is hidden.', 'woo-gutenberg-products-block' )
						}
						checked={ attributes.showLoadMore }
						onChange={ () => setAttributes( { showLoadMore: ! attributes.showLoadMore } ) }
					/>
					<TextControl
						label={ __( 'Load More Reviews', 'woo-gutenberg-products-block' ) }
						value={ attributes.reviewsOnLoadMore }
						onChange={ ( reviewsOnPageLoad ) => setAttributes( {
							reviewsOnLoadMore: Math.max( Math.min( parseInt( reviewsOnPageLoad, 10 ), maxPerPage ), minPerPage ),
						} ) }
						max={ maxPerPage }
						min={ minPerPage }
						type="number"
					/>
				</PanelBody>
			</InspectorControls>
		);
	}

	renderProductControlItem( args ) {
		const { item = 0 } = args;

		return (
			<SearchListItem
				{ ...args }
				countLabel={ sprintf(
					_n(
						'%d Review',
						'%d Reviews',
						item.rating_count,
						'woo-gutenberg-products-block'
					),
					item.rating_count
				) }
				showCount
				aria-label={ sprintf(
					_n(
						'%s, has %d review',
						'%s, has %d reviews',
						item.rating_count,
						'woo-gutenberg-products-block'
					),
					item.name,
					item.rating_count
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
					'Showing Reviews by Product block preview.',
					'woo-gutenberg-products-block'
				)
			);
		};

		return (
			<Placeholder
				icon={ <IconReviewsByProduct className="block-editor-block-icon" /> }
				label={ __( 'Reviews by Product', 'woo-gutenberg-products-block' ) }
				className="wc-block-reviews-by-product"
			>
				{ __(
					'Show reviews of your product to build trust',
					'woo-gutenberg-products-block'
				) }
				<div className="wc-block-reviews-by-product__selection">
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
						renderItem={ this.renderProductControlItem }
					/>
					<Button isDefault onClick={ onDone }>
						{ __( 'Done', 'woo-gutenberg-products-block' ) }
					</Button>
				</div>
			</Placeholder>
		);
	}

	render() {
		const { attributes, setAttributes } = this.props;
		const { className, editMode, productId, showReviewDate, showReviewerName } = attributes;
		const { product } = this.state;
		const showReviewImage = ( wc_product_block_data.showAvatars || attributes.imageType === 'product' ) && attributes.showReviewImage;
		const showProductRating = wc_product_block_data.enableReviewRating && attributes.showProductRating;
		const classes = classNames( 'wc-block-reviews-by-product', className, {
			'has-image': showReviewImage,
			'has-name': showReviewerName,
			'has-date': showReviewDate,
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
				{ ! productId || editMode ? (
					this.renderEditMode()
				) : (
					<Fragment>
						{ product.rating_count === 0 ? (
							<Placeholder
								className="wc-block-reviews-by-product"
								icon={ <IconReviewsByProduct className="block-editor-block-icon" /> }
								label={ __( 'Reviews by Product', 'woo-gutenberg-products-block' ) }
							>
								<div dangerouslySetInnerHTML={ {
									__html: sprintf(
										__(
											"This block lists reviews for a selected product. %s doesn't have any reviews yet, but they will show up here when it does.",
											'woo-gutenberg-products-block'
										),
										'<strong>' + escapeHTML( product.name ) + '</strong>'
									),
								} } />
							</Placeholder>
						) : (
							<div className={ classes }>
								<Block attributes={ attributes } isPreview />
							</div>
						) }
					</Fragment>
				) }
			</Fragment>
		);
	}
}

ReviewsByProductEditor.propTypes = {
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
] )( ReviewsByProductEditor );
