/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
// import './style.scss';

/**
 * Display a preview for a given product.
 */
const ProductPreview = ( { product } ) => {
	let image = null;
	if ( product.images.length ) {
		image = <img src={ product.images[ 0 ].src } alt="" />;
	}

	return (
		<div className="product-preview">
			{ image }
			<div className="product-title">{ product.name }</div>
			<div className="product-price" dangerouslySetInnerHTML={ { __html: product.price_html } } />
			<span className="product-add-to-cart">{ __( 'Add to cart', 'woocommerce' ) }</span>
		</div>
	);
};

ProductPreview.propTypes = {
	/**
	 * The product object as returned from the API.
	 */
	product: PropTypes.object.isRequired,
};

export default ProductPreview;
