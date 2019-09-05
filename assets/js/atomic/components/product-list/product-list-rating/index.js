/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { __, sprintf } from '@wordpress/i18n';
import classnames from 'classnames';

const ProductListRating = ( { className, product = {} } ) => {
	const rating = parseFloat( product.average_rating );

	if ( ! Number.isFinite( rating ) || 0 === rating ) {
		return null;
	}

	const starStyle = {
		width: ( rating / 5 * 100 ) + '%', /* stylelint-disable-line */
	};

	const classes = classnames(
		className,
		'wc-block-grid__product-rating',
	);

	return (
		<div className={ classes }>
			<div className={ 'wc-block-grid__product-rating__stars' } role="img">
				<span style={ starStyle }>{ sprintf( __( 'Rated %d out of 5', 'woo-gutenberg-products-block' ), rating ) }</span>
			</div>
		</div>
	);
};

ProductListRating.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object.isRequired,
};

export default ProductListRating;
