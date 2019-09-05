/**
 * External dependencies
 */
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { PLACEHOLDER_IMG_SRC, THUMBNAIL_SIZE } from '../../../../constants';

const ProductListImage = ( { className, product = {} } ) => {
	let image = null;

	const classes = classnames(
		className,
		'wc-block-grid__product-image',
	);

	if ( product.images.length ) {
		const mainImage = product.images[ 0 ];
		image = (
			<img
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
				src={ PLACEHOLDER_IMG_SRC }
				alt=""
				style={ { width: `${ THUMBNAIL_SIZE }px` } }
			/>
		);
	}

	return (
		<div className={ classes }>
			{ image }
		</div>
	);
};

ProductListImage.propTypes = {
	className: PropTypes.string,
	product: PropTypes.object.isRequired,
};

export default ProductListImage;
