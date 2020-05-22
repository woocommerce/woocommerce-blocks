/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { __, sprintf } from '@wordpress/i18n';
import classnames from 'classnames';
import {
	useInnerBlockConfigurationContext,
	useProductDataContextContext,
} from '@woocommerce/shared-context';

const getAverageRating = ( product ) => {
	// eslint-disable-next-line camelcase
	const rating = parseFloat( product?.average_rating || 0 );

	return Number.isFinite( rating ) && rating > 0 ? rating : 0;
};

const ProductRating = ( { className } ) => {
	const { product } = useProductDataContextContext();
	const { layoutStyleClassPrefix } = useInnerBlockConfigurationContext();
	const componentClass = `${ layoutStyleClassPrefix }__product-rating`;
	const rating = getAverageRating( product );

	if ( ! rating ) {
		return null;
	}

	const starStyle = {
		width: ( rating / 5 ) * 100 + '%',
	};

	const ratingText = sprintf(
		__( 'Rated %d out of 5', 'woo-gutenberg-products-block' ),
		rating
	);

	return (
		<div className={ classnames( className, componentClass ) }>
			<div
				className={ `${ componentClass }__stars` }
				role="img"
				aria-label={ ratingText }
			>
				<span style={ starStyle }>{ ratingText }</span>
			</div>
		</div>
	);
};

ProductRating.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object,
};

export default ProductRating;
