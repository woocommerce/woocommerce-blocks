/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import {
	PLACEHOLDER_IMG_SRC,
	THUMBNAIL_SIZE,
} from '@woocommerce/block-settings';

const ProductImage = ( { className, images } ) => {
	if ( images && images.length ) {
		const mainImage = images[ 0 ];
		const aspectRatio = mainImage.height / mainImage.width * 100;

		return (
			<div
				className={ className }
				style={ {
					height: 0,
					paddingBottom: `${ aspectRatio }%`,
				} }
			>
				<img
					className={ className + '__image' }
					src={ mainImage.thumbnail }
					srcSet={ mainImage.srcset }
					sizes={ mainImage.sizes }
					alt={ mainImage.alt }
					style={ {
						width: `${ THUMBNAIL_SIZE }px`,
					} }
				/>
			</div>
		);
	}
	return (
		<div className={ className }>
			<img
				className={ className + '__image' }
				src={ PLACEHOLDER_IMG_SRC }
				alt=""
				style={ { width: `${ THUMBNAIL_SIZE }px` } }
			/>
		</div>
	);
};

ProductImage.propTypes = {
	className: PropTypes.string.isRequired,
	images: PropTypes.arrayOf( PropTypes.object ),
};

ProductImage.defaultProps = {
	images: [],
};

export default ProductImage;
