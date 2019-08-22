/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { PLACEHOLDER_IMG_SRC, THUMBNAIL_SIZE } from '../../../constants';

function getProductClassName( isLoading ) {
	return classNames(
		'wc-block-grid__product',
		{
			'is-loading': isLoading,
		},
	);
}

/**
 * @todo image srcset.
 */
function getProductImage( product, isLoading ) {
	if ( isLoading || ! product ) {
		return (
			<div className="wc-block-grid__product-image" width="48" height="48" />
		);
	}

	let image = null;
	if ( product.images.length ) {
		image = (
			<img
				className="wc-product-preview__image"
				src={ product.images[ 0 ].src }
				alt=""
				style={ { width: `${ THUMBNAIL_SIZE }px` /* stylelint-disable-line */ } }
			/>
		);
	} else {
		image = (
			<img
				className="wc-product-preview__image"
				src={ PLACEHOLDER_IMG_SRC }
				alt=""
				style={ { width: `${ THUMBNAIL_SIZE }px` /* stylelint-disable-line */ } }
			/>
		);
	}

	return (
		<div className="wc-block-grid__product-image">
			{ image }
		</div>
	);
}

function getProductTitle( product ) {
	if ( ! product.name ) {
		return null;
	}

	return (
		<div className="wc-block-grid__product-title">
			{ product.name }
		</div>
	);
}

function getProductBadge( product ) {
	if ( ! product.on_sale ) { // @todo add to api
		return null;
	}

	return (
		<span className="wc-block-grid__product-onsale">
			{ __( 'Sale!', 'woo-gutenberg-products-block' ) }
		</span>
	);
}

function getProductPrice( product ) {
	return (
		<div className="wc-block-grid__product-price price">
			{ product.price_html }
		</div>
	);
}

function getProductRating( product ) {
	const { average_rating: rating } = product;

	const starStyle = {
		width: ( rating / 5 * 100 ) + '%', /* stylelint-disable-line */
	};

	if ( ! Number.isFinite( rating ) ) {
		return null;
	}

	return (
		<div className="wc-block-grid__product-rating">
			<div className="wc-block-grid__product-rating__stars" role="img">
				<span style={ starStyle }>{ sprintf( __( 'Rated %d out of 5', 'woo-gutenberg-products-block' ), rating ) }</span>
			</div>
		</div>
	);
}

/**
 * @todo Work out how to do add to cart URLs.
 */
function getProductButton() {
	return (
		<div className="wp-block-button wc-block-grid__product-add-to-cart">
			Button
		</div>
	);
}

const ProductGridItem = ( { attributes, product = {} } ) => {
	const { contentVisibility } = attributes;
	const { button, price, rating, title, image } = contentVisibility;
	const isLoading = ! Object.keys( product ).length > 0;
	const classes = getProductClassName( isLoading );

	return (
		<li className={ classes } aria-hidden={ isLoading }>
			<a
				href={ product.permalink }
				className="wc-block-grid__product-link"
			>
				{ image && getProductImage( product, isLoading ) }
				{ title && getProductTitle( product ) }
			</a>
			{ price && getProductBadge( product ) }
			{ price && getProductPrice( product ) }
			{ rating && getProductRating( product ) }
			{ button && getProductButton( product ) }
		</li>
	);
};

ProductGridItem.propTypes = {
	attributes: PropTypes.object.isRequired,
	product: PropTypes.object,
};

export default ProductGridItem;
