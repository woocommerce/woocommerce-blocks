/**
 * External dependencies
 */
import { __, sprintf } from '@wordpress/i18n';

const ratingTemplate = ( { rating } ) => {
	const starStyle = {
		width: ( rating / 5 * 100 ) + '%',
	};

	return (
		<div className="wc-block-reviews-by-product__rating">
			<div className="wc-block-reviews-by-product__rating__stars" role="img">
				{ Number.isFinite( rating ) && (
					<span style={ starStyle }>{ sprintf( __( 'Rated %d out of 5', 'woo-gutenberg-products-block' ), rating ) }</span>
				) }
			</div>
		</div>
	);
};

export default ratingTemplate;
