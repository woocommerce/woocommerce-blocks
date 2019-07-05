/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { escapeHTML } from '@wordpress/escape-html';
import {
	BlockControls,
	InspectorControls,
	ServerSideRender,
} from '@wordpress/editor';
import {
	Button,
	Disabled,
	PanelBody,
	Placeholder,
	SelectControl,
	TextControl,
	ToggleControl,
	Toolbar,
	withSpokenMessages,
} from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import PropTypes from 'prop-types';
import apiFetch from '@wordpress/api-fetch';
import { debounce } from 'lodash';

/**
 * Internal dependencies
 */
import ProductControl from '../../components/product-control';
import ReviewsByProductIcon from '../../components/icons/reviews-by-product';

/**
 * Component to handle edit mode of "Reviews by Product".
 */
class ReviewsByProduct extends Component {

	constructor() {
		super( ...arguments );
		this.state = {
			product: false,
			loaded: false,
		};

		this.debouncedGetProduct = debounce( this.getProduct.bind( this ), 200 );
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
			this.setState( { product: false, loaded: true } );
			return;
		}
		apiFetch( {
			path: `/wc/blocks/products/${ productId }`,
		} )
			.then( ( product ) => {
				this.setState( { product, loaded: true } );
			} )
			.catch( () => {
				this.setState( { product: false, loaded: true } );
			} );
	}

	getInspectorControls() {
		const {
			attributes,
			setAttributes,
		} = this.props;

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
						label={ __( 'Reviewer picture', 'woo-gutenberg-products-block' ) }
						help={
							attributes.showReviewerPicture ?
								__( 'Reviewer picture is visible.', 'woo-gutenberg-products-block' ) :
								__( 'Reviewer picture is hidden.', 'woo-gutenberg-products-block' )
						}
						checked={ attributes.showReviewerPicture }
						onChange={ () => setAttributes( { showReviewerPicture: ! attributes.showReviewerPicture } ) }
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
						value={ attributes.reviewsShown }
						onChange={ ( reviewsShown ) => setAttributes( { reviewsShown } ) }
						type="number"
					/>
				</PanelBody>
			</InspectorControls>
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
				icon={ <ReviewsByProductIcon className="block-editor-block-icon" /> }
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
					/>
					<Button isDefault onClick={ onDone }>
						{ __( 'Done', 'woo-gutenberg-products-block' ) }
					</Button>
				</div>
			</Placeholder>
		);
	}

	render() {
		const { attributes, name, setAttributes } = this.props;
		const { editMode } = attributes;
		const { product } = this.state;

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
				{ ! product || editMode ? (
					this.renderEditMode()
				) : (
					<Fragment>
						{ product.rating_count > 0 ? (
							<Disabled>
								<ServerSideRender block={ name } attributes={ attributes } className="wc-block-reviews-by-product" />
							</Disabled>
						) : (
							<Placeholder
								className="wc-block-reviews-by-product"
								icon={ <ReviewsByProductIcon className="block-editor-block-icon" /> }
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
						) }
					</Fragment>
				) }
			</Fragment>
		);
	}
}

ReviewsByProduct.propTypes = {
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
] )( ReviewsByProduct );
