/**
 * External dependencies
 */
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { PLACEHOLDER_IMG_SRC, THUMBNAIL_SIZE } from '../../../../constants';

const ProductImage = ( { className, product = {} } ) => {
	let image = null;

	if ( product.images.length ) {
		const mainImage = product.images[ 0 ];
		image = (
			<img
				className={ className + '__image' }
				src={ mainImage.thumbnail }
				srcSet={ mainImage.srcset }
				sizes={ mainImage.sizes }
				alt={ mainImage.alt }
				style={ { width: `${ THUMBNAIL_SIZE }px` } }
			/>
		);
	} else {
		image = (
			<img
				className={ className + '__image' }
				src={ PLACEHOLDER_IMG_SRC }
				alt=""
				style={ { width: `${ THUMBNAIL_SIZE }px` } }
			/>
		);
	}

	return (
		<div className={ className }>
			{ image }
		</div>
	);
};

ProductImage.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object.isRequired,
};

export default ProductImage;
