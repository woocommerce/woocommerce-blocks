/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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

	return (
		<div
			className="wc-block-grid__product-image"
			dangerouslySetInnerHTML={ { __html: product.thumbnail_html } }
		/>
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
	if ( ! product.onsale ) {
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
		<div
			className="wc-block-grid__product-price price"
			dangerouslySetInnerHTML={ { __html: product.price_html } }
		/>
	);
}

function getProductRating( product ) {
	const rating = parseFloat( product.average_rating );

	if ( ! Number.isFinite( rating ) ) {
		return null;
	}

	const starStyle = {
		width: ( rating / 5 * 100 ) + '%', /* stylelint-disable-line */
	};

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
function getProductButton( product ) {
	const classes = classNames(
		'wp-block-button__link',
		'add_to_cart_button',
		{
			ajax_add_to_cart: true === product.add_to_cart.ajax,
		}
	);
	return (
		<div className="wp-block-button wc-block-grid__product-add-to-cart">
			<a
				href={ product.add_to_cart.url }
				aria-label={ product.add_to_cart.description }
				className={ classes }
				rel="nofollow"
				data-quantity="1"
				data-product_id={ product.id }
				data-product_sku={ product.sku }
			>
				{ product.add_to_cart.text }
			</a>
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
