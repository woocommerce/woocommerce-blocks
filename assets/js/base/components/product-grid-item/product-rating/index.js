/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import { __, sprintf } from '@wordpress/i18n';

const ProductRating = ( { className, averageRating } ) => {
	const rating = parseFloat( averageRating );

	if ( ! Number.isFinite( rating ) || 0 === rating ) {
		return null;
	}

	const starStyle = {
		width: ( rating / 5 ) * 100 + '%' /* stylelint-disable-line */,
	};

	return (
		<div className={ className }>
			<div className={ className + '__stars' } role="img">
				<span style={ starStyle }>
					{ sprintf(
						__(
							'Rated %d out of 5',
							'woo-gutenberg-products-block'
						),
						rating
					) }
				</span>
			</div>
		</div>
	);
};

ProductRating.propTypes = {
	className: PropTypes.string,
	averageRating: PropTypes.string,
};

export default ProductRating;
